let grid = []
let player = 0
let AIselect = true
let AI_depth = 2

function reset(){
    grid = [[0,0,0],
            [0,0,0],
            [0,0,0]]
    player = 1
    document.getElementById("msg").innerHTML = ""
    render()
}
reset()
function minimax(grid, ai, depth=2){
    w = windet(grid)
    if (depth==0) return 0
    if(w=="X")return -1
    if(w=="O")return 1
    if(w=="Draw")return 0
    let best_score = -Infinity
    let worst_score = Infinity
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(grid[i][j]==0){
                if(ai){
                    grid[i][j]=2
                    let score=minimax(grid,false, depth-1)
                    best_score = Math.max(score,best_score)
                }
                else{
                    grid[i][j]=1
                    let score=minimax(grid,true, depth-1)
                    worst_score = Math.min(worst_score,score)
                }
                grid[i][j]=0
            }
        }
    }
    return ai?best_score:worst_score
}
function move(grid){
    let m_score=-Infinity
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(grid[i][j]==0){
                grid[i][j]=2
                let score = minimax(grid, false, AI_depth)
                grid[i][j]=0
                if (score>m_score){m_score=score;p=[i,j]}
            }
        }
    }
    return p
}
function setcheck(arr){
    if(arr[0]==arr[1] && arr[1]==arr[2]){
        if(arr[0]==1)return"X"
        else if(arr[0]==2)return"O"
    }
    return ""
}
function windet(grd){
    for(i=0; i<3; i++){
        a = setcheck([grd[i][0],grd[i][1],grd[i][2]])
        if(a!=""){return a}
        a = setcheck([grd[0][i],grd[1][i],grd[2][i]])
        if(a!=""){return a}
    }
    a = setcheck([grd[1][1],grd[2][2],grd[0][0]])
    if(a!="")return a
    a = setcheck([grd[2][0],grd[1][1],grd[0][2]])
    if(a!="")return a
    for(i=0; i<3; i++){
        for(j=0; j<3; j++){
            if(grd[i][j]==0)return"undefined"
        }
    }
    return "Draw"
}
function clck(i,j){
    if(grid[i-1][j-1]==0 && windet(grid)=="undefined"){
        if(player==1){
            grid[i-1][j-1]=1
            player=AIselect?1:2
            if(AIselect){
                a=move(grid)
                grid[a[0]][a[1]]=2
            }
        }
        else{
            grid[i-1][j-1]=2
            player=1
        }
        render()
    }
}
function render(){
    for(i=0; i<3; i++){
        for(j=0; j<3; j++){
            document.getElementById("c"+(i+1)+(j+1)).innerHTML={0:"",1:"X",2:"O"}[grid[i][j]]
        }
    }
    document.getElementById("msg").innerHTML = ""
    a=windet(grid)
    if(a=="Draw"){
        document.getElementById("msg").innerHTML = "Game Drew"
    }
    else if(a!="undefined"){
        document.getElementById("msg").innerHTML = a+" Won!"
    }
    else{
        document.getElementById("msg").innerHTML = {1:"X", 2:"O"}[player]+"'s turn"
    }
}
function AIselector(ai){
    q=[...grid[0],...grid[1],...grid[2]]
    if(!(q.includes(1)||q.includes(2))){
        AIselect = ai
    }
    else{
        document.getElementById(AIselect?"ai":"mult").checked=true
    }
}
function depth(){
    q=[...grid[0],...grid[1],...grid[2]]
    if(!(q.includes(1)||q.includes(2))){
        AI_depth = {"easy":2,"medium":5,"hard":9}[document.querySelector("#lvselector").value]
    }
    else{
        document.querySelector("#lvselector").value={2:"easy",5:"medium",9:"hard"}[AI_depth]
    }
}
