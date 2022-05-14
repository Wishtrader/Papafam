import React from 'react'
import styled from 'styled-components';
import Head from 'next/head';
import {Button} from '@material-ui/core';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {
	const auth = getAuth();
	const provider = new GoogleAuthProvider();
	const signIn = () => {
		signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			const user = result.user;
		}).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.email;
			const credential = GoogleAuthProvider.credentialFromError(error);
		});
	}

	return (
		<Container>
			<Head>
				<title>Login</title>
			</Head>
			<LoginContainer>
				<Logo src="https://remontoff-odintsovo.ru/wp-content/uploads/wa.png"/>
				<Button onClick={signIn} variant="outlined">Sign in with Google</Button>
			</LoginContainer>
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
	background-color: whitesmoke;
`;

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 100px;
	align-items: center;
	background-color: #fff;
	box-shadow: 0 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
	width: 150px;
	height: 150px;
	margin-bottom: 20px;
`;

export default Login