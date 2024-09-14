let numbers = document.querySelectorAll(".num");
let brc = document.querySelectorAll(".bracket")
let back = document.querySelector(".back");
let clear = document.querySelector(".clear");
let display = document.querySelector(".screen");
let operator = document.querySelectorAll(".op");
let answer=document.querySelector(".equals");

let flag = true;
let str = "";


function maths(val1, val2, op) {
    let ans = 0;
    switch (op) {
        case '+':
            ans = val1 + val2;
            break;
        case '-':
            ans = val1 - val2;
            break;
        case '*':
            ans = val1 * val2;
            break;
        case '/':
            ans = val1 / val2;
            break;
    }
    return ans;
}

function finalAns(str) {
    let st = [];
    let op = [];

    for (let i = 0; i < str.length; i++) {
        let curr = str.charAt(i);

        if (!isNaN(curr) && curr !== ' ') {
            let num = 0;
            while (i < str.length && !isNaN(str.charAt(i)) && str.charAt(i) !== ' ') {
                num = num * 10 + Number(str.charAt(i));
                i++;
            }
            st.push(num);
            i--;
        } else if (curr == '(') {
            op.push(curr);
        } else if (curr == ')') {
            while (op.length && op[op.length - 1] != '(') {
                let val2 = st.pop();
                let val1 = st.pop();
                st.push(maths(val1, val2, op.pop()));
            }
            op.pop(); // pop '('
        } else {
            while (op.length && precedence(op[op.length - 1]) >= precedence(curr)) {
                let val2 = st.pop();
                let val1 = st.pop();
                st.push(maths(val1, val2, op.pop()));
            }
            op.push(curr);
        }
    }

    while (op.length) {
        let val2 = st.pop();
        let val1 = st.pop();
        st.push(maths(val1, val2, op.pop()));
    }
    return st.pop();
}

function precedence(op) {
    if (op == '+' || op == '-') return 1;
    if (op == '*' || op == '/') return 2;
    return 0;
}

let seeBracket = false;

for (let i of numbers) {
    i.addEventListener("click", () => {
        if(flag==false){
            display.innerHTML="";
            flag=true;
        }
        display.innerHTML = display.innerHTML + i.innerHTML;
        str = str + i.innerHTML;
    })
}

for (let i of brc) {
    
    i.addEventListener("click", () => {
        if(flag==false){
            display.innerHTML="";
            flag=true;
        }

        let last = str.charAt(str.length - 1);
        if (last != '(' && last != ')') {
            display.innerHTML = display.innerHTML + i.innerHTML;
            str = str + i.innerHTML;
        }
    })
}

for (let i of operator) {
    
    i.addEventListener("click", () => {
        if(flag==false){
            display.innerHTML="";
            flag=true;
        }

        let last = str.charAt(str.length - 1);

        if (str.length != 0 && last != '(' && last != '*' && last != '+' && last != '-' && last != '/') {
            display.innerHTML = display.innerHTML + i.innerHTML;
            str = str + i.innerHTML;
        }
    })
}

clear.addEventListener("click", () => {
    display.innerHTML = "";
    str = "";
})

back.addEventListener("click", () => {
    str = str.substring(0, str.length - 1);
    display.innerHTML = str;
})

answer.addEventListener("click",()=>{
    display.innerHTML=`Ans : ${finalAns(str)}` ;
    flag=false;
    str="";
})



