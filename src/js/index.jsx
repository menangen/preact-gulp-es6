/**
 * Created by menangen on 22.05.17.
 */
const wrapper = () => {
    let iteration = 0;
    let alpha = 0.05;

    return () => {

        iteration !== 0 ? iteration += alpha : iteration++;

        const columnOneSizeOnIterate = iteration * iteration;
        let result = (1 / columnOneSizeOnIterate) * 50;
        const value = 50 + result;

        result = 50 - result;
        if (value < 80) { alpha += 0.01 }
        return [value, result];
    }
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("Loaded");

    let row = document.querySelector(".row");
    let rowWidth = row.scrollWidth;

    if (rowWidth > 640) {

        const iterator = wrapper();

        let columnOne = document.querySelector(".one");
        let columnTwo = document.querySelector(".two");
        let column3 = document.querySelector(".three");
        let column4 = document.querySelector(".four");
        
        let interval = setInterval(() => {
            let computed = iterator();

            let columnOneSize = `${computed[0]}%`;
            let columnTwoSize = `${computed[1]}%`;

            //console.log(computed);
            /*
            console.log(columnOneSize);
            console.log(columnTwoSize);
            */

            columnOne.style.height = columnOneSize; columnOne.style.width = columnOneSize;
            columnTwo.style.height = columnOneSize; columnTwo.style.width = columnTwoSize;

            column3.style.height = columnTwoSize; column3.style.width = columnOneSize;
            column4.style.height = columnTwoSize; column4.style.width = columnTwoSize;

            if (computed[0] <= 50.1) {
                clearInterval(interval);
                console.log('CLEARED');

                columnOne.style.height = "50%";
                columnOne.style.width = "";

                columnTwo.style.height = "50%";
                columnTwo.style.width = "";

                column3.style.height = "50%";
                column3.style.width = "";

                column4.style.height = "50%";
                column4.style.width = "";
            }

        }, 50);
    }
});