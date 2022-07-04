

const FundBundlrModal = ({setShowFundBundlrModal, fundAmount, setFundAmount, fundBundlrWallet}) => {


    return (
        <div className="modal">
            <div className="scrim">
                <div className="container">
                    <div className="fundBundlrModal">
                        <h4 className="title">Fund Bundlr</h4>
                        <h6 className="modal-input">Amount to fund in Matic</h6>
                        <input className="modal-input" type="number" placeholder={0} value={fundAmount} onChange={(e)=> setFundAmount(e.target.value)}/>
                        
                        
                        <div className="modal-button-container">
                        <button  className="modal-button-left" style={{width:"48%"}} onClick={()=>fundBundlrWallet()}>Fund</button>
                        <button className="modal-button-right" style={{width:"48%"}} onClick={()=> setShowFundBundlrModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default FundBundlrModal;