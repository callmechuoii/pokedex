import { useState } from "react";

type Props = {
	done: number;
	name: string;
	type: string;
};

const Stat: React.FC<Props> = ({ done, name, type }) => {
	const [style, setStyle] = useState({});

	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`,
		};

		setStyle(newStyle);
	}, 200);

	return (
		<div className='flex justify-center'>
			<p className='capitalize min-w-[200px]'>{name}</p>
			<div className='bg-slate-200 rounded-3xl relative my-4 mx-0 h-8 w-80'>
				<div className={`rounded-3xl text-white flex items-center justify-center h-full w-0 opacity-0 ease-out duration-1000 delay-300 ${type}-stat`} style={style}>
					{done}
				</div>
			</div>
		</div>
	);
};

export default Stat;
