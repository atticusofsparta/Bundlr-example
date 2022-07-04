import Arweave from 'arweave';
export const arweave = Arweave.init({});


export const buildQuery = (props) => {
    const queryObject = { query: `{
      transactions(first: 100,
        tags: [
            {
              name: "User",
              values: "0x4be2e1D11dCA7EE13fa004D0D7097d98f2Ac8dff"
            }
          ]
      ) {
        edges {
          node {
            id
            owner {
              address
            }
            data {
              size
            }
            block {
              height
              timestamp
            }
            tags {
              name,
              value
            }
          }
        }
      }
    }`}
    return queryObject;
   }