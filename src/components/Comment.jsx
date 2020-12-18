import React from 'react';
import { ListGroup } from 'react-bootstrap';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";


const Comment = ({ comments, handleDel }) => {
    console.log(comments)
  return (
    <ListGroup key={comments._id}>
      <ListGroup.Item style={{backgroundColor:'black'}}>
        <p style={{backgroudColor:'black'}}>
          {comments.comment} <br />
          <span>Rating: {comments.rate} out of 5 </span>
          <DeleteForeverIcon

     style={{ position: "relative", float: "right" }}
            onClick={()=>handleDel(comments._id)}
          />
           
        </p>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Comment;