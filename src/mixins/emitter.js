const broadcast = (componentName, eventName, params) => {
    this.$children.forEach(child => {
        const name = child.$options.name;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            broadcast.apply(child, [componentName, eventName].concat(params));
        }
    })
}

export default {
    methods: {
        // 子向父
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root; // 找到父级
            let name = parent.$options.name; // 组件名

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.name; // 获取组件名
                }
            }

            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        // 父向子广播
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        },
    }
};