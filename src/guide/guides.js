const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const guides = {
  "ra-markdown": {
    before: ({ notify, redirect }) => {
      notify("Taking you to the product page");
      redirect("/products");
    },
    steps: [
      {
        target: `[data-tour-id='grid-line']:nth-child(${getRandomInt(1, 5)})`,
        event: "click",
        content:
          "This is a poster, one of the products our shop is selling, let's go to its details",
        event: "hover",
        joyrideProps: {
          styles: {
            beacon: {
              marginTop: -100,
            },
          },
        },
        after: ({ target, notify, redirect }) => {
          const productUrl = target.getAttribute("href").slice(1);
          redirect(productUrl);
        },
      },
      {
        target: "[data-tour-id='description-tab']",
        content: "The markdown editor is in the description tab",
        after: ({ target, notify, redirect }) => {
          target.click();
        },
      },
    ],
  },
};

export default guides;
