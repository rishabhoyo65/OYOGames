import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles,withStyles } from '@material-ui/core/styles';
const users = [
    { rank:1,username:"hello",score:34},
    { rank:2,username:"hello",score:34},
    { rank:3,username:"hello",score:34},
    { rank:4,username:"hello",score:34},
    { rank:1,username:"hello",score:34},
    { rank:2,username:"hello",score:34},
    { rank:3,username:"hello",score:34},
    { rank:4,username:"hello",score:34}

];
const triangle = {
    width: "0",
    height: "0",
    borderLeft: "250px solid white",
    borderRight: "250px solid white",
    borderTop: "75px solid red"
};
const rectangle = {
    width: "500px",
    height: "100px",
    backgroundColor: "red"
};
const StyledTableCell = withStyles((theme) => ({
    root: {
      padding: "0px 25px",
      margin: "0px",
      border: "none",
      paddingTop: "10px",
      width: "60px",
      height: "40px",
      fontWeight: "bold",
      fontSize: "20px"
    }
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
      height:50,
      margin:50,
      border:"none"
    }
}))(TableRow);

const getColor = function(rank){
    if(rank % 4 ===1)
      return "#d4af37";
    else if(rank % 4 ===2)
      return "silver";
    else if(rank % 4 ===3)
      return "#CD7F32";
    
    return "red";
}

const useStyles = makeStyles({
});

//props - list of Users(rank,username,score) 
export default function Leaderboard(props) {
    const classes = useStyles();
    const userId = localStorage.getItem('userId');

    return (
        <div className="leaderboard-table" style={{ width: "500px"}}>
            <LeaderboardHead />
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                    {props.users.map((user,index) => (
                        <StyledTableRow key={index+1} style={{ position: "relative"}}>
                            <hr style={{ position: "absolute",top: "49px",left: "48px",width: "0px",
                                        borderBottom: "2px solid " + getColor(index+1)}}
                            />

                            <StyledTableCell  style={{ width: 100 }}component="th" scope="row">
                                <div style={{position: "relative",backgroundColor: getColor(user.rank),
                                            borderRadius: "100%",width: "50px",height: "50px"}}>
                                    <div style={{
                                        position: "absolute",left: "50%",top: "50%",
                                        transform: "translate(-50%, -50%)",color: "white"}}>

                                        {index+1}

                                    </div>
                                </div>
                            </StyledTableCell>
                            <StyledTableCell style={{ width: 400, color :  (userId === user.id) ? "#2f922f": "rgba(0, 0, 0, 0.87)" }} >{user.username}</StyledTableCell>
                            <StyledTableCell style={{ width: 100, color :  (userId === user.id) ? "#2f922f": "rgba(0, 0, 0, 0.87)" }} >{user.score}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="">
            </div>
        </div>
    )
}

const LeaderboardHead = function(){
    return <div style={{ position: "relative"}}>
        <h1 style={{
            position: "absolute",
            left: "50%",
            top: "30%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            fontFamily: "cursive",
            width: "150px" }}>
            
            Current Leaderboard
        </h1>

        <div style={rectangle}></div>
        <div style={triangle}></div>
  </div>
}