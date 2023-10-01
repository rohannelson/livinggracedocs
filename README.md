# Living Grace Docs

This was my first attempt at rendering Living Grace Dianella's Safety Policy document in HTML rather than as a word document or PDF.

It is built using HTML, CSS, and vanilla JS.

The navbar shrinks on scroll because [livinggracedianella.org.au](https://livinggracedianella.org.au) had a navbar which behaved in this way. 
I used the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for the first time to achieve this.

The collapsible nav sidebar generates automatically from the document's headings, and I created the button for the sidebar from scratch (it changes from a hamburger to an arrow).

I also used [the clamp feature in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) for the first time in this repo.
