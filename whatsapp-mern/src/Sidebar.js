import React,{useEffect} from 'react';
import SidebarChat from "./SidebarChat";
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { IconButton, Avatar } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';

function Sidebar() {
    /*useEffect(()=>{
       console.log("Sidebar Loaded")
    },[])*/
    return (
        <div className="sidebar">
            <div className="sidebar-header">
              <Avatar src="https://avatars3.githubusercontent.com/u/59386093?s=460&u=343a5bab5578457d7e197135c2fa33cb1410974d&v=4" />
              <div className="sidebar-headerRight">
                 <IconButton>
                  <DonutLargeIcon />
                 </ IconButton> 
                 <IconButton>
                    <ChatIcon />
                 </IconButton>
                 <IconButton>
                     <MoreVertIcon />
                 </IconButton>
              </div>
            </div>
            <div className="sidebar-search">
                <div className="sidebar-searchContainer">
                    <SearchIcon />
                    <input placeholder="Search or start a new chat" type="text"></input>
                </div>
            </div>
            <div className="sidebar-chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar;
