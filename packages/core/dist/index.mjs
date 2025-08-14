import { ref as v, defineComponent as m, renderSlot as L, defineAsyncComponent as P, h as f, createBlock as V, openBlock as R, unref as _, withCtx as b, createVNode as C } from "vue";
import { createInjectionState as I } from "@vueuse/core";
import { v4 as h } from "uuid";
var l = /* @__PURE__ */ ((e) => (e.VARIABLE = "VARIABLE", e.VALUE = "VALUE", e.REF = "REF", e))(l || {});
const [B, O] = I((e) => {
  const r = {}, t = {}, c = {};
  return e.variables.forEach((n) => {
    r[n.id] = v(n.value);
  }), e.actions.forEach((n) => {
    t[n.id] = (...i) => {
      const s = [];
      return n.params.forEach((a) => {
        a.type === l.REF ? s.push(i[a.value]) : a.type === l.VALUE ? s.push(a.value) : s.push(null);
      }), n.handle(s, { variables: r });
    };
  }), {
    playground: e,
    refs: c,
    variables: r,
    actions: t
  };
}), j = /* @__PURE__ */ m({
  __name: "root",
  props: {
    playground: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    return B(e.playground), (t, c) => L(t.$slots, "default");
  }
});
var N = /* @__PURE__ */ ((e) => (e.COMPONENT = "COMPONENT", e.CONTAINER = "CONTAINER", e))(N || {}), E = /* @__PURE__ */ ((e) => (e.PROP = "PROP", e.EVENT = "EVENT", e))(E || {}), y = /* @__PURE__ */ ((e) => (e.VARIABLE = "VARIABLE", e.VALUE = "VALUE", e))(y || {});
const g = /* @__PURE__ */ m((e) => {
  const {
    variables: r,
    actions: t,
    refs: c
  } = O(), n = P(() => e.component.getComponent()), i = e.component.getProps();
  return c[e.component.id] = v(), () => {
    const s = {
      ref: e.component.id
    };
    Object.entries(i).forEach(([d, o]) => {
      o.type === E.PROP ? o.value.type === y.VARIABLE ? s[d] = r[o.value.value.id].value : o.value.type === y.VALUE && (s[d] = o.value.value) : o.type === E.EVENT && (s[d] = (...u) => {
        Array.isArray(o.value) ? o.value.reduce(async (A, p) => {
          if (A)
            A.then(() => {
              if (p.async)
                return t[p.id](...u);
              t[p.id](...u);
            });
          else {
            if (p.async)
              return t[p.id](...u);
            t[p.id](...u);
          }
        }, null) : t[o.value.id](...u);
      });
    });
    const a = {};
    return Object.entries(e.component.slots).forEach(([d, o]) => {
      a[d] = () => o.map((u) => f(g, {
        component: u
      }));
    }), f(n, s, a);
  };
}, {
  props: {
    component: {
      type: Object,
      required: !0
    }
  }
}), U = /* @__PURE__ */ m((e) => () => e.playground.containers.map((r) => f(g, {
  component: r
})), {
  props: {
    playground: {
      type: Object,
      required: !0
    }
  }
}), w = /* @__PURE__ */ m({
  __name: "wrapper",
  setup(e) {
    const { playground: r } = O();
    return (t, c) => (R(), V(_(U), { playground: _(r) }, null, 8, ["playground"]));
  }
}), F = /* @__PURE__ */ m({
  __name: "index",
  props: {
    playground: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    return (r, t) => (R(), V(j, { playground: e.playground }, {
      default: b(() => [
        C(w)
      ]),
      _: 1
    }, 8, ["playground"]));
  }
});
class S {
  containers = [];
  variables = [];
  actions = [];
}
class T {
  getComponent() {
    throw new Error("Method not implemented.");
  }
  getProps() {
    return this.props;
  }
  id = h();
  type = N.COMPONENT;
  props = {};
  name = "component";
  ref;
  slots = {};
}
class $ {
  id = h();
  name;
  value;
  constructor(r, t) {
    this.name = r, this.value = t;
  }
}
class k {
  id = h();
  name;
  params = [];
  returnVariable;
  async = !1;
  constructor(r) {
    this.name = r;
  }
  transformParams(r, t) {
    return this.params.map((n, i) => {
      if (n.type === l.REF)
        return r[i];
      if (n.type === l.VALUE)
        return n.value;
      if (n.type === l.VARIABLE)
        return t.variables[n.value.id].value;
    });
  }
  handle(r, t) {
    throw new Error("Method not implemented.");
  }
}
export {
  k as Action,
  T as Component,
  N as ComponentType,
  l as ParamType,
  S as Playground,
  F as PlaygroundRender,
  E as PropType,
  y as PropValueType,
  $ as Variable
};
