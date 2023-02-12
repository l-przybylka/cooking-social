# Recipes with friends

## Goals:
I'm always annoyed when I search for a new recipe and I have to scroll down for 3 minutes just to get down to the actual instructions. That's why I thought about building this app, where you and your friends can share your favourite recipes.

**The main targets for the app were:**
- Allow users to register and upload their recipes
- Recipes consist of the title, difficulty badge, instructions with the ability to format the text and an image
- Recipes can be viewed in one place, and each recipe can be accessed individually
- Recipes can be liked and commented on. Comments can also be liked. 
- Users can access the profiles of other users to preview all posts made by them


## Technologies used:
- JavaScript
- EJS templating language
- Mongo and Mongoose
- Node and Express

## Difficulties encountered
- Implementing the QuillJS to provide users with the ability to format the text before uploading it. I got stuck on the implementing it for a bit. Specifically on 
  how to save the data as a rich text in the database and then how to inject the data as raw HTML to the view.

## What I've learnt
- I gained a better understanding of how full-stack applications work

## Further improvements
- Lazy loading of recipes
- Styling improvements 
- Improve registering process by adding new passport strategies
