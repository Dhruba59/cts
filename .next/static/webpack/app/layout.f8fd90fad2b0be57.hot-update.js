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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"2ac85089ca5a\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzPzFkMzYiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCIyYWM4NTA4OWNhNWFcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./components/Sidebar.js":
/*!*******************************!*\
  !*** ./components/Sidebar.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/bs */ \"(app-pages-browser)/./node_modules/react-icons/bs/index.esm.js\");\n/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/ai */ \"(app-pages-browser)/./node_modules/react-icons/ai/index.esm.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst Sidebar = ()=>{\n    _s();\n    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const menus = [\n        {\n            title: \"Home\"\n        },\n        {\n            title: \"Pages\"\n        },\n        {\n            title: \"Media\",\n            spacing: true\n        },\n        {\n            title: \"Projects\",\n            submenu: true,\n            subMenuItems: [\n                {\n                    title: \"Sub-1\"\n                },\n                {\n                    title: \"Sub-2\"\n                },\n                {\n                    title: \"Sub-3\"\n                }\n            ]\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"bg-dark-purple h-screen p-5 \".concat(open ? \"w-72\" : \"w-20\", \"  relative duration-300\"),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_bs__WEBPACK_IMPORTED_MODULE_2__.BsArrowLeftShort, {\n                className: \"bg-white text-dark-purple text-3xl rounded-full absolute \\n        -right-3 top-9 border border-dark-purple \".concat(!open && \"rotate-180\"),\n                onClick: ()=>setOpen(!open)\n            }, void 0, false, {\n                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"inline-flex\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_ai__WEBPACK_IMPORTED_MODULE_3__.AiFillEnvironment, {\n                        className: \"bg-amber-300 text-4xl rounded cursor-pointer\\n          block float-left mr-2 duration-500 \".concat(open && \"rotate-[360deg]\")\n                    }, void 0, false, {\n                        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                        lineNumber: 31,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-white origin-left font-medium text-2xl duration-300 \".concat(!open && \"scale-0\"),\n                        children: \"Database\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                        lineNumber: 35,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex items-center rounded-md bg-light-white mt-6 \".concat(!open ? \"px-2.5\" : \"px-4\", \" py-2\"),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_bs__WEBPACK_IMPORTED_MODULE_2__.BsSearch, {\n                        className: \"text-white text block float-left cursor-pointer \".concat(open && \"mr-2\")\n                    }, void 0, false, {\n                        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                        lineNumber: 48,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"Search\",\n                        placeholder: \"Search\",\n                        className: \"text-base bg-transparent w-full text-white focus:outline-none {\".concat(!open && \"hidden\", \"}\")\n                    }, void 0, false, {\n                        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                        lineNumber: 53,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                lineNumber: 43,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                className: \"pt-2\",\n                children: menus.map((menu, index)=>{\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        children: menu.title\n                    }, void 0, false, {\n                        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                        lineNumber: 63,\n                        columnNumber: 11\n                    }, undefined);\n                    console.log(menu.title);\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                            className: \"text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2   hover:bg-light-white rounded-md\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                children: menu.title\n                            }, void 0, false, {\n                                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                                lineNumber: 71,\n                                columnNumber: 15\n                            }, undefined)\n                        }, index, false, {\n                            fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                            lineNumber: 66,\n                            columnNumber: 13\n                        }, undefined)\n                    }, void 0, false);\n                })\n            }, void 0, false, {\n                fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n                lineNumber: 61,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\CTS PROJECT\\\\SOURCE\\\\APP\\\\ctsdatabase_webapp\\\\components\\\\Sidebar.js\",\n        lineNumber: 20,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Sidebar, \"dVkDIfRb5RN4FjtonjBYYwpg89o=\");\n_c = Sidebar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sidebar);\nvar _c;\n$RefreshReg$(_c, \"Sidebar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvU2lkZWJhci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUMwQjtBQUNPO0FBQzJCO0FBQ1Q7QUFFbkQsTUFBTUssVUFBVTs7SUFDZCxNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR04sK0NBQVFBLENBQUM7SUFDakMsTUFBTU8sUUFBUTtRQUNaO1lBQUVDLE9BQU87UUFBTztRQUNoQjtZQUFFQSxPQUFPO1FBQVE7UUFDakI7WUFBRUEsT0FBTztZQUFTQyxTQUFTO1FBQUs7UUFDaEM7WUFDRUQsT0FBTztZQUNQRSxTQUFTO1lBQ1RDLGNBQWM7Z0JBQUM7b0JBQUVILE9BQU87Z0JBQVE7Z0JBQUc7b0JBQUVBLE9BQU87Z0JBQVE7Z0JBQUc7b0JBQUVBLE9BQU87Z0JBQVE7YUFBRTtRQUM1RTtLQUNEO0lBQ0QscUJBQ0UsOERBQUNJO1FBQ0NDLFdBQVcsK0JBRVYsT0FEQ1IsT0FBTyxTQUFTLFFBQ2pCOzswQkFFRCw4REFBQ0osNERBQWdCQTtnQkFDZlksV0FBVywrR0FDc0QsT0FBdEIsQ0FBQ1IsUUFBUTtnQkFDcERTLFNBQVMsSUFBTVIsUUFBUSxDQUFDRDs7Ozs7OzBCQUUxQiw4REFBQ087Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDViw2REFBaUJBO3dCQUNoQlUsV0FBVyw4RkFDb0QsT0FBMUJSLFFBQVE7Ozs7OztrQ0FFL0MsOERBQUNVO3dCQUNDRixXQUFXLDREQUVWLE9BREMsQ0FBQ1IsUUFBUTtrQ0FFWjs7Ozs7Ozs7Ozs7OzBCQUlILDhEQUFDTztnQkFDQ0MsV0FBVyxvREFFVixPQURDLENBQUNSLE9BQU8sV0FBVyxRQUNwQjs7a0NBRUQsOERBQUNILG9EQUFRQTt3QkFDUFcsV0FBVyxtREFFVixPQURDUixRQUFROzs7Ozs7a0NBR1osOERBQUNXO3dCQUNDQyxNQUFNO3dCQUNOQyxhQUFZO3dCQUNaTCxXQUFXLGtFQUVWLE9BREMsQ0FBQ1IsUUFBUSxVQUNWOzs7Ozs7Ozs7Ozs7MEJBR0wsOERBQUNjO2dCQUFHTixXQUFVOzBCQUNYTixNQUFNYSxHQUFHLENBQUMsQ0FBQ0MsTUFBTUM7a0NBQ2hCLDhEQUFDQztrQ0FBTUYsS0FBS2IsS0FBSzs7Ozs7O29CQUNqQmdCLFFBQVFDLEdBQUcsQ0FBQ0osS0FBS2IsS0FBSztrQ0FDdEI7a0NBQ0UsNEVBQUNrQjs0QkFFQ2IsV0FBVTtzQ0FHViw0RUFBQ1U7MENBQU1GLEtBQUtiLEtBQUs7Ozs7OzsyQkFKWmM7Ozs7OztnQkFPWDs7Ozs7Ozs7Ozs7O0FBSVI7R0F2RU1sQjtLQUFBQTtBQXlFTiwrREFBZUEsT0FBT0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL1NpZGViYXIuanM/M2RhYyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBCc0Fycm93TGVmdFNob3J0LCBCc1NlYXJjaCB9IGZyb20gXCJyZWFjdC1pY29ucy9ic1wiO1xyXG5pbXBvcnQgeyBBaUZpbGxFbnZpcm9ubWVudCB9IGZyb20gXCJyZWFjdC1pY29ucy9haVwiO1xyXG5cclxuY29uc3QgU2lkZWJhciA9ICgpID0+IHtcclxuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBtZW51cyA9IFtcclxuICAgIHsgdGl0bGU6IFwiSG9tZVwiIH0sXHJcbiAgICB7IHRpdGxlOiBcIlBhZ2VzXCIgfSxcclxuICAgIHsgdGl0bGU6IFwiTWVkaWFcIiwgc3BhY2luZzogdHJ1ZSB9LFxyXG4gICAge1xyXG4gICAgICB0aXRsZTogXCJQcm9qZWN0c1wiLFxyXG4gICAgICBzdWJtZW51OiB0cnVlLFxyXG4gICAgICBzdWJNZW51SXRlbXM6IFt7IHRpdGxlOiBcIlN1Yi0xXCIgfSwgeyB0aXRsZTogXCJTdWItMlwiIH0sIHsgdGl0bGU6IFwiU3ViLTNcIiB9XVxyXG4gICAgfVxyXG4gIF07XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtgYmctZGFyay1wdXJwbGUgaC1zY3JlZW4gcC01ICR7XHJcbiAgICAgICAgb3BlbiA/IFwidy03MlwiIDogXCJ3LTIwXCJcclxuICAgICAgfSAgcmVsYXRpdmUgZHVyYXRpb24tMzAwYH1cclxuICAgID5cclxuICAgICAgPEJzQXJyb3dMZWZ0U2hvcnRcclxuICAgICAgICBjbGFzc05hbWU9e2BiZy13aGl0ZSB0ZXh0LWRhcmstcHVycGxlIHRleHQtM3hsIHJvdW5kZWQtZnVsbCBhYnNvbHV0ZSBcclxuICAgICAgICAtcmlnaHQtMyB0b3AtOSBib3JkZXIgYm9yZGVyLWRhcmstcHVycGxlICR7IW9wZW4gJiYgXCJyb3RhdGUtMTgwXCJ9YH1cclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKCFvcGVuKX1cclxuICAgICAgLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleFwiPlxyXG4gICAgICAgIDxBaUZpbGxFbnZpcm9ubWVudFxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYmctYW1iZXItMzAwIHRleHQtNHhsIHJvdW5kZWQgY3Vyc29yLXBvaW50ZXJcclxuICAgICAgICAgIGJsb2NrIGZsb2F0LWxlZnQgbXItMiBkdXJhdGlvbi01MDAgJHtvcGVuICYmIFwicm90YXRlLVszNjBkZWddXCJ9YH1cclxuICAgICAgICAvPlxyXG4gICAgICAgIDxoMVxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC13aGl0ZSBvcmlnaW4tbGVmdCBmb250LW1lZGl1bSB0ZXh0LTJ4bCBkdXJhdGlvbi0zMDAgJHtcclxuICAgICAgICAgICAgIW9wZW4gJiYgXCJzY2FsZS0wXCJcclxuICAgICAgICAgIH1gfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIERhdGFiYXNlXHJcbiAgICAgICAgPC9oMT5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciByb3VuZGVkLW1kIGJnLWxpZ2h0LXdoaXRlIG10LTYgJHtcclxuICAgICAgICAgICFvcGVuID8gXCJweC0yLjVcIiA6IFwicHgtNFwiXHJcbiAgICAgICAgfSBweS0yYH1cclxuICAgICAgPlxyXG4gICAgICAgIDxCc1NlYXJjaFxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC13aGl0ZSB0ZXh0IGJsb2NrIGZsb2F0LWxlZnQgY3Vyc29yLXBvaW50ZXIgJHtcclxuICAgICAgICAgICAgb3BlbiAmJiBcIm1yLTJcIlxyXG4gICAgICAgICAgfWB9XHJcbiAgICAgICAgLz5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgIHR5cGU9e1wiU2VhcmNoXCJ9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LWJhc2UgYmctdHJhbnNwYXJlbnQgdy1mdWxsIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIHske1xyXG4gICAgICAgICAgICAhb3BlbiAmJiBcImhpZGRlblwiXHJcbiAgICAgICAgICB9fWB9XHJcbiAgICAgICAgPjwvaW5wdXQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8dWwgY2xhc3NOYW1lPVwicHQtMlwiPlxyXG4gICAgICAgIHttZW51cy5tYXAoKG1lbnUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICA8c3Bhbj57bWVudS50aXRsZX08L3NwYW4+O1xyXG4gICAgICAgICAgY29uc29sZS5sb2cobWVudS50aXRsZSk7XHJcbiAgICAgICAgICA8PlxyXG4gICAgICAgICAgICA8bGlcclxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtZ3JheS0zMDAgdGV4dC1zbSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAteC00IGN1cnNvci1wb2ludGVyIHAtMlxyXG4gICAgICAgICAgICAgICBob3ZlcjpiZy1saWdodC13aGl0ZSByb3VuZGVkLW1kXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxzcGFuPnttZW51LnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgIDwvPjtcclxuICAgICAgICB9KX1cclxuICAgICAgPC91bD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaWRlYmFyO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIkJzQXJyb3dMZWZ0U2hvcnQiLCJCc1NlYXJjaCIsIkFpRmlsbEVudmlyb25tZW50IiwiU2lkZWJhciIsIm9wZW4iLCJzZXRPcGVuIiwibWVudXMiLCJ0aXRsZSIsInNwYWNpbmciLCJzdWJtZW51Iiwic3ViTWVudUl0ZW1zIiwiZGl2IiwiY2xhc3NOYW1lIiwib25DbGljayIsImgxIiwiaW5wdXQiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJ1bCIsIm1hcCIsIm1lbnUiLCJpbmRleCIsInNwYW4iLCJjb25zb2xlIiwibG9nIiwibGkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/Sidebar.js\n"));

/***/ })

});