import App from "./App.svelte";
import "./index.scss";

const app = new App({
  target: document.querySelector("#root"),
  props: {
    name: "girl"
  }
});


document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); 
}, {passive: false}); 

console.log(app);
