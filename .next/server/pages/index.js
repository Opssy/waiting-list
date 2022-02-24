(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./constant.js":
/*!*********************!*\
  !*** ./constant.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abi": () => (/* binding */ abi),
/* harmony export */   "WHITELIST_CONTRACT_ADDRESS": () => (/* binding */ WHITELIST_CONTRACT_ADDRESS)
/* harmony export */ });
const abi = ` [
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_maxWaitinglistAddresses",
          "type": "uint8"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "addAddressToWaitinglist",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxWaitinglistAddresses",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numAddressesWaitinglist",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "waitinglistAddresses",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]`;
const WHITELIST_CONTRACT_ADDRESS = "0x81297334ee741526d1Fd0e35BA5c7CB5e31295fa";

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_Home_modules_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/Home.modules.css */ "./styles/Home.modules.css");
/* harmony import */ var _styles_Home_modules_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_modules_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var web3modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! web3modal */ "web3modal");
/* harmony import */ var web3modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(web3modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constant */ "./constant.js");

var _jsxFileName = "C:\\Users\\PAMC\\Documents\\xyz\\waiting-list\\pages\\index.js";







function Home() {
  //walletconnected keep track of whether the user's wallet is connected or not
  const {
    0: walletConnected,
    1: setWalletConnected
  } = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false); //joinwaitinglist keeps track of whether the current address has joined the waiting list or not

  const {
    0: joinWaitinglist,
    1: setJoinWaitinglist
  } = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false); //loading is set to true when waiting for a transaction to get mined

  const {
    0: loading,
    1: setLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false); //number of waiting lists track the number of addresses on waiting list  

  const {
    0: numberOfWaitinglist,
    1: setNumberOfWaitinglist
  } = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(0); // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open

  const web3ModalRef = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(); // @params{*}

  const getProviderOrSigner = async (needSigner = false) => {
    //connect to metamask
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new ethers__WEBPACK_IMPORTED_MODULE_4__.providers.Web3Provider(provider); //throw an when not connected to rinkeby

    const {
      chainId
    } = await web3Provider.getNetwork();

    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }

    return web3Provider;
  };
  /**
  * addAddressToWaitinglist: Adds the current connected address to the waiting list
  */


  const addAddressToWaitinglist = async () => {
    try {
      //we need a signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true); //Create a new instance of the contract with s signer which allows update method

      const waitinglistContract = new ethers__WEBPACK_IMPORTED_MODULE_4__.Contract(_constant__WEBPACK_IMPORTED_MODULE_6__.WAITINGLIST_CONTRACT_ADDRESS, _constant__WEBPACK_IMPORTED_MODULE_6__.abi, signer); //callthe addAddressToWaitinglist from  the contract

      const tx = await waitinglistContract.addAddressToWaitinglist();
      setLoading(true); //wait for transaction to get mined 

      await tx.wait();
      setLoading(false); //get the updated number of addresses in the whitelist

      await getNumberOfWaitinglist();
      setJoinWaitinglist(true);
    } catch (err) {
      console.error(err);
    }

    ;
  };
  /**
  * getNumberOfWaitinglist:  gets the number of whitelisted addresses
  */


  const getNumberOfWaitinglist = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // No need for the Signer here, as we are only reading state from the blockchain
      const provider = await getProviderOrSigner();
      const waitinglistContract = new ethers__WEBPACK_IMPORTED_MODULE_4__.Contract(_constant__WEBPACK_IMPORTED_MODULE_6__.WAITINGLIST_CONTRACT_ADDRESS, _constant__WEBPACK_IMPORTED_MODULE_6__.abi, provider); // call the numAddressesWaitinglisted from the contract

      const _numberOfWaitinglist = await waitinglistContract.numAddressesWaitinglist();

      setNumberOfWaitinglist(_numberOfWaitinglist);
    } catch (err) {
      console.error(err);
    }
  };
  /**
  * checkIfAddressInwaitinglist: Checks if the address is in waiting list
  */


  const checkIfAddressInwaitinglist = async () => {
    try {
      // We will need the signer later to get the user's address
      // Even though it is a read transaction, since Signers are just special kinds of Providers,
      // We can use it in it's place
      const signer = await getProviderOrSigner(true);
      const waitinglistContract = new ethers__WEBPACK_IMPORTED_MODULE_4__.Contract(_constant__WEBPACK_IMPORTED_MODULE_6__.WAITINGLIST_CONTRACT_ADDRESS, _constant__WEBPACK_IMPORTED_MODULE_6__.abi, signer); //Get the address associated to the signer which is connected to  MetaMask

      const address = await signer.getAddress(); //call the waitinglist addresses from the contract

      const _joinWaitinglist = await waitinglistContract.waitinglistAddresses(address);

      setJoinWaitinglist(_joinWaitinglist);
    } catch (err) {
      console.error(err);
    }
  }; //connect wallet


  const connectWallet = async () => {
    try {
      //Get the provider from web3modal, which in my case is metamask
      //when used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAddressInwaitinglist();
      getNumberOfWaitinglist();
    } catch (err) {
      console.error(err);
    }
  };
  /*
   renderButton: Returns a button based on the state of the dapp
  */


  const renderButton = () => {
    if (walletConnected) {
      if (joinWaitinglist) {
        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
          className: (_styles_Home_modules_css__WEBPACK_IMPORTED_MODULE_2___default().description),
          children: "Thanks for joining the Whitelist!"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 130,
          columnNumber: 15
        }, this);
      } else if (loading) {
        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
          className: (_styles_Home_modules_css__WEBPACK_IMPORTED_MODULE_2___default().button),
          children: "Loading..."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 135,
          columnNumber: 20
        }, this);
      } else {
        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
          onClick: addAddressToWaitinglist,
          className: (_styles_Home_modules_css__WEBPACK_IMPORTED_MODULE_2___default().button),
          children: "Join the Whitelist"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 138,
          columnNumber: 15
        }, this);
      }
    } else {
      return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
        onClick: connectWallet,
        className: (_styles_Home_modules_css__WEBPACK_IMPORTED_MODULE_2___default().button),
        children: "Connect your wallet"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 145,
        columnNumber: 13
      }, this);
    }
  }; // In this case, whenever the value of `walletConnected` changes - this effect will be called


  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    if (!walletConnected) {
      //Assign the web3modal class to the referenceobject by setting it's 'current' value
      //The 'current' value is perished throughtout as long as this page is open
      web3ModalRef.current = new (web3modal__WEBPACK_IMPORTED_MODULE_3___default())({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false
      });
      connectWallet();
    }
  }, [walletConnected]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("title", {
        children: "Whitelist Dapp"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 169,
        columnNumber: 13
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("meta", {
        name: "description",
        content: "Whitelist-Dapp"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 170,
        columnNumber: 13
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("link", {
        rel: "icon",
        href: "/favicon.ico"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 171,
        columnNumber: 13
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 168,
      columnNumber: 11
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: (_styles_Home_modules_css__WEBPACK_IMPORTED_MODULE_2___default().main),
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h1", {
          className: (_styles_Home_modules_css__WEBPACK_IMPORTED_MODULE_2___default().title),
          children: "Welcome to Crypto Devs!"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 175,
          columnNumber: 15
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
          className: (_styles_Home_modules_css__WEBPACK_IMPORTED_MODULE_2___default().description),
          children: "Its an NFT collection for developers in Crypto."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 176,
          columnNumber: 15
        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
          className: (_styles_Home_modules_css__WEBPACK_IMPORTED_MODULE_2___default().description),
          children: [numberOfWaitinglist, " have already joined the Whitelist"]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 179,
          columnNumber: 15
        }, this), renderButton()]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 174,
        columnNumber: 13
      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("img", {
          className: (_styles_Home_modules_css__WEBPACK_IMPORTED_MODULE_2___default().image),
          src: "./crypto-devs.svg"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 185,
          columnNumber: 15
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 184,
        columnNumber: 13
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 173,
      columnNumber: 11
    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("footer", {
      className: (_styles_Home_modules_css__WEBPACK_IMPORTED_MODULE_2___default().footer),
      children: "Made with \u2764 by Crypto Devs"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 189,
      columnNumber: 11
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 167,
    columnNumber: 9
  }, this);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);

/***/ }),

/***/ "./styles/Home.modules.css":
/*!*********************************!*\
  !*** ./styles/Home.modules.css ***!
  \*********************************/
/***/ (() => {



/***/ }),

/***/ "ethers":
/*!*************************!*\
  !*** external "ethers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("ethers");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "web3modal":
/*!****************************!*\
  !*** external "web3modal" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("web3modal");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQU5GLGVBc0JFO0FBQVEsZUFBUyxFQUFFQSx3RUFBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUF0QkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUE0Qkw7O0FBQ0QsaUVBQWVRLElBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBRWxNQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dhaXRpbmctbGlzdC8uL2NvbnN0YW50LmpzIiwid2VicGFjazovL3dhaXRpbmctbGlzdC8uL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovL3dhaXRpbmctbGlzdC8uL3N0eWxlcy9Ib21lLm1vZHVsZXMuY3NzIiwid2VicGFjazovL3dhaXRpbmctbGlzdC9leHRlcm5hbCBcImV0aGVyc1wiIiwid2VicGFjazovL3dhaXRpbmctbGlzdC9leHRlcm5hbCBcIm5leHQvaGVhZFwiIiwid2VicGFjazovL3dhaXRpbmctbGlzdC9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vd2FpdGluZy1saXN0L2V4dGVybmFsIFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIiLCJ3ZWJwYWNrOi8vd2FpdGluZy1saXN0L2V4dGVybmFsIFwid2ViM21vZGFsXCIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGFiaSA9YCBbXHJcbiAgICB7XHJcbiAgICAgIFwiaW5wdXRzXCI6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImludGVybmFsVHlwZVwiOiBcInVpbnQ4XCIsXHJcbiAgICAgICAgICBcIm5hbWVcIjogXCJfbWF4V2FpdGluZ2xpc3RBZGRyZXNzZXNcIixcclxuICAgICAgICAgIFwidHlwZVwiOiBcInVpbnQ4XCJcclxuICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICAgIFwic3RhdGVNdXRhYmlsaXR5XCI6IFwibm9ucGF5YWJsZVwiLFxyXG4gICAgICBcInR5cGVcIjogXCJjb25zdHJ1Y3RvclwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcImlucHV0c1wiOiBbXSxcclxuICAgICAgXCJuYW1lXCI6IFwiYWRkQWRkcmVzc1RvV2FpdGluZ2xpc3RcIixcclxuICAgICAgXCJvdXRwdXRzXCI6IFtdLFxyXG4gICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcIm5vbnBheWFibGVcIixcclxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJpbnB1dHNcIjogW10sXHJcbiAgICAgIFwibmFtZVwiOiBcIm1heFdhaXRpbmdsaXN0QWRkcmVzc2VzXCIsXHJcbiAgICAgIFwib3V0cHV0c1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJpbnRlcm5hbFR5cGVcIjogXCJ1aW50OFwiLFxyXG4gICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50OFwiXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInZpZXdcIixcclxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJpbnB1dHNcIjogW10sXHJcbiAgICAgIFwibmFtZVwiOiBcIm51bUFkZHJlc3Nlc1dhaXRpbmdsaXN0XCIsXHJcbiAgICAgIFwib3V0cHV0c1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJpbnRlcm5hbFR5cGVcIjogXCJ1aW50OFwiLFxyXG4gICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICBcInR5cGVcIjogXCJ1aW50OFwiXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICBcInN0YXRlTXV0YWJpbGl0eVwiOiBcInZpZXdcIixcclxuICAgICAgXCJ0eXBlXCI6IFwiZnVuY3Rpb25cIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJpbnB1dHNcIjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaW50ZXJuYWxUeXBlXCI6IFwiYWRkcmVzc1wiLFxyXG4gICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICBcInR5cGVcIjogXCJhZGRyZXNzXCJcclxuICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICAgIFwibmFtZVwiOiBcIndhaXRpbmdsaXN0QWRkcmVzc2VzXCIsXHJcbiAgICAgIFwib3V0cHV0c1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJpbnRlcm5hbFR5cGVcIjogXCJib29sXCIsXHJcbiAgICAgICAgICBcIm5hbWVcIjogXCJcIixcclxuICAgICAgICAgIFwidHlwZVwiOiBcImJvb2xcIlxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgXCJzdGF0ZU11dGFiaWxpdHlcIjogXCJ2aWV3XCIsXHJcbiAgICAgIFwidHlwZVwiOiBcImZ1bmN0aW9uXCJcclxuICAgIH1cclxuICBdYFxyXG4gIFxyXG5leHBvcnQgY29uc3QgV0hJVEVMSVNUX0NPTlRSQUNUX0FERFJFU1MgPSAgXCIweDgxMjk3MzM0ZWU3NDE1MjZkMUZkMGUzNUJBNWM3Q0I1ZTMxMjk1ZmFcIjsiLCJpbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3N0eWxlcy9Ib21lLm1vZHVsZXMuY3NzXCI7XHJcbmltcG9ydCBXZWIzTW9kYWwgZnJvbSBcIndlYjNtb2RhbFwiO1xyXG5pbXBvcnQgeyBwcm92aWRlcnMsIENvbnRyYWN0IH0gZnJvbSBcImV0aGVyc1wiO1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgV0FJVElOR0xJU1RfQ09OVFJBQ1RfQUREUkVTUywgYWJpIH0gZnJvbSBcIi4uL2NvbnN0YW50XCI7XHJcblxyXG5mdW5jdGlvbiBIb21lKCkge1xyXG4gICAgLy93YWxsZXRjb25uZWN0ZWQga2VlcCB0cmFjayBvZiB3aGV0aGVyIHRoZSB1c2VyJ3Mgd2FsbGV0IGlzIGNvbm5lY3RlZCBvciBub3RcclxuICAgIGNvbnN0IFt3YWxsZXRDb25uZWN0ZWQsIHNldFdhbGxldENvbm5lY3RlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgICAvL2pvaW53YWl0aW5nbGlzdCBrZWVwcyB0cmFjayBvZiB3aGV0aGVyIHRoZSBjdXJyZW50IGFkZHJlc3MgaGFzIGpvaW5lZCB0aGUgd2FpdGluZyBsaXN0IG9yIG5vdFxyXG4gICAgY29uc3QgW2pvaW5XYWl0aW5nbGlzdCwgc2V0Sm9pbldhaXRpbmdsaXN0XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICAgIC8vbG9hZGluZyBpcyBzZXQgdG8gdHJ1ZSB3aGVuIHdhaXRpbmcgZm9yIGEgdHJhbnNhY3Rpb24gdG8gZ2V0IG1pbmVkXHJcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgICAvL251bWJlciBvZiB3YWl0aW5nIGxpc3RzIHRyYWNrIHRoZSBudW1iZXIgb2YgYWRkcmVzc2VzIG9uIHdhaXRpbmcgbGlzdCAgXHJcbiAgICBjb25zdCBbbnVtYmVyT2ZXYWl0aW5nbGlzdCwgc2V0TnVtYmVyT2ZXYWl0aW5nbGlzdF0gPSB1c2VTdGF0ZSgwKTtcclxuICAgIC8vIENyZWF0ZSBhIHJlZmVyZW5jZSB0byB0aGUgV2ViMyBNb2RhbCAodXNlZCBmb3IgY29ubmVjdGluZyB0byBNZXRhbWFzaykgd2hpY2ggcGVyc2lzdHMgYXMgbG9uZyBhcyB0aGUgcGFnZSBpcyBvcGVuXHJcbiAgICBjb25zdCB3ZWIzTW9kYWxSZWYgPSB1c2VSZWYoKTtcclxuXHJcbiAgIC8vIEBwYXJhbXN7Kn1cclxuXHJcbiAgICBjb25zdCBnZXRQcm92aWRlck9yU2lnbmVyID0gYXN5bmMgKG5lZWRTaWduZXIgPSBmYWxzZSkgPT4ge1xyXG4gICAgICAgIC8vY29ubmVjdCB0byBtZXRhbWFza1xyXG4gICAgICAgIGNvbnN0IHByb3ZpZGVyID0gYXdhaXQgd2ViM01vZGFsUmVmLmN1cnJlbnQuY29ubmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IHdlYjNQcm92aWRlciA9IG5ldyBwcm92aWRlcnMuV2ViM1Byb3ZpZGVyKHByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgLy90aHJvdyBhbiB3aGVuIG5vdCBjb25uZWN0ZWQgdG8gcmlua2VieVxyXG4gICAgICAgIGNvbnN0IHsgY2hhaW5JZCB9ID0gYXdhaXQgd2ViM1Byb3ZpZGVyLmdldE5ldHdvcmsoKTtcclxuICAgICAgICBpZiAoY2hhaW5JZCAhPT0gNCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJDaGFuZ2UgdGhlIG5ldHdvcmsgdG8gUmlua2VieVwiKTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2hhbmdlIG5ldHdvcmsgdG8gUmlua2VieVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChuZWVkU2lnbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpZ25lciA9IHdlYjNQcm92aWRlci5nZXRTaWduZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNpZ25lcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHdlYjNQcm92aWRlcjtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAqIGFkZEFkZHJlc3NUb1dhaXRpbmdsaXN0OiBBZGRzIHRoZSBjdXJyZW50IGNvbm5lY3RlZCBhZGRyZXNzIHRvIHRoZSB3YWl0aW5nIGxpc3RcclxuICAqL1xyXG4gICAgY29uc3QgYWRkQWRkcmVzc1RvV2FpdGluZ2xpc3QgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy93ZSBuZWVkIGEgc2lnbmVyIGhlcmUgc2luY2UgdGhpcyBpcyBhICd3cml0ZScgdHJhbnNhY3Rpb24uXHJcbiAgICAgICAgICAgIGNvbnN0IHNpZ25lciA9IGF3YWl0IGdldFByb3ZpZGVyT3JTaWduZXIodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvL0NyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgY29udHJhY3Qgd2l0aCBzIHNpZ25lciB3aGljaCBhbGxvd3MgdXBkYXRlIG1ldGhvZFxyXG4gICAgICAgICAgICBjb25zdCB3YWl0aW5nbGlzdENvbnRyYWN0ID0gbmV3IENvbnRyYWN0KFxyXG4gICAgICAgICAgICAgICAgV0FJVElOR0xJU1RfQ09OVFJBQ1RfQUREUkVTUywgYWJpLCBzaWduZXJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgLy9jYWxsdGhlIGFkZEFkZHJlc3NUb1dhaXRpbmdsaXN0IGZyb20gIHRoZSBjb250cmFjdFxyXG4gICAgICAgICAgICBjb25zdCB0eCA9IGF3YWl0IHdhaXRpbmdsaXN0Q29udHJhY3QuYWRkQWRkcmVzc1RvV2FpdGluZ2xpc3QoKTtcclxuICAgICAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgICAgICAgLy93YWl0IGZvciB0cmFuc2FjdGlvbiB0byBnZXQgbWluZWQgXHJcbiAgICAgICAgICAgIGF3YWl0IHR4LndhaXQoKTtcclxuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAvL2dldCB0aGUgdXBkYXRlZCBudW1iZXIgb2YgYWRkcmVzc2VzIGluIHRoZSB3aGl0ZWxpc3RcclxuICAgICAgICAgICAgYXdhaXQgZ2V0TnVtYmVyT2ZXYWl0aW5nbGlzdCgpO1xyXG4gICAgICAgICAgICBzZXRKb2luV2FpdGluZ2xpc3QodHJ1ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICogZ2V0TnVtYmVyT2ZXYWl0aW5nbGlzdDogIGdldHMgdGhlIG51bWJlciBvZiB3aGl0ZWxpc3RlZCBhZGRyZXNzZXNcclxuICAgKi9cclxuICAgIGNvbnN0IGdldE51bWJlck9mV2FpdGluZ2xpc3QgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgIC8vIEdldCB0aGUgcHJvdmlkZXIgZnJvbSB3ZWIzTW9kYWwsIHdoaWNoIGluIG91ciBjYXNlIGlzIE1ldGFNYXNrXHJcbiAgICAgICAgICAgIC8vIE5vIG5lZWQgZm9yIHRoZSBTaWduZXIgaGVyZSwgYXMgd2UgYXJlIG9ubHkgcmVhZGluZyBzdGF0ZSBmcm9tIHRoZSBibG9ja2NoYWluXHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gYXdhaXQgZ2V0UHJvdmlkZXJPclNpZ25lcigpO1xyXG4gICAgICAgICAgICBjb25zdCB3YWl0aW5nbGlzdENvbnRyYWN0ID0gbmV3IENvbnRyYWN0KFxyXG4gICAgICAgICAgICAgICAgV0FJVElOR0xJU1RfQ09OVFJBQ1RfQUREUkVTUywgYWJpLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgIC8vIGNhbGwgdGhlIG51bUFkZHJlc3Nlc1dhaXRpbmdsaXN0ZWQgZnJvbSB0aGUgY29udHJhY3RcclxuICAgICAgICAgICAgY29uc3QgX251bWJlck9mV2FpdGluZ2xpc3QgPSBhd2FpdCB3YWl0aW5nbGlzdENvbnRyYWN0Lm51bUFkZHJlc3Nlc1dhaXRpbmdsaXN0KCk7XHJcbiAgICAgICAgICAgIHNldE51bWJlck9mV2FpdGluZ2xpc3QoX251bWJlck9mV2FpdGluZ2xpc3QpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgICAgLyoqXHJcbiAgICogY2hlY2tJZkFkZHJlc3NJbndhaXRpbmdsaXN0OiBDaGVja3MgaWYgdGhlIGFkZHJlc3MgaXMgaW4gd2FpdGluZyBsaXN0XHJcbiAgICovXHJcbiAgY29uc3QgY2hlY2tJZkFkZHJlc3NJbndhaXRpbmdsaXN0ID0gYXN5bmMgKCkgPT57XHJcbiAgICAgIHRyeXtcclxuICAgICAgICAgICAvLyBXZSB3aWxsIG5lZWQgdGhlIHNpZ25lciBsYXRlciB0byBnZXQgdGhlIHVzZXIncyBhZGRyZXNzXHJcbiAgICAgICAgICAgIC8vIEV2ZW4gdGhvdWdoIGl0IGlzIGEgcmVhZCB0cmFuc2FjdGlvbiwgc2luY2UgU2lnbmVycyBhcmUganVzdCBzcGVjaWFsIGtpbmRzIG9mIFByb3ZpZGVycyxcclxuICAgICAgICAgICAgLy8gV2UgY2FuIHVzZSBpdCBpbiBpdCdzIHBsYWNlXHJcbiAgICAgICAgICAgIGNvbnN0IHNpZ25lciA9IGF3YWl0IGdldFByb3ZpZGVyT3JTaWduZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdhaXRpbmdsaXN0Q29udHJhY3QgPSBuZXcgQ29udHJhY3QoXHJcbiAgICAgICAgICAgICAgICBXQUlUSU5HTElTVF9DT05UUkFDVF9BRERSRVNTLCBhYmksIHNpZ25lclxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvL0dldCB0aGUgYWRkcmVzcyBhc3NvY2lhdGVkIHRvIHRoZSBzaWduZXIgd2hpY2ggaXMgY29ubmVjdGVkIHRvICBNZXRhTWFza1xyXG4gICAgICAgICAgICBjb25zdCBhZGRyZXNzID0gYXdhaXQgc2lnbmVyLmdldEFkZHJlc3MoKTtcclxuXHJcbiAgICAgICAgICAgIC8vY2FsbCB0aGUgd2FpdGluZ2xpc3QgYWRkcmVzc2VzIGZyb20gdGhlIGNvbnRyYWN0XHJcbiAgICAgICAgICAgIGNvbnN0IF9qb2luV2FpdGluZ2xpc3QgPSBhd2FpdCB3YWl0aW5nbGlzdENvbnRyYWN0LndhaXRpbmdsaXN0QWRkcmVzc2VzKFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBzZXRKb2luV2FpdGluZ2xpc3QoX2pvaW5XYWl0aW5nbGlzdCk7XHJcbiAgICAgIH0gY2F0Y2goZXJyKXtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgfVxyXG4gIH07XHJcblxyXG4gIC8vY29ubmVjdCB3YWxsZXRcclxuICBjb25zdCBjb25uZWN0V2FsbGV0ID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgICAgLy9HZXQgdGhlIHByb3ZpZGVyIGZyb20gd2ViM21vZGFsLCB3aGljaCBpbiBteSBjYXNlIGlzIG1ldGFtYXNrXHJcbiAgICAgICAgICAvL3doZW4gdXNlZCBmb3IgdGhlIGZpcnN0IHRpbWUsIGl0IHByb21wdHMgdGhlIHVzZXIgdG8gY29ubmVjdCB0aGVpciB3YWxsZXRcclxuICAgICAgICAgIGF3YWl0IGdldFByb3ZpZGVyT3JTaWduZXIoKTtcclxuICAgICAgICAgIHNldFdhbGxldENvbm5lY3RlZCh0cnVlKTtcclxuXHJcbiAgICAgICAgICBjaGVja0lmQWRkcmVzc0lud2FpdGluZ2xpc3QoKTtcclxuICAgICAgICAgIGdldE51bWJlck9mV2FpdGluZ2xpc3QoKTtcclxuICAgICAgfSBjYXRjaChlcnIpe1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICB9XHJcbiAgfTtcclxuXHJcbiAgIC8qXHJcbiAgICByZW5kZXJCdXR0b246IFJldHVybnMgYSBidXR0b24gYmFzZWQgb24gdGhlIHN0YXRlIG9mIHRoZSBkYXBwXHJcbiAgKi9cclxuICAgIGNvbnN0IHJlbmRlckJ1dHRvbiA9ICgpID0+IHtcclxuICAgICAgICBpZiAod2FsbGV0Q29ubmVjdGVkKSB7XHJcbiAgICAgICAgICBpZiAoam9pbldhaXRpbmdsaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5kZXNjcmlwdGlvbn0+XHJcbiAgICAgICAgICAgICAgICBUaGFua3MgZm9yIGpvaW5pbmcgdGhlIFdoaXRlbGlzdCFcclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAobG9hZGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gPGJ1dHRvbiBjbGFzc05hbWU9e3N0eWxlcy5idXR0b259PkxvYWRpbmcuLi48L2J1dHRvbj47XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17YWRkQWRkcmVzc1RvV2FpdGluZ2xpc3R9IGNsYXNzTmFtZT17c3R5bGVzLmJ1dHRvbn0+XHJcbiAgICAgICAgICAgICAgICBKb2luIHRoZSBXaGl0ZWxpc3RcclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtjb25uZWN0V2FsbGV0fSBjbGFzc05hbWU9e3N0eWxlcy5idXR0b259PlxyXG4gICAgICAgICAgICAgIENvbm5lY3QgeW91ciB3YWxsZXRcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCB3aGVuZXZlciB0aGUgdmFsdWUgb2YgYHdhbGxldENvbm5lY3RlZGAgY2hhbmdlcyAtIHRoaXMgZWZmZWN0IHdpbGwgYmUgY2FsbGVkXHJcbiAgICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcblxyXG4gICAgICAgIGlmKCF3YWxsZXRDb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgLy9Bc3NpZ24gdGhlIHdlYjNtb2RhbCBjbGFzcyB0byB0aGUgcmVmZXJlbmNlb2JqZWN0IGJ5IHNldHRpbmcgaXQncyAnY3VycmVudCcgdmFsdWVcclxuICAgICAgICAgICAgLy9UaGUgJ2N1cnJlbnQnIHZhbHVlIGlzIHBlcmlzaGVkIHRocm91Z2h0b3V0IGFzIGxvbmcgYXMgdGhpcyBwYWdlIGlzIG9wZW5cclxuICAgICAgICAgICAgd2ViM01vZGFsUmVmLmN1cnJlbnQgPSBuZXcgV2ViM01vZGFsKHtcclxuICAgICAgICAgICAgICAgIG5ldHdvcms6IFwicmlua2VieVwiLFxyXG4gICAgICAgICAgICAgICAgcHJvdmlkZXJPcHRpb25zOiB7fSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVJbmplY3RlZFByb3ZpZGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbm5lY3RXYWxsZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIFt3YWxsZXRDb25uZWN0ZWRdKTtcclxuXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxIZWFkPlxyXG4gICAgICAgICAgICA8dGl0bGU+V2hpdGVsaXN0IERhcHA8L3RpdGxlPlxyXG4gICAgICAgICAgICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PVwiV2hpdGVsaXN0LURhcHBcIiAvPlxyXG4gICAgICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9mYXZpY29uLmljb1wiIC8+XHJcbiAgICAgICAgICA8L0hlYWQ+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1haW59PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9e3N0eWxlcy50aXRsZX0+V2VsY29tZSB0byBDcnlwdG8gRGV2cyE8L2gxPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZGVzY3JpcHRpb259PlxyXG4gICAgICAgICAgICAgICAgSXRzIGFuIE5GVCBjb2xsZWN0aW9uIGZvciBkZXZlbG9wZXJzIGluIENyeXB0by5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmRlc2NyaXB0aW9ufT5cclxuICAgICAgICAgICAgICAgIHtudW1iZXJPZldhaXRpbmdsaXN0fSBoYXZlIGFscmVhZHkgam9pbmVkIHRoZSBXaGl0ZWxpc3RcclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICB7cmVuZGVyQnV0dG9uKCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPXtzdHlsZXMuaW1hZ2V9IHNyYz1cIi4vY3J5cHRvLWRldnMuc3ZnXCIgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgIFxyXG4gICAgICAgICAgPGZvb3RlciBjbGFzc05hbWU9e3N0eWxlcy5mb290ZXJ9PlxyXG4gICAgICAgICAgICBNYWRlIHdpdGggJiMxMDA4NDsgYnkgQ3J5cHRvIERldnNcclxuICAgICAgICAgIDwvZm9vdGVyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEhvbWU7IiwiIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXRoZXJzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvaGVhZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2ViM21vZGFsXCIpOyJdLCJuYW1lcyI6WyJhYmkiLCJXSElURUxJU1RfQ09OVFJBQ1RfQUREUkVTUyIsIkhlYWQiLCJzdHlsZXMiLCJXZWIzTW9kYWwiLCJwcm92aWRlcnMiLCJDb250cmFjdCIsInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZVN0YXRlIiwiV0FJVElOR0xJU1RfQ09OVFJBQ1RfQUREUkVTUyIsIkhvbWUiLCJ3YWxsZXRDb25uZWN0ZWQiLCJzZXRXYWxsZXRDb25uZWN0ZWQiLCJqb2luV2FpdGluZ2xpc3QiLCJzZXRKb2luV2FpdGluZ2xpc3QiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsIm51bWJlck9mV2FpdGluZ2xpc3QiLCJzZXROdW1iZXJPZldhaXRpbmdsaXN0Iiwid2ViM01vZGFsUmVmIiwiZ2V0UHJvdmlkZXJPclNpZ25lciIsIm5lZWRTaWduZXIiLCJwcm92aWRlciIsImN1cnJlbnQiLCJjb25uZWN0Iiwid2ViM1Byb3ZpZGVyIiwiV2ViM1Byb3ZpZGVyIiwiY2hhaW5JZCIsImdldE5ldHdvcmsiLCJ3aW5kb3ciLCJhbGVydCIsIkVycm9yIiwic2lnbmVyIiwiZ2V0U2lnbmVyIiwiYWRkQWRkcmVzc1RvV2FpdGluZ2xpc3QiLCJ3YWl0aW5nbGlzdENvbnRyYWN0IiwidHgiLCJ3YWl0IiwiZ2V0TnVtYmVyT2ZXYWl0aW5nbGlzdCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIl9udW1iZXJPZldhaXRpbmdsaXN0IiwibnVtQWRkcmVzc2VzV2FpdGluZ2xpc3QiLCJjaGVja0lmQWRkcmVzc0lud2FpdGluZ2xpc3QiLCJhZGRyZXNzIiwiZ2V0QWRkcmVzcyIsIl9qb2luV2FpdGluZ2xpc3QiLCJ3YWl0aW5nbGlzdEFkZHJlc3NlcyIsImNvbm5lY3RXYWxsZXQiLCJyZW5kZXJCdXR0b24iLCJkZXNjcmlwdGlvbiIsImJ1dHRvbiIsIm5ldHdvcmsiLCJwcm92aWRlck9wdGlvbnMiLCJkaXNhYmxlSW5qZWN0ZWRQcm92aWRlciIsIm1haW4iLCJ0aXRsZSIsImltYWdlIiwiZm9vdGVyIl0sInNvdXJjZVJvb3QiOiIifQ==