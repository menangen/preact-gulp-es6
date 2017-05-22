/**
 * Created by menangen on 22.05.17.
 */
import { h, render } from 'preact';

render((
    <div id="foo">
        <span>Hello, world!</span>
        <button onClick={ e => alert("hi!") }>Click Me</button>
        <p>
            <a href="#">Test link</a>
        </p>
    </div>
), document.body);