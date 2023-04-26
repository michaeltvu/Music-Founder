import React from "react";
import './YourGroups.css'

function YourGroups() {

    const name = "michael vu";

    const groups = [
        {name: "Pooh Shiesties", img: "https://pbs.twimg.com/media/FbYp581UIAA8MMb.jpg?", members: [{name: "michael vu", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "iTyken", rating: "", change: 1, pfp: "https://i.pinimg.com/600x315/46/09/23/460923f017d4f5019f28e6cdbae72dac.jpg"}, {name: "NOT Jesse", rating: "", change: -2, pfp: "https://i.pinimg.com/originals/cb/ca/28/cbca28301007b5f764e48252d19e8a2f.jpg"}, {name: "CUH riss", rating: "", change: 0, pfp: "https://steamuserimages-a.akamaihd.net/ugc/1700655214034922461/F911AF4A10A84DBAB024FAB9F42FB4781C1AF0FB/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"}, {name: "Nidvs", rating: "", change: 1, pfp: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e647605a-8e2c-4ed7-98ae-754a8d672b6a/dep4di2-336766be-469f-4988-8522-3bc80857821f.jpg/v1/fill/w_1280,h_682,q_75,strp/tom_and_jerry_sad_tom_with_tears_3_by_princessamulet16_dep4di2-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjgyIiwicGF0aCI6IlwvZlwvZTY0NzYwNWEtOGUyYy00ZWQ3LTk4YWUtNzU0YThkNjcyYjZhXC9kZXA0ZGkyLTMzNjc2NmJlLTQ2OWYtNDk4OC04NTIyLTNiYzgwODU3ODIxZi5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.V-XIiQWWiU553VKysf-5mpyQavwse1pXAkDFvv7OXgs"}, {name: "michael", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "michael", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "michael", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "michael", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "michael", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "michael", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}]},
        {name: "I", img: "https://pbs.twimg.com/media/FbYp581UIAA8MMb.jpg?", members: [{name: "michael vu", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "iTyken", rating: "", change: 1, pfp: "https://i.pinimg.com/600x315/46/09/23/460923f017d4f5019f28e6cdbae72dac.jpg"}, {name: "NOT Jesse", rating: "", change: -2, pfp: "https://i.pinimg.com/originals/cb/ca/28/cbca28301007b5f764e48252d19e8a2f.jpg"}, {name: "CUH riss", rating: "", change: 0, pfp: "https://steamuserimages-a.akamaihd.net/ugc/1700655214034922461/F911AF4A10A84DBAB024FAB9F42FB4781C1AF0FB/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"}, {name: "Nidvs", rating: "", change: 1, pfp: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e647605a-8e2c-4ed7-98ae-754a8d672b6a/dep4di2-336766be-469f-4988-8522-3bc80857821f.jpg/v1/fill/w_1280,h_682,q_75,strp/tom_and_jerry_sad_tom_with_tears_3_by_princessamulet16_dep4di2-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjgyIiwicGF0aCI6IlwvZlwvZTY0NzYwNWEtOGUyYy00ZWQ3LTk4YWUtNzU0YThkNjcyYjZhXC9kZXA0ZGkyLTMzNjc2NmJlLTQ2OWYtNDk4OC04NTIyLTNiYzgwODU3ODIxZi5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.V-XIiQWWiU553VKysf-5mpyQavwse1pXAkDFvv7OXgs"}, {name: "michael", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "michael", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "michael", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "michael", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "michael", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "michael", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}]},
        // {name: "Pooh Shiesty Thats My DAWGS", members: [{name: "michael", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "iTyken", rating: "", change: 1, pfp: "https://i.pinimg.com/600x315/46/09/23/460923f017d4f5019f28e6cdbae72dac.jpg"}, {name: "NOT Jesse", rating: "", change: -2, pfp: "https://i.pinimg.com/originals/cb/ca/28/cbca28301007b5f764e48252d19e8a2f.jpg"}, {name: "michael vu", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "CUH riss", rating: "", change: 0, pfp: "https://steamuserimages-a.akamaihd.net/ugc/1700655214034922461/F911AF4A10A84DBAB024FAB9F42FB4781C1AF0FB/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"}, {name: "Nidvs", rating: "", change: 1, pfp: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e647605a-8e2c-4ed7-98ae-754a8d672b6a/dep4di2-336766be-469f-4988-8522-3bc80857821f.jpg/v1/fill/w_1280,h_682,q_75,strp/tom_and_jerry_sad_tom_with_tears_3_by_princessamulet16_dep4di2-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjgyIiwicGF0aCI6IlwvZlwvZTY0NzYwNWEtOGUyYy00ZWQ3LTk4YWUtNzU0YThkNjcyYjZhXC9kZXA0ZGkyLTMzNjc2NmJlLTQ2OWYtNDk4OC04NTIyLTNiYzgwODU3ODIxZi5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.V-XIiQWWiU553VKysf-5mpyQavwse1pXAkDFvv7OXgs"}]},
        //{name: "Pooh Shiesty Thats My DAWGS", members: [{name: "michael vu", rating: "", change: 1, pfp: "https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg"}, {name: "iTyken", rating: "", change: 1, pfp: "https://i.pinimg.com/600x315/46/09/23/460923f017d4f5019f28e6cdbae72dac.jpg"}, {name: "NOT Jesse", rating: "", change: -2, pfp: "https://i.pinimg.com/originals/cb/ca/28/cbca28301007b5f764e48252d19e8a2f.jpg"}, {name: "CUH riss", rating: "", change: 0, pfp: "https://steamuserimages-a.akamaihd.net/ugc/1700655214034922461/F911AF4A10A84DBAB024FAB9F42FB4781C1AF0FB/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"}, {name: "Nidvs", rating: "", change: 1, pfp: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e647605a-8e2c-4ed7-98ae-754a8d672b6a/dep4di2-336766be-469f-4988-8522-3bc80857821f.jpg/v1/fill/w_1280,h_682,q_75,strp/tom_and_jerry_sad_tom_with_tears_3_by_princessamulet16_dep4di2-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjgyIiwicGF0aCI6IlwvZlwvZTY0NzYwNWEtOGUyYy00ZWQ3LTk4YWUtNzU0YThkNjcyYjZhXC9kZXA0ZGkyLTMzNjc2NmJlLTQ2OWYtNDk4OC04NTIyLTNiYzgwODU3ODIxZi5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.V-XIiQWWiU553VKysf-5mpyQavwse1pXAkDFvv7OXgs"}]},
        //{name: "Musical Magicians", members: [{name: "michael vu", rating: "", change: 1}, {name: "iTyken", rating: "", change: 1}, {name: "NOT Jesse", rating: "", change: -2}, {name: "CUH riss", rating: "", change: 0}]},
        //{name: "Pooh Shiesty Thats My DAWGS", members: [{name: "michael vu", rating: "", change: 1}, {name: "iTyken", rating: "", change: 1}, {name: "NOT Jesse", rating: "", change: -2}, {name: "CUH riss", rating: "", change: 0}]}
    ]

    // const hoverGroup = (index) => {
    //     let group = document.getElementsByClassName('smallgroup ' + index)[0];
    //     let groupimg = document.getElementsByClassName('groupimg ' + index)[0];

    //     group.classList.toggle('hover');
    //     groupimg.classList.toggle('hover')
    // }

    const enterGroup = (index) => {
        let group = document.getElementsByClassName('smallgroup ' + index)[0];
        group.classList.toggle('hover');
    }

    const leaveGroup = (index) => {
        let group = document.getElementsByClassName('smallgroup ' + index)[0];
        group.classList.toggle('hover');
        // group.classList.remove('show');
    } 

    const openGroup = (index) => {
        let group = document.getElementsByClassName('smallgroup ' + index)[0];
        group.classList.toggle('show');

        // if(group.classList.contains('show')) {

        // }
        // else {
        //     group.classList.add('show');
        // }
    }

    const clickMember = (event) => {
        console.log('dickcheese');
        event.stopImmediatePropagation();
        return false
    }

    // function clickMember(event) {
    //     console.log('dickcheese');
    //     event.stopImmediatePropagation();
    //     return false
    // }

    return(
        <div className="your-groups section">
            <i className="bx bxs-group"><h3 className="title">Your Groups</h3></i>
            <div className="groups">
                {/* {groups.map((group, groupindex) => (
                    <div className={"group " + groupindex}>
                        <div className="grouptitle">
                            <img className="groupimg" src={group.img} alt="groupimg"/>
                            <p className="groupname">{group.name.substring(0, 20) + (group.name.length > 20 ? "-" : "")}</p>
                        </div>
                        <i className="bx bxs-chevron-right"></i>
                        <div className="members">
                            {group.members.map((member, memindex) => (
                                <div className={"member " + memindex + (member.name === name ? " me" : "")}>
                                    <p className={"rank " + (memindex <= 2 ? "fas fa-trophy " : " ") + (memindex===0 ? "gold" : memindex===1 ? "silver" : memindex===2 ? "bronze" : "")}>{memindex > 2 ? (memindex+1) : ""}</p>
                                    <div className="change">
                                        <i className={"fas " + (member.change > 0 ? "fa-angle-up" : member.change < 0 ? "fa-angle-down" : "fa-minus")}></i>
                                        <p>{member.change === 0 ? "" : Math.abs(member.change)}</p>
                                    </div>
                                    <hr/>
                                    <img className="pfp" src={member.pfp} alt="pfp"></img>
                                    <p className="name">{member.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))} */}

                {groups.map((group, groupindex) => (
                    <div className={"smallgroup " + groupindex} onClick={() => {openGroup(groupindex)}} onMouseEnter={() => {enterGroup(groupindex)}} onMouseLeave={() => {leaveGroup(groupindex)}}>
                        <div className={"title " + groupindex}>
                            <img className={"groupimg " + groupindex} src={groups[groupindex].img} alt="groupimg"/>
                            <p className={"groupname " + groupindex}>{groups[groupindex].name}</p>
                        </div>
                        {/* <p>RANKINGS</p> */}
                        <div className="members">
                            {group.members.map((member, memindex) => (
                                <div className={"member " + memindex + (member.name === name ? " me" : "")} onClick={() => {clickMember(groupindex)}}>
                                    <p className={"rank " + (memindex <= 2 ? "fas fa-trophy " : " ") + (memindex===0 ? "gold" : memindex===1 ? "silver" : memindex===2 ? "bronze" : "")}>{memindex > 2 ? (memindex+1) : ""}</p>
                                    <div className="change">
                                        <i className={"fas " + (member.change > 0 ? "fa-angle-up" : member.change < 0 ? "fa-angle-down" : "fa-minus")}></i>
                                        <p>{member.change === 0 ? "" : Math.abs(member.change)}</p>
                                    </div>
                                    <hr/>
                                    <img className="pfp" src={member.pfp} alt="pfp"></img>
                                    <p className="name">{member.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <i className="bx bx-plus"></i>
            </div>
        </div>
    )
}

export default YourGroups;