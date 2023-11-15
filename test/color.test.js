const { assert } = require('chai');

const Color = artifacts.require('./Color.sol')
require('chai')
    .use(require('chai-as-promised'))
    .should()


contract('Color', (accounts)=>{
    let color;

    before(async()=>{
        color = await Color.deployed()
    })

    describe('deployment', async()=>{
        it('deploys successfully', async()=>{
            const address = await color.address
            console.log(address)
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })

        it('contract has name', async()=>{
            const name = await color.name()
            assert.equal(name,'Color')
        })
     
        it('contract has symbol', async()=>{
            const symbol = await color.symbol()
            assert.equal(symbol, 'COLOR')
        })

    })


    describe('minting', async()=>{
        it('creates a new token', async()=>{
          const result = await color.mint('#EC058E')
          const totalSupply = await color.totalSupply()
          //SUCCESS 
          assert.equal(totalSupply,1);
          console.log(result)
          const event = result.logs[0].args;
          assert.equal(event.tokenId.toNumber(),1, 'id is correct')
          assert.equal(event.from,'0x0000000000000000000000000000000000000000','from is correct')
          assert.equal(event.to, accounts[0], 'to is correct')

          //FAILURE: cannot min tsame color twice
          await color.mint('#EC058E').should.be.rejected;
        })
    })


    describe('indexing', async()=>{
        it('list colors', async()=>{
            //Mint 3 more tokens
            await color.mint('#5386E4')
            await color.mint('#FFFFFF')
            await color.mint('#000000')
            const totalSupply = await color.totalSupply()

            let colorArr, result = [];
            for (let i=1; i<=totalSupply; i++){
                colorArr = await color.colors(i-1)
                result.push(colorArr)
            }

            let expected = ['#EC058E','#5386E4','#FFFFFF','#000000']
            assert.equal(result.join(',') , expected.join(','))
        })
    })
})