import "./flex.css";
import React, { useEffect, useState } from "react";
import { setupResizerEvents } from "./splitUtils.js";

const App1 = () => {
	return (
		<div>
			<div>Texto app1</div>
		</div>
	);
};

const App2 = () => {
	return (
		<div>
			<div>Texto app2</div>
		</div>
	);
};

const App3 = () => {
	return (
		<div>
			<div>Texto app3</div>
		</div>
	);
};

export default function App() {
	// const ContenidoInicial = "hola";

	const [spPanes, setSpPanes] = useState([
		{ contenido: [<App1 />], orientacion: "h" }
	]);

	useEffect(() => {
		setupResizerEvents();
	}, []);

	// useEffect(() => {
	// 	console.log("llego");
	// }, [spPanes]);

	function splitTab(orientacion, content) {
		if (spPanes.length === 1 && spPanes[0].contenido.length === 1) {
			spPanes[0].orientacion = orientacion;
		}
		orientacion === spPanes[spPanes.length - 1].orientacion
			? spPanes[spPanes.length - 1].contenido.push(content) &&
			  setSpPanes((spPanes) => [...spPanes])
			: setSpPanes((spPanes) => [
					...spPanes,
					{ contenido: [content], orientacion: orientacion }
			  ]);
		// const newPane = { contenido: content, orientacion: orientacion };
		// setSpPanes((spPanes) => [...spPanes, newPane]);
		//spPanes.push({ contenido: content, orientacion: orientacion });
	}

	const spaneTmp = (sps) => {
		const rsps = sps.reverse(); //reverse split panes
		return rsps.map((spane, i) => (
			<flex key={i} className={spane.orientacion} style={{ flex: "auto" }}>
				{rsps.length !== 1 ? rsps.pop() && spaneTmp(rsps) : null}
				{spane.contenido.map((cont, j) => (
					<>
						<flex-item key={i + j}>{cont}</flex-item>
						{j !== spane.contenido.length - 1 ? (
							<flex-resizer key={i + j + 1}></flex-resizer>
						) : null}
					</>
				))}
			</flex>
		));
	};

	return (
		<div className="fsWrap">
			<div className="fixButton">
				<button
					onClick={() => {
						splitTab("v", <App2 />);
					}}
				>
					-
				</button>
				<button
					onClick={() => {
						splitTab("h", <App3 />);
					}}
				>
					|
				</button>
			</div>
			<div className="flexWrapper">{spaneTmp([...spPanes])}</div>
		</div>
	);
}
