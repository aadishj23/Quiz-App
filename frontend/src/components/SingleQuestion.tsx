// import React from 'react'
import {useRecoilValue} from "recoil";
import {datastore} from "../store/atoms/datastore";
// import { AnswersHeld } from "../types/answersheld"
import {Data} from "../types/datastoretype";

function SingleQuestion(props: any) {
	// const dataStore = useRecoilValue<Data[]>(datastore)

	const styles = {
		backgroundColor: props.held ? "#59E391" : "#FFFFFF",
		border: "2px solid #000", 
	};

	// const answermap = dataStore.map(data => {
	//   return data.answers.map(finaldata => (
	//       <button  key= {finaldata.id} onClick={() => props.onclick(finaldata.id)}>{finaldata.text}</button>
	//     )
	//   )
	// })

	return (
		<div>
      <br />
			{props.question}
			<br />
			{Object.entries(props.answers).map(
				([key, answer]) =>
					answer && (
						<button key={key} className="m-[15px]" onClick={props.onclick(key)} style={styles}>
							{answer as React.ReactNode}
						</button>
					),
			)}
			<br />
			<br />
		</div>
	);
}

export default SingleQuestion;
