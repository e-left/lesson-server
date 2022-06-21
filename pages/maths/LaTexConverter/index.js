import Head from 'next/head';
import Link from 'next/link';

export default function LaTexConverter() {
    // convert button onclick handler
    const onConvertClick = () => {
        let content = document.getElementById("src").value;

        // perform the editing here // limit problem // replace \underset{A}{\mathop{\lim }} with \lim_{A}
        // regex to get source string: /\\underset{[^}]*}{\\mathop{\\lim }}/
        // afterwards remove 17 characters from the end and 10 from the beginning to get A
        // finally construct the sequence
        let limitRegex = /\\underset{[^}]*}{\\mathop{\\lim }}/g;
        content = content.replace(limitRegex, (matched) => { return `\\lim_{${matched.slice(10, -17)}}`; });
        let commaRegex = /\\,/g;
        content = content.replace(commaRegex, ",");
	content = content.replaceAll("\\left", "");
	content = content.replaceAll("\\right", "");
	content = content.replaceAll("\\!", "!");
	content = content.replaceAll("\\{", "{");
	content = content.replaceAll("\\}", "}");
	content = content.replaceAll("\\cdots", "...");

        document.getElementById("dst").value = content;
    }

    return (
        <>
            <Head>
                <title>LaTexConverter</title>
            </Head>
            {/* main body: textarea, below textarea, below button button, buttons in same row */}
            <div className="container d-flex justify-content-center mt-5">
                <div className="border border-primary rounded p-3">
                    <div className="col justify-content-center">
                        <div className="row justify-content-center p-3 m-3">
                            <div className="col-auto">
                                <h3>LaTex Converter</h3>
                            </div>
                        </div>
                        <div className="row p-3 m-3">
                            Source:
                            <textarea id="src"></textarea>
                        </div>
                        <div className="row p-3 m-3">
                            Destination:
                            <textarea id="dst"></textarea>
                        </div>
                        <div className="row justify-content-center p-3 m-3">
                            <div className="col-auto">
                                <button className="btn btn-outline-success btn-lg" onClick={onConvertClick}>Convert</button>
                            </div>
                            <div className="col-auto">
                                <Link href="/maths" passHref>
                                    <button className="btn btn-outline-danger btn-lg">Back</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
