import { configure } from 'mobx';

configure({
  useProxies: 'ifavailable',
  computedRequiresReaction: true,
  observableRequiresReaction: true,
  reactionRequiresObservable: true,
});
