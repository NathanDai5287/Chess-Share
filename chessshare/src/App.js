import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

import { useState } from 'react';

import './index.css';

const App = () => {
	const pgn = `[Event "Live Chess"]
  [Site "Chess.com"]
  [Date "2023.04.14"]
  [Round "-"]
  [White "rajbedi"]
  [Black "ShiBoGod"]
  [Result "1-0"]
  [WhiteElo "1394"]
  [BlackElo "1398"]
  [TimeControl "600"]
  [EndTime "22:22:45 PDT"]
  [Termination "rajbedi won by resignation"]

  1. e4 c6 2. d4 d5 3. e5 Bf5 4. Bd3 Bxd3 5. Qxd3 e6 6. Qb3 Qb6 7. Qxb6 axb6 8.
  Nf3 c5 9. Be3 Nc6 10. dxc5 bxc5 11. O-O Nge7 12. c3 Nf5 13. Na3 Nxe3 14. fxe3 c4
  15. Nb5 Rc8 16. Ng5 f5 17. exf6 gxf6 18. Rxf6 Bc5 19. Rxe6+ Kd7 20. Kh1 Bxe3 21.
  Rxe3 Rhf8 22. h3 Rf5 23. Nxh7 Rh8 24. Rf3 Rh5 25. Nf6+ 1-0
  `;

	const getFenArr = (board) => {
		const tempBoard = new Chess();
		return board.history().map((move) => {
			tempBoard.move(move);
			return tempBoard.fen();
		});
	};

	const [fen, setFen] = useState('start');
	const [i, setI] = useState(0);

	const board = new Chess();
	board.loadPgn(pgn);

	const fenArr = ['start', ...getFenArr(board)];

	const handleKeyDown = (e) => {
		switch (e.key) {
			case 'ArrowRight':
				setI(Math.min(i + 1, fenArr.length - 1));
				break;
			case 'ArrowLeft':
				setI(Math.max(i - 1, 0));
				break;
			default:
				break;
		}
		setFen(fenArr[i]);
	};

	return (
		<div
			id='container'
			tabIndex={0}
			onKeyDown={handleKeyDown}
		>
			<Chessboard
				arePiecesDraggable={false}
				position={fen}
			/>
		</div>
	);
};

export default App;
