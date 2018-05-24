/* 判断环境
官方文档https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment 
GitHub Pages doesn’t support routers that use the HTML5 pushState history API under the hood (for example, React Router using browserHistory). This is because when there is a fresh page load for a url like http://user.github.io/todomvc/todos/42, where /todos/42 is a frontend route, the GitHub Pages server returns 404 because it knows nothing of /todos/42. If you want to add a router to a project hosted on GitHub Pages, here are a couple of solutions:

You could switch from using HTML5 history API to routing with hashes. If you use React Router, you can switch to hashHistory for this effect, but the URL will be longer and more verbose (for example, http://user.github.io/todomvc/#/todos/42?_k=yknaj). Read more about different history implementations in React Router.
Alternatively, you can use a trick to teach GitHub Pages to handle 404 by redirecting to your index.html page with a special redirect parameter. You would need to add a 404.html file with the redirection code to the build folder before deploying your project, and you’ll need to add code handling the redirect parameter to index.html. You can find a detailed explanation of this technique in this guide.

表示使用github，不支持browserHistory，需要hashHistory或重定向来解决。
react-router4 basename 默认 /
*/
// let baseurl = process.env.NODE_ENV === 'production' ? '/cnode' : '';
let baseurl = '/';

export default baseurl