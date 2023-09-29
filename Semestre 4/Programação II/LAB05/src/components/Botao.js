import React from "react";
function Botao(){
    const [followingState, setfollowingState] = React.useState("Follow");

    function trocaFollower(){
        if(followingState === "Follow"){
            setfollowingState("Following");
        }else{
            setfollowingState("Follow");
        }
        
    }
    return( 
        <div>
            <button class="btn btn-light" onClick={trocaFollower}> {followingState} </button>
        </div>
    );
}
export default Botao;