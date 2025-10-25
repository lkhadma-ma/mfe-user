import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-Y5RQAIA6.js";

// node_modules/@softarc/native-federation-runtime/fesm2022/softarc-native-federation-runtime.mjs
var nfNamespace = "__NATIVE_FEDERATION__";
var global = globalThis;
global[nfNamespace] ??= {
  externals: /* @__PURE__ */ new Map(),
  remoteNamesToRemote: /* @__PURE__ */ new Map(),
  baseUrlToRemoteNames: /* @__PURE__ */ new Map()
};
var globalCache = global[nfNamespace];
var externals = globalCache.externals;
function getExternalKey(shared) {
  return `${shared.packageName}@${shared.version}`;
}
function getExternalUrl(shared) {
  const packageKey = getExternalKey(shared);
  return externals.get(packageKey);
}
function setExternalUrl(shared, url) {
  const packageKey = getExternalKey(shared);
  externals.set(packageKey, url);
}
function mergeImportMaps(map1, map2) {
  return {
    imports: __spreadValues(__spreadValues({}, map1.imports), map2.imports),
    scopes: __spreadValues(__spreadValues({}, map1.scopes), map2.scopes)
  };
}
var remoteNamesToRemote = globalCache.remoteNamesToRemote;
var baseUrlToRemoteNames = globalCache.baseUrlToRemoteNames;
function addRemote(remoteName, remote) {
  remoteNamesToRemote.set(remoteName, remote);
  baseUrlToRemoteNames.set(remote.baseUrl, remoteName);
}
function appendImportMap(importMap) {
  document.head.appendChild(Object.assign(document.createElement("script"), {
    type: "importmap-shim",
    innerHTML: JSON.stringify(importMap)
  }));
}
function getDirectory(url) {
  const parts = url.split("/");
  parts.pop();
  return parts.join("/");
}
function joinPaths(path1, path2) {
  while (path1.endsWith("/")) {
    path1 = path1.substring(0, path1.length - 1);
  }
  if (path2.startsWith("./")) {
    path2 = path2.substring(2, path2.length);
  }
  return `${path1}/${path2}`;
}
var BuildNotificationType;
(function(BuildNotificationType2) {
  BuildNotificationType2["COMPLETED"] = "federation-rebuild-complete";
  BuildNotificationType2["ERROR"] = "federation-rebuild-error";
})(BuildNotificationType || (BuildNotificationType = {}));
function watchFederationBuildCompletion(endpoint) {
  const eventSource = new EventSource(endpoint);
  eventSource.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data.type === BuildNotificationType.COMPLETED) {
      console.log("[Federation] Rebuild completed, reloading...");
      window.location.reload();
    }
  };
  eventSource.onerror = function(event) {
    console.warn("[Federation] SSE connection error:", event);
  };
}
function initFederation() {
  return __async(this, arguments, function* (remotesOrManifestUrl = {}, options) {
    const cacheOption = options?.cacheTag ? `?t=${options.cacheTag}` : "";
    const remotes = typeof remotesOrManifestUrl === "string" ? yield loadManifest(remotesOrManifestUrl + cacheOption) : remotesOrManifestUrl;
    const url = "./remoteEntry.json" + cacheOption;
    const hostInfo = yield loadFederationInfo(url);
    const hostImportMap = yield processHostInfo(hostInfo);
    const remotesImportMap = yield processRemoteInfos(remotes, __spreadValues({
      throwIfRemoteNotFound: false
    }, options));
    const importMap = mergeImportMaps(hostImportMap, remotesImportMap);
    appendImportMap(importMap);
    return importMap;
  });
}
function loadManifest(remotes) {
  return __async(this, null, function* () {
    return yield fetch(remotes).then((r) => r.json());
  });
}
function processRemoteInfos(_0) {
  return __async(this, arguments, function* (remotes, options = { throwIfRemoteNotFound: false }) {
    const processRemoteInfoPromises = Object.keys(remotes).map((remoteName) => __async(null, null, function* () {
      try {
        let url = remotes[remoteName];
        if (options.cacheTag) {
          const addAppend = remotes[remoteName].includes("?") ? "&" : "?";
          url += `${addAppend}t=${options.cacheTag}`;
        }
        return yield processRemoteInfo(url, remoteName);
      } catch (e) {
        const error = `Error loading remote entry for ${remoteName} from file ${remotes[remoteName]}`;
        if (options.throwIfRemoteNotFound) {
          throw new Error(error);
        }
        console.error(error);
        return null;
      }
    }));
    const remoteImportMaps = yield Promise.all(processRemoteInfoPromises);
    const importMap = remoteImportMaps.reduce((acc, remoteImportMap) => remoteImportMap ? mergeImportMaps(acc, remoteImportMap) : acc, { imports: {}, scopes: {} });
    return importMap;
  });
}
function processRemoteInfo(federationInfoUrl, remoteName) {
  return __async(this, null, function* () {
    const baseUrl = getDirectory(federationInfoUrl);
    const remoteInfo = yield loadFederationInfo(federationInfoUrl);
    if (!remoteName) {
      remoteName = remoteInfo.name;
    }
    if (remoteInfo.buildNotificationsEndpoint) {
      watchFederationBuildCompletion(baseUrl + remoteInfo.buildNotificationsEndpoint);
    }
    const importMap = createRemoteImportMap(remoteInfo, remoteName, baseUrl);
    addRemote(remoteName, __spreadProps(__spreadValues({}, remoteInfo), { baseUrl }));
    return importMap;
  });
}
function createRemoteImportMap(remoteInfo, remoteName, baseUrl) {
  const imports = processExposed(remoteInfo, remoteName, baseUrl);
  const scopes = processRemoteImports(remoteInfo, baseUrl);
  return { imports, scopes };
}
function loadFederationInfo(url) {
  return __async(this, null, function* () {
    const info = yield fetch(url).then((r) => r.json());
    return info;
  });
}
function processRemoteImports(remoteInfo, baseUrl) {
  const scopes = {};
  const scopedImports = {};
  for (const shared of remoteInfo.shared) {
    const outFileName = getExternalUrl(shared) ?? joinPaths(baseUrl, shared.outFileName);
    setExternalUrl(shared, outFileName);
    scopedImports[shared.packageName] = outFileName;
  }
  scopes[baseUrl + "/"] = scopedImports;
  return scopes;
}
function processExposed(remoteInfo, remoteName, baseUrl) {
  const imports = {};
  for (const exposed of remoteInfo.exposes) {
    const key = joinPaths(remoteName, exposed.key);
    const value = joinPaths(baseUrl, exposed.outFileName);
    imports[key] = value;
  }
  return imports;
}
function processHostInfo(hostInfo, relBundlesPath = "./") {
  return __async(this, null, function* () {
    const imports = hostInfo.shared.reduce((acc, cur) => __spreadProps(__spreadValues({}, acc), {
      [cur.packageName]: relBundlesPath + cur.outFileName
    }), {});
    for (const shared of hostInfo.shared) {
      setExternalUrl(shared, relBundlesPath + shared.outFileName);
    }
    return { imports, scopes: {} };
  });
}

// projects/user/src/main.ts
initFederation().catch((err) => console.error(err)).then((_) => import("./chunk-VKU4N7LC.js")).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
