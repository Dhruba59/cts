"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./app/globals.css":
/*!*************************!*\
  !*** ./app/globals.css ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"b5dff068662d\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzPzFkMzYiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJiNWRmZjA2ODY2MmRcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./components/Sidebar.js":
/*!*******************************!*\
  !*** ./components/Sidebar.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/bs */ \"(app-pages-browser)/./node_modules/react-icons/bs/index.esm.js\");\n/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/ai */ \"(app-pages-browser)/./node_modules/react-icons/ai/index.esm.js\");\n/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/ri */ \"(app-pages-browser)/./node_modules/react-icons/ri/index.esm.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nconst Sidebar = ()=>{\n    _s();\n    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [submenuOpen, setSubmenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const menus = [\n        {\n            title: \"Dashboard\"\n        },\n        {\n            title: \"Settings\",\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_ai__WEBPACK_IMPORTED_MODULE_2__.AiOutlineSetting, {}, void 0, false, {\n                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                lineNumber: 26,\n                columnNumber: 32\n            }, undefined)\n        },\n        {\n            title: \"Media\",\n            spacing: true,\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_bs__WEBPACK_IMPORTED_MODULE_3__.BsFileImageFill, {}, void 0, false, {\n                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                lineNumber: 27,\n                columnNumber: 44\n            }, undefined)\n        },\n        {\n            title: \"Projects\",\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_ai__WEBPACK_IMPORTED_MODULE_2__.AiOutlineBarChart, {}, void 0, false, {\n                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                lineNumber: 30,\n                columnNumber: 13\n            }, undefined),\n            submenu: true,\n            subMenuItems: [\n                {\n                    title: \"Sub-1\"\n                },\n                {\n                    title: \"Sub-2\"\n                },\n                {\n                    title: \"Sub-3\"\n                }\n            ]\n        },\n        {\n            title: \"Profile\",\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_bs__WEBPACK_IMPORTED_MODULE_3__.BsPerson, {}, void 0, false, {\n                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                lineNumber: 34,\n                columnNumber: 31\n            }, undefined)\n        },\n        {\n            title: \"Logout\",\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_ai__WEBPACK_IMPORTED_MODULE_2__.AiOutlineLogout, {}, void 0, false, {\n                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                lineNumber: 35,\n                columnNumber: 30\n            }, undefined)\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"bg-dark-purple h-screen p-5 \".concat(open ? \"w-72\" : \"w-20\", \"  relative duration-300\"),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_bs__WEBPACK_IMPORTED_MODULE_3__.BsArrowLeftShort, {\n                className: \"bg-white text-dark-purple text-3xl rounded-full absolute \\n        -right-3 top-9 border border-dark-purple \".concat(!open && \"rotate-180\"),\n                onClick: ()=>setOpen(!open)\n            }, void 0, false, {\n                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                lineNumber: 43,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"inline-flex\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_ai__WEBPACK_IMPORTED_MODULE_2__.AiFillEnvironment, {\n                        className: \"bg-amber-300 text-4xl rounded cursor-pointer\\n          block float-left mr-2 duration-500 \".concat(open && \"rotate-[360deg]\")\n                    }, void 0, false, {\n                        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                        lineNumber: 49,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-white origin-left font-medium text-2xl duration-300 \".concat(!open && \"scale-0\"),\n                        children: \"Database\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                        lineNumber: 53,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                lineNumber: 48,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex items-center rounded-md bg-light-white mt-6 \".concat(!open ? \"px-2.5\" : \"px-4\", \" py-2\"),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_bs__WEBPACK_IMPORTED_MODULE_3__.BsSearch, {\n                        className: \"text-white text block float-left cursor-pointer \".concat(open && \"mr-2\")\n                    }, void 0, false, {\n                        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                        lineNumber: 66,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"Search\",\n                        placeholder: \"Search\",\n                        className: \"text-base bg-transparent w-full text-white focus:outline-none {\".concat(!open && \"hidden\", \"}\")\n                    }, void 0, false, {\n                        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                        lineNumber: 71,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                lineNumber: 61,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                className: \"pt-2\",\n                children: menus.map((menu, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                className: \"text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2\\n              hover:bg-light-white rounded-md \".concat(menu.spacing ? \"mt-9\" : \"mt-2\"),\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        className: \"text-2xl block float-left\",\n                                        children: menu.icon ? menu.icon : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_ri__WEBPACK_IMPORTED_MODULE_4__.RiDashboardFill, {}, void 0, false, {\n                                            fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                                            lineNumber: 90,\n                                            columnNumber: 42\n                                        }, undefined)\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                                        lineNumber: 89,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        className: \"text-base font-medium flex-1 duration-200 \".concat(!open && \"hidden\"),\n                                        children: menu.title\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                                        lineNumber: 92,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    menu.submenu && open && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_bs__WEBPACK_IMPORTED_MODULE_3__.BsChevronDown, {\n                                        className: \"\".concat(submenuOpen && \"rotate-180\"),\n                                        onClick: ()=>setSubmenuOpen(!submenuOpen)\n                                    }, void 0, false, {\n                                        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                                        lineNumber: 100,\n                                        columnNumber: 17\n                                    }, undefined)\n                                ]\n                            }, index, true, {\n                                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                                lineNumber: 82,\n                                columnNumber: 13\n                            }, undefined),\n                            menu.submenu && submenuOpen && open && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                                children: menu.subMenuItems.map((submenuItem, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                        className: \"text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer\\n                                 p-2 px-5 hover:bg-light-white\",\n                                        children: submenuItem.title\n                                    }, index, false, {\n                                        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                                        lineNumber: 109,\n                                        columnNumber: 19\n                                    }, undefined))\n                            }, void 0, false, {\n                                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                                lineNumber: 107,\n                                columnNumber: 15\n                            }, undefined)\n                        ]\n                    }, void 0, true))\n            }, void 0, false, {\n                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                lineNumber: 79,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n        lineNumber: 38,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Sidebar, \"vS1CMqpzLa0uB1JOnflpSZMdfH8=\");\n_c = Sidebar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sidebar);\nvar _c;\n$RefreshReg$(_c, \"Sidebar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvU2lkZWJhci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDMEI7QUFDTztBQVFUO0FBT0E7QUFDeUI7QUFFakQsTUFBTWMsVUFBVTs7SUFDZCxNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR2YsK0NBQVFBLENBQUM7SUFDakMsTUFBTSxDQUFDZ0IsYUFBYUMsZUFBZSxHQUFHakIsK0NBQVFBLENBQUM7SUFDL0MsTUFBTWtCLFFBQVE7UUFDWjtZQUFFQyxPQUFPO1FBQVk7UUFDckI7WUFBRUEsT0FBTztZQUFZQyxvQkFBTSw4REFBQ1YsNERBQWdCQTs7Ozs7UUFBSTtRQUNoRDtZQUFFUyxPQUFPO1lBQVNFLFNBQVM7WUFBTUQsb0JBQU0sOERBQUNoQiwyREFBZUE7Ozs7O1FBQUk7UUFDM0Q7WUFDRWUsT0FBTztZQUNQQyxvQkFBTSw4REFBQ1osNkRBQWlCQTs7Ozs7WUFDeEJjLFNBQVM7WUFDVEMsY0FBYztnQkFBQztvQkFBRUosT0FBTztnQkFBUTtnQkFBRztvQkFBRUEsT0FBTztnQkFBUTtnQkFBRztvQkFBRUEsT0FBTztnQkFBUTthQUFFO1FBQzVFO1FBQ0E7WUFBRUEsT0FBTztZQUFXQyxvQkFBTSw4REFBQ2Qsb0RBQVFBOzs7OztRQUFJO1FBQ3ZDO1lBQUVhLE9BQU87WUFBVUMsb0JBQU0sOERBQUNULDJEQUFlQTs7Ozs7UUFBSTtLQUM5QztJQUNELHFCQUNFLDhEQUFDYTtRQUNDQyxXQUFXLCtCQUVWLE9BRENYLE9BQU8sU0FBUyxRQUNqQjs7MEJBRUQsOERBQUNiLDREQUFnQkE7Z0JBQ2Z3QixXQUFXLCtHQUNzRCxPQUF0QixDQUFDWCxRQUFRO2dCQUNwRFksU0FBUyxJQUFNWCxRQUFRLENBQUNEOzs7Ozs7MEJBRTFCLDhEQUFDVTtnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNsQiw2REFBaUJBO3dCQUNoQmtCLFdBQVcsOEZBQ29ELE9BQTFCWCxRQUFROzs7Ozs7a0NBRS9DLDhEQUFDYTt3QkFDQ0YsV0FBVyw0REFFVixPQURDLENBQUNYLFFBQVE7a0NBRVo7Ozs7Ozs7Ozs7OzswQkFJSCw4REFBQ1U7Z0JBQ0NDLFdBQVcsb0RBRVYsT0FEQyxDQUFDWCxPQUFPLFdBQVcsUUFDcEI7O2tDQUVELDhEQUFDWixvREFBUUE7d0JBQ1B1QixXQUFXLG1EQUVWLE9BRENYLFFBQVE7Ozs7OztrQ0FHWiw4REFBQ2M7d0JBQ0NDLE1BQU07d0JBQ05DLGFBQVk7d0JBQ1pMLFdBQVcsa0VBRVYsT0FEQyxDQUFDWCxRQUFRLFVBQ1Y7Ozs7Ozs7Ozs7OzswQkFHTCw4REFBQ2lCO2dCQUFHTixXQUFVOzBCQUNYUCxNQUFNYyxHQUFHLENBQUMsQ0FBQ0MsTUFBTUMsc0JBQ2hCOzswQ0FDRSw4REFBQ0M7Z0NBRUNWLFdBQVcscUhBR1YsT0FEQ1EsS0FBS1osT0FBTyxHQUFHLFNBQVM7O2tEQUcxQiw4REFBQ2U7d0NBQUtYLFdBQVU7a0RBQ2JRLEtBQUtiLElBQUksR0FBR2EsS0FBS2IsSUFBSSxpQkFBRyw4REFBQ1IsMkRBQWVBOzs7Ozs7Ozs7O2tEQUUzQyw4REFBQ3dCO3dDQUNDWCxXQUFXLDZDQUVWLE9BREMsQ0FBQ1gsUUFBUTtrREFHVm1CLEtBQUtkLEtBQUs7Ozs7OztvQ0FFWmMsS0FBS1gsT0FBTyxJQUFJUixzQkFDZiw4REFBQ1gseURBQWFBO3dDQUNac0IsV0FBVyxHQUErQixPQUE1QlQsZUFBZTt3Q0FDN0JVLFNBQVMsSUFBTVQsZUFBZSxDQUFDRDs7Ozs7OzsrQkFuQjlCa0I7Ozs7OzRCQXVCTkQsS0FBS1gsT0FBTyxJQUFJTixlQUFlRixzQkFDOUIsOERBQUNpQjswQ0FDRUUsS0FBS1YsWUFBWSxDQUFDUyxHQUFHLENBQUMsQ0FBQ0ssYUFBYUgsc0JBQ25DLDhEQUFDQzt3Q0FFQ1YsV0FBWTtrREFHWFksWUFBWWxCLEtBQUs7dUNBSmJlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWN6QjtHQXZHTXJCO0tBQUFBO0FBeUdOLCtEQUFlQSxPQUFPQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvU2lkZWJhci5qcz8zZGFjIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XHJcbiAgQnNBcnJvd0xlZnRTaG9ydCxcclxuICBCc1NlYXJjaCxcclxuICBCc0NoZXZyb25Eb3duLFxyXG4gIEJzRmlsZUltYWdlRmlsbCxcclxuICBCc1JldmVyc2VCYWNrc3BhY2VSZXZlcnNlLFxyXG4gIEJzUGVyc29uXHJcbn0gZnJvbSBcInJlYWN0LWljb25zL2JzXCI7XHJcbmltcG9ydCB7XHJcbiAgQWlGaWxsRW52aXJvbm1lbnQsXHJcbiAgQWlPdXRsaW5lQmFyQ2hhcnQsXHJcbiAgQWlPdXRsaW5lTWFpbCxcclxuICBBaU91dGxpbmVTZXR0aW5nLFxyXG4gIEFpT3V0bGluZUxvZ291dFxyXG59IGZyb20gXCJyZWFjdC1pY29ucy9haVwiO1xyXG5pbXBvcnQgeyBSaURhc2hib2FyZEZpbGwgfSBmcm9tIFwicmVhY3QtaWNvbnMvcmlcIjtcclxuXHJcbmNvbnN0IFNpZGViYXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW3N1Ym1lbnVPcGVuLCBzZXRTdWJtZW51T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgbWVudXMgPSBbXHJcbiAgICB7IHRpdGxlOiBcIkRhc2hib2FyZFwiIH0sXHJcbiAgICB7IHRpdGxlOiBcIlNldHRpbmdzXCIsIGljb246IDxBaU91dGxpbmVTZXR0aW5nIC8+IH0sXHJcbiAgICB7IHRpdGxlOiBcIk1lZGlhXCIsIHNwYWNpbmc6IHRydWUsIGljb246IDxCc0ZpbGVJbWFnZUZpbGwgLz4gfSxcclxuICAgIHtcclxuICAgICAgdGl0bGU6IFwiUHJvamVjdHNcIixcclxuICAgICAgaWNvbjogPEFpT3V0bGluZUJhckNoYXJ0IC8+LFxyXG4gICAgICBzdWJtZW51OiB0cnVlLFxyXG4gICAgICBzdWJNZW51SXRlbXM6IFt7IHRpdGxlOiBcIlN1Yi0xXCIgfSwgeyB0aXRsZTogXCJTdWItMlwiIH0sIHsgdGl0bGU6IFwiU3ViLTNcIiB9XVxyXG4gICAgfSxcclxuICAgIHsgdGl0bGU6IFwiUHJvZmlsZVwiLCBpY29uOiA8QnNQZXJzb24gLz4gfSxcclxuICAgIHsgdGl0bGU6IFwiTG9nb3V0XCIsIGljb246IDxBaU91dGxpbmVMb2dvdXQgLz4gfVxyXG4gIF07XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtgYmctZGFyay1wdXJwbGUgaC1zY3JlZW4gcC01ICR7XHJcbiAgICAgICAgb3BlbiA/IFwidy03MlwiIDogXCJ3LTIwXCJcclxuICAgICAgfSAgcmVsYXRpdmUgZHVyYXRpb24tMzAwYH1cclxuICAgID5cclxuICAgICAgPEJzQXJyb3dMZWZ0U2hvcnRcclxuICAgICAgICBjbGFzc05hbWU9e2BiZy13aGl0ZSB0ZXh0LWRhcmstcHVycGxlIHRleHQtM3hsIHJvdW5kZWQtZnVsbCBhYnNvbHV0ZSBcclxuICAgICAgICAtcmlnaHQtMyB0b3AtOSBib3JkZXIgYm9yZGVyLWRhcmstcHVycGxlICR7IW9wZW4gJiYgXCJyb3RhdGUtMTgwXCJ9YH1cclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKCFvcGVuKX1cclxuICAgICAgLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleFwiPlxyXG4gICAgICAgIDxBaUZpbGxFbnZpcm9ubWVudFxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYmctYW1iZXItMzAwIHRleHQtNHhsIHJvdW5kZWQgY3Vyc29yLXBvaW50ZXJcclxuICAgICAgICAgIGJsb2NrIGZsb2F0LWxlZnQgbXItMiBkdXJhdGlvbi01MDAgJHtvcGVuICYmIFwicm90YXRlLVszNjBkZWddXCJ9YH1cclxuICAgICAgICAvPlxyXG4gICAgICAgIDxoMVxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC13aGl0ZSBvcmlnaW4tbGVmdCBmb250LW1lZGl1bSB0ZXh0LTJ4bCBkdXJhdGlvbi0zMDAgJHtcclxuICAgICAgICAgICAgIW9wZW4gJiYgXCJzY2FsZS0wXCJcclxuICAgICAgICAgIH1gfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIERhdGFiYXNlXHJcbiAgICAgICAgPC9oMT5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciByb3VuZGVkLW1kIGJnLWxpZ2h0LXdoaXRlIG10LTYgJHtcclxuICAgICAgICAgICFvcGVuID8gXCJweC0yLjVcIiA6IFwicHgtNFwiXHJcbiAgICAgICAgfSBweS0yYH1cclxuICAgICAgPlxyXG4gICAgICAgIDxCc1NlYXJjaFxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC13aGl0ZSB0ZXh0IGJsb2NrIGZsb2F0LWxlZnQgY3Vyc29yLXBvaW50ZXIgJHtcclxuICAgICAgICAgICAgb3BlbiAmJiBcIm1yLTJcIlxyXG4gICAgICAgICAgfWB9XHJcbiAgICAgICAgLz5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgIHR5cGU9e1wiU2VhcmNoXCJ9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LWJhc2UgYmctdHJhbnNwYXJlbnQgdy1mdWxsIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIHske1xyXG4gICAgICAgICAgICAhb3BlbiAmJiBcImhpZGRlblwiXHJcbiAgICAgICAgICB9fWB9XHJcbiAgICAgICAgPjwvaW5wdXQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8dWwgY2xhc3NOYW1lPVwicHQtMlwiPlxyXG4gICAgICAgIHttZW51cy5tYXAoKG1lbnUsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICA8PlxyXG4gICAgICAgICAgICA8bGlcclxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtZ3JheS0zMDAgdGV4dC1zbSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAteC00IGN1cnNvci1wb2ludGVyIHAtMlxyXG4gICAgICAgICAgICAgIGhvdmVyOmJnLWxpZ2h0LXdoaXRlIHJvdW5kZWQtbWQgJHtcclxuICAgICAgICAgICAgICAgIG1lbnUuc3BhY2luZyA/IFwibXQtOVwiIDogXCJtdC0yXCJcclxuICAgICAgICAgICAgICB9YH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsIGJsb2NrIGZsb2F0LWxlZnRcIj5cclxuICAgICAgICAgICAgICAgIHttZW51Lmljb24gPyBtZW51Lmljb24gOiA8UmlEYXNoYm9hcmRGaWxsIC8+fVxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1iYXNlIGZvbnQtbWVkaXVtIGZsZXgtMSBkdXJhdGlvbi0yMDAgJHtcclxuICAgICAgICAgICAgICAgICAgIW9wZW4gJiYgXCJoaWRkZW5cIlxyXG4gICAgICAgICAgICAgICAgfWB9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge21lbnUudGl0bGV9XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgIHttZW51LnN1Ym1lbnUgJiYgb3BlbiAmJiAoXHJcbiAgICAgICAgICAgICAgICA8QnNDaGV2cm9uRG93blxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N1Ym1lbnVPcGVuICYmIFwicm90YXRlLTE4MFwifWB9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFN1Ym1lbnVPcGVuKCFzdWJtZW51T3Blbil9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIHttZW51LnN1Ym1lbnUgJiYgc3VibWVudU9wZW4gJiYgb3BlbiAmJiAoXHJcbiAgICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAge21lbnUuc3ViTWVudUl0ZW1zLm1hcCgoc3VibWVudUl0ZW0sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgIDxsaVxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1ncmF5LTMwMCB0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGdhcC14LTQgY3Vyc29yLXBvaW50ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC0yIHB4LTUgaG92ZXI6YmctbGlnaHQtd2hpdGVgfVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge3N1Ym1lbnVJdGVtLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvPlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L3VsPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNpZGViYXI7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiQnNBcnJvd0xlZnRTaG9ydCIsIkJzU2VhcmNoIiwiQnNDaGV2cm9uRG93biIsIkJzRmlsZUltYWdlRmlsbCIsIkJzUmV2ZXJzZUJhY2tzcGFjZVJldmVyc2UiLCJCc1BlcnNvbiIsIkFpRmlsbEVudmlyb25tZW50IiwiQWlPdXRsaW5lQmFyQ2hhcnQiLCJBaU91dGxpbmVNYWlsIiwiQWlPdXRsaW5lU2V0dGluZyIsIkFpT3V0bGluZUxvZ291dCIsIlJpRGFzaGJvYXJkRmlsbCIsIlNpZGViYXIiLCJvcGVuIiwic2V0T3BlbiIsInN1Ym1lbnVPcGVuIiwic2V0U3VibWVudU9wZW4iLCJtZW51cyIsInRpdGxlIiwiaWNvbiIsInNwYWNpbmciLCJzdWJtZW51Iiwic3ViTWVudUl0ZW1zIiwiZGl2IiwiY2xhc3NOYW1lIiwib25DbGljayIsImgxIiwiaW5wdXQiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJ1bCIsIm1hcCIsIm1lbnUiLCJpbmRleCIsImxpIiwic3BhbiIsInN1Ym1lbnVJdGVtIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/Sidebar.js\n"));

/***/ })

});