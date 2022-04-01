import '../src/main.scss'; // 引入用户样式。
import { main } from '../src/main'; // 引入用户代码。

// 入口：页面加载时执行。
function customize() {
    // 执行用户代码。
    main();
}

// 初始化基础设施，完成后调用`customize`函数。
declare global {
    interface Window { cdev: ((_: boolean) => void) & (() => boolean) }
    const __DEV_SERVER_PORT: string;
    const __CUSTOM_OUTPUT_HTML: string;
    const __TAG_CUSTOM_HTML: string;
}

const CLS_DEV_ROOT = '__blog-custom-dev-root';
const IN_DEV_MODE = document.querySelector(`.${CLS_DEV_ROOT}`);

if (!window.cdev) {
    Object.defineProperty(window, 'cdev', {
        value: (enable: boolean) => {
            const KEY_CUSTOM_DEV_MODE = '__blog-custom-dev-mode';
            if (enable === undefined) {
                return window.localStorage.getItem(KEY_CUSTOM_DEV_MODE) == 'true';
            } else {
                window.localStorage.setItem(KEY_CUSTOM_DEV_MODE, enable.toString());
            }
            window.location.reload();
        }
    });
}

if (!window.cdev() || IN_DEV_MODE) {
    if (IN_DEV_MODE) {
        if (module.hot) {
            module.hot.accept();
        }
    }
    document.querySelector('#footer')?.addEventListener('dblclick', () => {
        if (window.confirm(`开发者模式：是否${window.cdev() ? '退出' : '进入'}开发者模式？`)) {
            window.cdev(!window.cdev());
        }
    });
    customize();
} else {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://localhost:${__DEV_SERVER_PORT}/${__CUSTOM_OUTPUT_HTML}`);
    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
            const tmp = document.querySelector(`#${__TAG_CUSTOM_HTML}`);
            document.querySelector(`link[href*='custom.css']`)?.remove();

            tmp.removeAttribute('id');
            tmp.innerHTML = xhr.response;

            const root = tmp.firstElementChild;
            tmp.replaceWith(root);

            root.classList.add(CLS_DEV_ROOT);
            root.querySelectorAll('script').forEach((dummy) => {
                const script = document.createElement('script');

                script.src = dummy.src;
                script.defer = true;
                dummy.parentElement.insertBefore(script, dummy);
            });
        }
    };
    xhr.timeout = 2000;
    xhr.onerror = xhr.ontimeout = () => {
        if (window.confirm('开发者模式：连接本机服务器失败，是否退出开发者模式？')) {
            window.cdev(false);
        } else {
            window.location.reload();
        }
    };
    xhr.send();
}