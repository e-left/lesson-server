import React, { Component } from "react";
import dynamic from "next/dynamic";

const CUSTOM_OPERATORS = [
    ["\\pm", "\\pm"],
    ["\\sqrt{x}", "\\sqrt"],
    ["\\sqrt[3]{x}", "\\sqrt[3]{}"],
    ["\\sqrt[n]{x}", "\\nthroot"],
    ["\\frac{x}{y}", "\\frac"],
    ["\\sum^{s}_{x}{d}", "\\sum"],
    ["\\prod^{s}_{x}{d}", "\\prod"],
    ["\\int^{s}_{x}{d}", "\\int"],
    ["\\binom{n}{k}", "\\binom"],
    ["\\nless", "\\nless"],
    ["\\leq", "\\leq"],
    ["\\leqslant", "\\leqslant"],
    ["\\nleq", "\\nleq"],
    ["\\nleqslant", "\\nleqslant"],
    ["\\ngtr", "\\ngtr"],
    ["\\geq", "\\geq"],
    ["\\geqslant", "\\geqslant"],
    ["\\ngeq", "\\ngeq"],
    ["\\ngeqslant", "\\ngeqslant"],
    ["\\approx", "\\approx"],
    ["\\simeq", "\\simeq"],
    ["\\sim", "\\sim"],
    ["\\propto", "\\propto"],
    ["\\neq", "\\neq"],
    ["\\ll", "\\ll"],
    ["\\gg", "\\gg"],
    ["\\subset", "\\subset"],
    ["\\supset", "\\supset"],
    ["\\not\\subset", "\\not\\subset"],
    ["\\not\\supset", "\\not\\supset"],
    ["\\subseteq", "\\subseteq"],
    ["\\supseteq", "\\supseteq"],
    ["\\nsubseteq", "\\nsubseteq"],
    ["\\nsupseteq", "\\nsupseteq"],
    ["\\times", "\\times"],
    ["\\div", "\\div"],
    ["\\emptyset", "\\emptyset"],
    ["\\N", "\\N"],
    ["\\Z", "\\Z"],
    ["\\Q", "\\Q"],
    ["\\mathbb{A}", "\\mathbb{A}"],
    ["\\mathbb{B}", "\\mathbb{B}"],
    ["\\mathbb{S}", "\\mathbb{S}"],
    ["\\R", "\\R"],
    ["\\C", "\\C"],
    ["\\in", "\\in"],
    ["\\notin", "\\notin"],
    ["\\ni", "\\ni"],
    ["\\cup", "\\cup"],
    ["\\cap", "\\cap"],
    ["\\setminus", "\\setminu"],
    ["\\exists", "\\exists"],
    ["\\exists!", "\\exists!"],
    ["\\nexists", "\\nexists"],
    ["\\forall", "\\forall"],
    ["\\neg", "\\neg"],
    ["\\lor", "\\lor"],
    ["\\land", "\\land"],
    ["\\implies", "\\implies"],
    ["\\Rightarrow", "\\Rightarrow"],
    ["\\Leftarrow", "\\Leftarrow"],
    ["\\Longleftarrow", "\\Longleftarrow"],
    ["\\iff", "\\iff"],
    ["\\Leftrightarrow", "\\Leftrightarrow"],
    ["\\to", "\\to"],
    ["\\gets", "\\gets"],
    ["\\lim_{x\\to n}", "\\lim"],
];

const QuillEditor = dynamic(
    () => import("./QuillEditor").then((mod) => mod.default),
    { ssr: false, loading: () => <p>Editor loading ...</p> }
);

class ChemEditor extends React.Component {

    render() {
        return <QuillEditor options={{ displayHistory: true, operators: CUSTOM_OPERATORS }} {...this.props} />;
    }
}

export default ChemEditor;