
import React, {useState, useEffect, useRef} from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tutorial from './pages/Tutorial';
import FundBundlrModal from './components/FundBundlrModal';
import { WebBundlr } from '@bundlr-network/client';
import { providers, ethers } from "ethers";
import { useWeb3React } from '@web3-react/core'; 
import { injected } from "./components/connectors";
import BigNumber from 'bignumber.js'
import { buildQuery, arweave } from './lib/api'






function App() {

  const { active, account, library, connector, activate, deactivate } =
  useWeb3React();
  
  const [bundlrInstance, setBundlrInstance] = useState();
  const [showFundBundlrModal, setShowFundBundlrModal] = useState(false)

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [fundAmount, setFundAmount] = useState(0);

  const [newFiles, setNewFiles] = useState([])
  const [filePreviews, setFilePreviews] = useState([])
  const [newFilesData, setNewFilesData] = useState();
  const [URI, setURI] = useState();

  const [uploadedFiles, setUploadedFiles] = useState("")

  const bundlrRef = useRef()
  async function initialiseBundlr() {
    await window.ethereum.enable()
  
    const provider = new providers.Web3Provider(window.ethereum);
    await provider._ready()
  
    const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", provider)
    await bundlr.ready()
    
    setBundlrInstance(bundlr)
    bundlrRef.current = bundlr
    fetchBalance()
  }
  async function fundBundlrWallet () {
    if (!fundAmount) return
    const amountParsed = parseInput(fundAmount)
    let response = await bundlrInstance.fund(amountParsed)
    console.log('Wallet funded: ', response)
    fetchBalance()

  }
  function parseInput (input) {
    const conv = new BigNumber(input).multipliedBy(bundlrInstance.currencyConfig.base[1])
    if (conv.isLessThan(1)) {
      console.log('error: value too small')
      return
    } else {
      return conv
    }
  }

  async function fetchBalance () {
    const bal = await bundlrRef.current.getLoadedBalance()
    console.log('bal: ', ethers.utils.formatEther(bal.toString()))
    setBalance(ethers.utils.formatEther(bal.toString()))

  }

  async function uploadFiles() {    
    let tx = await bundlrInstance.uploader.upload(newFilesData, [{ name: "Content-Type", value: "image/png" },{name:"Application", value: "Bundlr-uploader"},{name:"User", value:account}])
    console.log('tx: ', tx)
    setURI(`http://arweave.net/${tx.data.id}`)

  }
  async function getUploadedFiles () {

    
    const query = buildQuery();
    const results = await arweave.api.post('/graphql', query)
      .catch(err => {
        console.error('GraphQL query failed');
         throw new Error(err);
      });
    const edges = results.data.data.transactions.edges;
    console.log(edges);
    setUploadedFiles(edges)
    return [];

  }


  async function connect(){
    //connect wallet
    try {
      await activate(injected);
      if (active){
        setAddress(account)
       
      }

    } 
    catch (error) {console.log(error)}
  
  }
  async function disconnect(){
    try {deactivate();} 
    catch (error) {console.log(error)}
      setAddress("?")
  }

  useEffect(()=>{
    if(active){initialiseBundlr()}
  },[active])

  return (
    <div id="main">
        <nav>
          <Layout 
          active={active}
          connect={connect}
          disconnect={disconnect}
          account={account}
          initialiseBundlr={initialiseBundlr}
          newFiles={newFiles}
          setNewFiles={setNewFiles}
          filePreviews={filePreviews}
          setFilePreviews={setFilePreviews}
          uploadFiles={uploadFiles}
          newFilesData={newFilesData}
          setNewFilesData={setNewFilesData}
          getUploadedFiles={getUploadedFiles}
          />
          </nav>
         {active ? <h4 className='sidebar-item' style={{backgroundImage:"linear-gradient(green, black)"}} onClick={() => setShowFundBundlrModal(true)}>
          Bundlr connected to {account} Balance: {balance}
 
          </h4>
         :
          <h4 className='sidebar-item' style={{backgroundImage:"linear-gradient(red, black)"}}>Not Connected</h4>}
          {showFundBundlrModal ? <FundBundlrModal
          setShowFundBundlrModal={setShowFundBundlrModal}
          setFundAmount={setFundAmount}
          fundAmount={fundAmount}
          fundBundlrWallet={fundBundlrWallet}
          balance={balance}
          /> : <></>}
        <Routes>
            <Route path="/Home" element={<Home
            uploadedFiles={uploadedFiles}
            />} />
            <Route path="/Tutorial" element={<Tutorial />} />
            <Route path="*" element={<Home />} />
        </Routes>
       

    </div>
  );
}

export default App;
