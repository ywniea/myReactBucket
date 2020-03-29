import {
	VELEMENT,
	VSTATELESS,
	VCOMPONENT
} from './constant';
import { createVnode } from './virtual-dom';

// 将JSX转成 vnode
/**
 * vnode的结构是：
 * 	let vnode = {
		vtype: vtype,
		type: type,
		props: props,
		refs: refs,
		key: key,
		ref: ref,
		uid: 2
	}
 */
export default function createElement(type, props, ...children) {
	let vtype = null;
	if (typeof type === 'string') {
		vtype = VELEMENT;
	} else if (typeof type === 'function') {
		if (type && type.isReactComponent) {
			vtype = VCOMPONENT;
		} else {
			vtype = VSTATELESS;
		}
	} else {
		throw new Error(`React.createElement: unexpect type [ ${type} ]`);
	}

	let key = null;
	let ref = null;
	let finalProps = {};
	if (props !== null) {
		for (let propKey in props) {
			if (!props.hasOwnProperty(propKey)) {
				continue;
			}
			if (propKey === 'key') {
				if (props.key !== undefined) {
					key = props.key;
				}
			} else if (propKey === 'ref') {
				if (props.ref !== undefined) {
					ref = props.ref;
				}
			} else {
				finalProps[propKey] = props[propKey];
			}
		}
	}

	finalProps.children = children;
	return createVnode(vtype, type, finalProps, key, ref);
}