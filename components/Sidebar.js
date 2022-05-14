import { Avatar, IconButton, Button } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator';
import {auth, db} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {doc, setDoc} from "firebase/firestore";

function Sidebar() {
	const [user] = useAuthState(auth);
	const createChat = () => {
		const input = prompt('Please enter an email address for the user you want to chat with')

		if (!input) return;

		if (EmailValidator.validate(input)) {
			setDoc(doc(db,'chats', user.uid), {users: [user.email, input]}, {merge: true})
				.then(() => {
					console.log("New chat created");
				})
				.catch((error) => {
					console.error('Error writing document: ', error);
				})
		}
	}

	return (
		<Container>
			<Header>
				<UserAvatar onClick={() => auth.signOut()} />
				<IconsContainer>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</IconsContainer>
			</Header>

			<Search>
				<SearchIcon />
				<SearchInput placeholder="Search In Chats" />
			</Search>

			<SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
		</Container>
	)
}

export default Sidebar

const Container = styled.div``;

const Header = styled.div`
	display: flex;
	position: sticky;
	top: 0;
	background-color: #fff;
	z-index: 1;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	height: 80px;
	border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
	cursor: pointer;

	:hover {
		opacity: 0.8;
	}
`;

const IconsContainer = styled.div``;

const Search = styled.div`
	display: flex;
	align-items: center;
	padding: 20px;
	border-radius: 2px;
`;

const SearchInput = styled.input`
	outline-width: 0;
	border: 0;
	flex: 1;
`;

const SidebarButton = styled(Button)`
	width: 100%;
	&&& {
		border-top: 1px solid whitesmoke;
		border-bottom: 1px solid whitesmoke;
	}
`;
