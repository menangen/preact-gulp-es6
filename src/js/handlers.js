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

const loadComplete = () => {
    const body = document.body;
    const columnOne = document.querySelector(".one");

    columnOne.style.width = "100%";
    body.style.overflowY = "hidden";

};

const moveHandler = () => {
    document.removeEventListener("mousemove", moveHandler);

    const row = document.querySelector(".row");
    const rowWidth = row.scrollWidth;
    const body = document.body;
    body.style.overflowY = "visible";

    if (rowWidth > 768) {// TODO: fix it

        const columnOne = document.querySelector(".one");
        const columnTwo = document.querySelector(".two");
        const column3 = document.querySelector(".three");
        const column4 = document.querySelector(".four");



        const iterator = wrapper();

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
            } }, 50);
    }
};

export default {
    loadComplete,
    moveHandler
}