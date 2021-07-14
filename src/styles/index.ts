import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		width: 100vw;
		height: 100vh;
		background: ${({ theme }) => theme.colors.background};
		font-family: 'Lato', sans-serif;
		text-rendering: optimizeLegibility !important;
		-webkit-font-smoothing: antialiased !important;

		display: flex;
		justify-content: center;

		overflow-x: hidden;
	}

	a {
		text-decoration: none;
		color: unset;
	}

	input,
	button,
	textarea {
		outline: 0;
	}

	#root {
		width: 100vw;
	}
`
