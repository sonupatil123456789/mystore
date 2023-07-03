const myarrey = [ 2, 4, 6, 8 ];



// // let newarrey = myarrey.map(newar  => console.log(newar))


let myFunction = function(myarr,) {

   let myNewArrey = []
    
    myarr.forEach(element => {
        myNewArrey.push(element)
    });
    return myNewArrey

}

console.log(myFunction(myarrey));


// const doubled = [1,2,3,4].map((x)=> x*2);
// console.log(doubled)