pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
//import "./ERC721Full.sol";


contract Color is ERC721Full {

    string[] public colors;
    mapping(string => bool) _colorExits;

    constructor() ERC721Full("Color","COLOR") public {
        
    }

    function mint(string memory _color) public{
        //Require unique color
        require(!_colorExits[_color]);
        uint _id = colors.push(_color);
        _mint(msg.sender, _id);
        _colorExits[_color] = true;
        //Color - add it & Track the color
    }
}