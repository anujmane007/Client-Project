import React, { useState } from 'react';// useReducer,
// import { Propertylist, SchemaTypes, Section1, Section4, Section5, Section6 } from '../helper/extrapropertise';
// import { ConvertBase64Format, blobToBase64, deepCopyObject } from '../helper/helper';
// import { dataview } from '../styles/Dataview';
// import { Divider } from 'react-native-paper';
// import { CommonClass } from '../styles/Commonclass';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import LoadingSpinner from './LoadingSpinneer';
// import { UPDATE_ON_ACCOUNT } from '../Endpoints/endpoints';
// import * as DocumentPicker from 'expo-document-picker';
// import { Addproperty } from './Addproperty';
// import { AntDesign } from '@expo/vector-icons';
// import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
const ADD_PROPS_TYPE = "Add_Property";
const REMOVE_PROPS_TYPE = "Remove_Property";
const ADD_ARRAY = "push"
const UPDATE_PROP_VALUES = "update"
const REMOVE_ARRAY_PROPS_TYPE = "pop";


function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <Fragment>
        <Button onClick={handleOpen}>Open Child Modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">Text in a child modal</h2>
            <p id="child-modal-description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <Button onClick={handleClose}>Close Child Modal</Button>
          </Box>
        </Modal>
      </Fragment>
    );
  }
  


//{ init = {}, onSubmit, modalVisible, setModalVisible }
export const ProjectModal = () => {
    const [open, setOpen] = useState(true);
    const handleOpen = () => {
            setOpen(true);
        };
            const handleClose = () => {
         setOpen(false);
         };
    
    const Upload = async (index, name) => {
        try {
            axios.post('http://43.205.14.45:3001/saveClientDetails', {
               title:"Ketan"
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          
        } catch (e) {
            console.log(e);
            
        }
    }
    return (
        <>
          <Button onClick={handleOpen}>Open modal</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title">Text in a modal</h2>
              <p id="parent-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>
              <ChildModal />
            </Box>
          </Modal>
        </>
      );
}