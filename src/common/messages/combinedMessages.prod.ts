export const allMessages: Readonly<Record<string, Readonly<Record<string, string>>>> = {
    ", please select the option that best describes the current state of your Vault. The application will then check your files in the most appropriate way based on your selection.":
        {
            def: ", please select the option that best describes the current state of your Vault. The application will then check your files in the most appropriate way based on your selection.",
            la: ", quaeso optionem elige quae statum praesentem tabularii tui optime describit. Applicatio deinde plicas tuas modo aptissimo secundum electionem tuam inspiciet.",
            zh: "，请选择最符合你库当前状态的选项。程序会根据你的选择，用最合适的方式检查你的文件。",
        },
    "(BETA) Always overwrite with a newer file": {
        def: "(BETA) Always overwrite with a newer file",
        la: "(BETA) Semper plica recentiore superscribe",
        zh: "始终使用更新的文件覆盖(测试版)",
    },
    "(Beta) Use ignore files": {
        def: "(Beta) Use ignore files",
        la: "(Beta) Plicis ignorandis utere",
        zh: "(测试版)使用忽略文件",
    },
    "(Days passed, 0 to disable automatic-deletion)": {
        def: "(Days passed, 0 to disable automatic-deletion)",
        la: "(Dies praeteriti; 0 ad deletionem automaticam deactivandam)",
        zh: "(已过天数,0为禁用自动删除)",
    },
    "(e.g., after editing many files whilst offline)": {
        def: "(e.g., after editing many files whilst offline)",
        la: "(e.g., postquam multas plicas sine conexione emendavisti)",
        zh: "（例如：离线期间编辑了大量文件之后）",
    },
    "(e.g., immediately after restoring on another computer, or having recovered from a backup)": {
        def: "(e.g., immediately after restoring on another computer, or having recovered from a backup)",
        la: "(e.g., statim post restitutionem in alio computatro, vel post recuperationem ex exemplari tutelari)",
        zh: "（例如：在另一台电脑上还原之后，或从备份恢复之后）",
    },
    "(e.g., setting up for the first time on a new smartphone, starting from a clean slate)": {
        def: "(e.g., setting up for the first time on a new smartphone, starting from a clean slate)",
        la: "(e.g., primum in novo telephono callido constituens, a tabula rasa incipiens)",
        zh: "（例如：在新手机上首次设置，从零开始）",
    },
    "(ex. Read chunks online) If this option is enabled, LiveSync reads chunks online directly instead of replicating them locally. Increasing Custom chunk size is recommended.":
        {
            def: "(ex. Read chunks online) If this option is enabled, Tabularium reads chunks online directly instead of replicating them locally. Increasing Custom chunk size is recommended.",
            la: "(e.g. fragmenta online lege) Si haec optio activa est, Tabularium fragmenta online directe legit pro iis localiter replicandis. Magnitudinem fragmenti propriam augere commendatur.",
            zh: "(例如,在线读取块)如果启用此选项,Tabularium 将直接在线读取块,而不是在本地复制块。建议增加自定义块大小",
        },
    "(MB) If this is set, changes to local and remote files that are larger than this will be skipped. If the file becomes smaller again, a newer one will be used.":
        {
            def: "(MB) If this is set, changes to local and remote files that are larger than this will be skipped. If the file becomes smaller again, a newer one will be used.",
            la: "(MB) Si hoc constituitur, mutationes plicarum localium et remotarum hac magnitudine maiorum praetermittentur. Si plica rursus minor fit, recentior adhibebitur.",
            zh: "(MB)如果设置了此项,大于此大小的本地和远程文件的更改将被跳过。如果文件再次变小,将使用更新的文件",
        },
    "(Mega chars)": {
        def: "(Mega chars)",
        la: "(Milliones characterum)",
        zh: "(百万字符)",
    },
    "(Not recommended) If set, credentials will be stored in the file.": {
        def: "(Not recommended) If set, credentials will be stored in the file.",
        la: "(Non commendatur) Si constituitur, testimonia in plica servabuntur.",
        zh: "(不建议)如果设置,凭据将存储在文件中",
    },
    "(Obsolete) Use an old adapter for compatibility": {
        def: "(Obsolete) Use an old adapter for compatibility",
        la: "(Obsoletum) Adaptatore vetere ad compatibilitatem utere",
        zh: "(已弃用)为兼容性使用旧适配器",
    },
    "[conflict] ${filename} is conflicted. Merging process has been postponed to the file have got opened.": {
        def: "${filename} has a conflict. Merging has been postponed until the file is opened.",
        la: "${filename} discrepantiam habet. Coniunctio differtur donec plica aperiatur.",
        zh: "${filename} 存在冲突。合并将推迟到打开该文件时进行。",
    },
    "↑ Uploading chunks \n${sendingDocs}/(${sentDocsCount} done)": {
        def: "↑ Uploading chunks \n${sendingDocs}/(${sentDocsCount} done)",
        la: "↑ Fragmenta mittuntur \n${sendingDocs}/(${sentDocsCount} perfecta)",
        zh: "↑ 正在上传数据块 \n${sendingDocs}/（已完成 ${sentDocsCount}）",
    },
    "↑${this.docSent - docSentOnStart}${pushLast} ↓${this.docArrived - docArrivedOnStart}${pullLast}": {
        def: "↑${this.docSent - docSentOnStart}${pushLast} ↓${this.docArrived - docArrivedOnStart}${pullLast}",
        la: "↑${this.docSent - docSentOnStart}${pushLast} ↓${this.docArrived - docArrivedOnStart}${pullLast}",
        zh: "↑${this.docSent - docSentOnStart}${pushLast} ↓${this.docArrived - docArrivedOnStart}${pullLast}",
    },
    "+1 week": {
        def: "+1 week",
        la: "+1 hebdomas",
        zh: "+1 周",
    },
    "${DECRYPTION_FALLBACK_FAILED} on Eden": {
        def: "${DECRYPTION_FALLBACK_FAILED} (inline chunks)",
        la: "${DECRYPTION_FALLBACK_FAILED} (fragmenta inclusa)",
        zh: "${DECRYPTION_FALLBACK_FAILED}（内联数据块）",
    },
    "${DECRYPTION_HKDF_FAILED} on Eden": {
        def: "${DECRYPTION_HKDF_FAILED} (inline chunks)",
        la: "${DECRYPTION_HKDF_FAILED} (fragmenta inclusa)",
        zh: "${DECRYPTION_HKDF_FAILED}（内联数据块）",
    },
    "${DECRYPTION_HKDF_FAILED} on Path": {
        def: "${DECRYPTION_HKDF_FAILED} (file path)",
        la: "${DECRYPTION_HKDF_FAILED} (via plicae)",
        zh: "${DECRYPTION_HKDF_FAILED}（文件路径）",
    },
    '${dryRun ? "Counting" : "Cleaning"} ${connSetting ? "remote" : "local"} database': {
        def: '${dryRun ? "Counting" : "Cleaning"} ${connSetting ? "remote" : "local"} database',
        la: '${dryRun ? "Counting" : "Cleaning"} ${connSetting ? "remote" : "local"} repositorium',
        zh: '${dryRun ? "Counting" : "Cleaning"} ${connSetting ? "remote" : "local"} 数据库',
    },
    "${ENCRYPTION_HKDF_FAILED} on Eden": {
        def: "${ENCRYPTION_HKDF_FAILED} (internal data)",
        la: "${ENCRYPTION_HKDF_FAILED} (data interna)",
        zh: "${ENCRYPTION_HKDF_FAILED}（内部数据）",
    },
    "${ENCRYPTION_HKDF_FAILED} on Metadata": {
        def: "${ENCRYPTION_HKDF_FAILED} (metadata)",
        la: "${ENCRYPTION_HKDF_FAILED} (metadata)",
        zh: "${ENCRYPTION_HKDF_FAILED}（元数据）",
    },
    "${file} is conflicted, merging process has been postponed.": {
        def: "${file} has a conflict; merging has been postponed.",
        la: "${file} discrepantiam habet; coniunctio dilata est.",
        zh: "${file} 存在冲突，已推迟合并。",
    },
    "${label}: ${totalProcessed} / ${total}": {
        def: "${label}: ${totalProcessed} / ${total}",
        la: "${label}: ${totalProcessed} / ${total}",
        zh: "${label}：${totalProcessed} / ${total}",
    },
    "${label}: Something went wrong on balancing": {
        def: "${label}: error while balancing",
        la: "${label}: error in aequando",
        zh: "${label}：平衡时出错",
    },
    "${MESSAGE_FALLBACK_DECRYPT_FAILED} on Path": {
        def: "${MESSAGE_FALLBACK_DECRYPT_FAILED} (file path)",
        la: "${MESSAGE_FALLBACK_DECRYPT_FAILED} (via plicae)",
        zh: "${MESSAGE_FALLBACK_DECRYPT_FAILED}（文件路径）",
    },
    '${this.translate("liveSyncReplicator.couldNotConnectToServer")} ${ret} ': {
        def: '${this.translate("liveSyncReplicator.couldNotConnectToServer")} ${ret} ',
        la: '${this.translate("liveSyncReplicator.couldNotConnectToServer")} ${ret} ',
        zh: '${this.translate("liveSyncReplicator.couldNotConnectToServer")} ${ret} ',
    },
    "${title} Could not delete conflicted revision ${displayRev(deleteRevision)} of ${path}": {
        def: "${title} Could not delete conflicted revision ${displayRev(deleteRevision)} of ${path}.",
        la: "${title} Revisio discrepantiae ${displayRev(deleteRevision)} plicae ${path} deleri non potuit.",
        zh: "${title} 无法删除 ${path} 的冲突修订 ${displayRev(deleteRevision)}。",
    },
    "Abort synchronization immediately": {
        def: "Abort synchronization immediately",
        la: "Synchronizationem statim abrumpe",
        zh: "立即中止同步",
    },
    Accept: {
        def: "Accept",
        la: "Accipe",
        zh: "接受",
    },
    ACCEPTED: {
        def: "ACCEPTED",
        la: "ACCEPTUM",
        zh: "已接受",
    },
    "Access Key": {
        def: "Access Key",
        la: "Clavis accessus",
        zh: "访问密钥",
    },
    Action: {
        def: "Action",
        la: "Actio",
        zh: "操作",
    },
    Activate: {
        def: "Activate",
        la: "Activa",
        zh: "启用",
    },
    "Active replicator does not support ${action}": {
        def: "The active synchronisation connection does not support ${action}",
        la: "Conexio synchronizationis activa actionem ${action} non sustinet",
        zh: "当前的同步连接不支持 ${action}",
    },
    "Active replicator not found during ${usage}": {
        def: "No active synchronisation connection was found during ${usage}",
        la: "Nulla conexio synchronizationis activa inventa est in actione ${usage}",
        zh: "执行 ${usage} 时未找到活动的同步连接",
    },
    "Active replicator not found during directional ${direction}": {
        def: "No active synchronisation connection was found for the ${direction} synchronisation",
        la: "Nulla conexio synchronizationis activa inventa est ad synchronizationem ${direction}",
        zh: "执行单向同步（${direction}）时未找到活动的同步连接",
    },
    Add: {
        def: "Add",
        la: "Adde",
        zh: "添加",
    },
    Advanced: {
        def: "Advanced",
        la: "Provecta",
        zh: "高级",
    },
    "Advanced Settings": {
        def: "Advanced Settings",
        la: "Optiones provectae",
        zh: "高级设置",
    },
    "After that, synchronise to a brand new vault on each other device with the new remote one by one.": {
        def: "After that, synchronise to a brand new vault on each other device with the new remote one by one.",
        la: "Deinde, in quoque alio instrumento singillatim cum novo remoto in tabularium omnino novum synchroniza.",
        zh: "之后，在其他设备上逐个用新的远端同步到一个全新的库。",
    },
    "Allow sleep during synchronisation": {
        def: "Allow sleep during synchronisation",
        la: "Somnum per synchronizationem permittere",
        zh: "同步时允许休眠",
    },
    "Allow sleep during synchronisation on the desktop": {
        def: "Allow sleep during synchronisation on the desktop",
        la: "Somnum per synchronizationem in computatro permittere",
        zh: "桌面端同步时允许休眠",
    },
    "Allow the operating system to sleep while finite synchronisation operations are in progress.": {
        def: "Allow the operating system to sleep while finite synchronisation operations are in progress.",
        la: "Systema operativum dormire sinit dum synchronizationes finitae fiunt.",
        zh: "进行有限次的同步操作时，允许操作系统进入休眠。",
    },
    "Always prompt merge conflicts": {
        def: "Always prompt merge conflicts",
        la: "Semper de discrepantiis conflandis interroga",
        zh: "始终提示合并冲突",
    },
    Analyse: {
        def: "Analyse",
        la: "Analysa",
        zh: "立即分析",
    },
    "Analyse database usage": {
        def: "Analyse database usage",
        la: "Analysa usum repositorii",
        zh: "分析数据库使用情况",
    },
    "Analyse Database Usage (advanced)": {
        def: "Analyse Database Usage (advanced)",
        la: "Usum repositorii examina (provectum)",
        zh: "分析数据库用量（高级）",
    },
    Apply: {
        def: "Apply",
        la: "Applica",
        zh: "应用",
    },
    "Apply Latest Change if Conflicting": {
        def: "Apply Latest Change if Conflicting",
        la: "Applica mutationem novissimam si discrepat",
        zh: "如果冲突则应用最新更改",
    },
    "Apply preset configuration": {
        def: "Apply preset configuration",
        la: "Applica configurationem praeparatam",
        zh: "应用预设配置",
    },
    Automatic: {
        def: "Automatic",
        la: "Automaticum",
        zh: "自动",
    },
    "Automatically Sync all files when opening Obsidian.": {
        def: "Automatically Sync all files when opening Obsidian.",
        la: "Omnes plicas automatice synchroniza cum Obsidian aperitur.",
        zh: "打开 Obsidian 时自动同步所有文件",
    },
    Back: {
        def: "Back",
        la: "Retro",
        zh: "返回",
    },
    "Back to this revision": {
        def: "Back to this revision",
        la: "Redi ad hanc recensionem",
        zh: "回到此版本",
    },
    "Batch database update": {
        def: "Batch database update",
        la: "Renovatio repositorii acervatim",
        zh: "批量数据库更新",
    },
    "Batch database updates in LiveSync mode": {
        def: "Batch database updates in live sync",
        la: "Renovationes repositorii in modo vivo coniungere",
        zh: "实时同步时批量写入数据库",
    },
    "Batch limit": {
        def: "Batch limit",
        la: "Limes acervi",
        zh: "批量限制",
    },
    "Batch size": {
        def: "Batch size",
        la: "Magnitudo acervi",
        zh: "批量大小",
    },
    "Batch size of on-demand fetching": {
        def: "Batch size of on-demand fetching",
        la: "Magnitudo acervi arcessionis ad postulatum",
        zh: "按需获取的批量大小",
    },
    "Before v0.17.16, we used an old adapter for the local database. Now the new adapter is preferred. However, it needs local database rebuilding. Please disable this toggle when you have enough time. If leave it enabled, also while fetching from the remote database, you will be asked to disable this.":
        {
            def: "Before v0.17.16, we used an old adapter for the local database. Now the new adapter is preferred. However, it needs local database rebuilding. Please disable this toggle when you have enough time. If leave it enabled, also while fetching from the remote database, you will be asked to disable this.",
            la: "Ante v0.17.16, adaptatore vetere ad repositorium locale utebamur. Nunc adaptator novus praefertur. Attamen repositorium locale reaedificandum est. Quaeso hoc commutatorium deactiva cum satis temporis habes. Si activum relinquis, etiam dum ex repositorio remoto arcessis, rogaberis ut hoc deactives.",
            zh: "在 v0.17.16 之前,我们使用旧适配器作为本地数据库。现在首选新适配器。但是,它需要重建本地数据库。请在有足够时间时禁用此开关。如果保持启用状态,并且在从远程数据库获取时,系统将要求您禁用此开关。",
        },
    "Bucket Name": {
        def: "Bucket Name",
        la: "Nomen situlae",
        zh: "存储桶名称",
    },
    "Bulk sending chunks to remote database...": {
        def: "Sending data chunks to the server…",
        la: "Fragmenta ad ministratorem mittuntur…",
        zh: "正在把数据块发送到服务器…",
    },
    "Bulk sending failed.": {
        def: "Sending data chunks failed.",
        la: "Missio fragmentorum defecit.",
        zh: "数据块发送失败。",
    },
    "by resetting the remote, you will be informed on other devices.": {
        def: "by resetting the remote, you will be informed on other devices.",
        la: "remoto restituendo, in aliis instrumentis certior fies.",
        zh: "重置远端后，其他设备会收到通知。",
    },
    Cancel: {
        def: "Cancel",
        la: "Abroga",
        zh: "取消",
    },
    "Cancel all and reboot": {
        def: "Cancel all and reboot",
        la: "Abroga omnia et reinitia",
        zh: "全部取消并重启",
    },
    Check: {
        def: "Check",
        la: "Inspice",
        zh: "立即检查",
    },
    "Check and Processing ${i} / ${files.length}": {
        def: "Checking and processing ${i} / ${files.length}",
        la: "Inspiciuntur et tractantur ${i} / ${files.length}",
        zh: "正在检查和处理 ${i} / ${files.length}",
    },
    Chunks: {
        def: "Chunks",
        la: "Fragmenta",
        zh: "块",
    },
    'Cleaning ${connSetting ? "remote" : "local"} database up: Done': {
        def: 'Cleaning the ${connSetting ? "remote" : "local"} database: done',
        la: 'Purgatio repositorii ${connSetting ? "remote" : "local"}: facta',
        zh: '${connSetting ? "remote" : "local"} 数据库清理：完成',
    },
    "Cleaning unreferenced chunks done!": {
        def: "Cleaning unreferenced chunks done.",
        la: "Purgatio fragmentorum non relatorum facta est.",
        zh: "未被引用的数据块已清理完成。",
    },
    "Cleaning unreferenced chunks on local": {
        def: "Cleaning unreferenced chunks on this device",
        la: "Fragmenta non relata in hoc instrumento purgantur",
        zh: "正在清理此设备上未被引用的数据块",
    },
    "Cleaning unreferenced chunks on remote": {
        def: "Cleaning unreferenced chunks on the server",
        la: "Fragmenta non relata in ministratore purgantur",
        zh: "正在清理服务器上未被引用的数据块",
    },
    Close: {
        def: "Close",
        la: "Claude",
        zh: "关闭",
    },
    "Close this dialog": {
        def: "Close this dialog",
        la: "Claude hunc dialogum",
        zh: "关闭此对话框",
    },
    "Closed:": {
        def: "Closed:",
        la: "Clausi:",
        zh: "已关闭：",
    },
    "Collecting local files on the DB: ${count}": {
        def: "Collecting this device's files in the database: ${count}",
        la: "Plicae huius instrumenti in repositorio colliguntur: ${count}",
        zh: "正在把本机文件收入数据库：${count}",
    },
    "Collecting unreferenced chunks on ${info.db_name}": {
        def: "Collecting unreferenced chunks in ${info.db_name}",
        la: "Fragmenta non relata in ${info.db_name} colliguntur",
        zh: "正在收集 ${info.db_name} 中未被引用的数据块",
    },
    "Comma separated `.gitignore, .dockerignore`": {
        def: "Comma separated `.gitignore, .dockerignore`",
        la: "Commatibus separata `.gitignore, .dockerignore`",
        zh: "用逗号分隔,例如 `.gitignore, .dockerignore`",
    },
    Command: {
        def: "Command",
        la: "Mandatum",
        zh: "命令",
    },
    "Compacting database done": {
        def: "Compacting database done.",
        la: "Compactio repositorii facta est.",
        zh: "数据库压缩完成。",
    },
    "Compacting database...": {
        def: "Compacting database...",
        la: "Repositorium compingitur...",
        zh: "正在压缩数据库……",
    },
    "Compare time and take newer": {
        def: "Compare time and take newer",
        la: "Compara tempus et recentiorem sume",
        zh: "比较时间并采用较新的版本",
    },
    "Complement completed!": {
        def: "Missing chunks filled in.",
        la: "Fragmenta deficientia suppleta sunt.",
        zh: "缺失的数据块已补全。",
    },
    "Complement missing chunks between databases": {
        def: "Filling in missing chunks between databases",
        la: "Fragmenta deficientia inter repositoria supplentur",
        zh: "正在补全数据库之间缺失的数据块",
    },
    "Concat both": {
        def: "Concat both",
        la: "Coniunge ambo",
        zh: "合并两者",
    },
    "Concatenated content cannot be stored:${filename}": {
        def: "Concatenated content could not be stored: ${filename}",
        la: "Contentum concatenatum servari non potuit: ${filename}",
        zh: "无法保存拼接后的内容：${filename}",
    },
    "Concatenated saved, but cannot delete conflicted revisions: ${filename}, (${displayRev(delRev)})": {
        def: "Concatenated content was saved, but the conflicted revisions could not be deleted: ${filename} (${displayRev(delRev)})",
        la: "Contentum concatenatum servatum est, sed revisiones discrepantiae deleri non potuerunt: ${filename} (${displayRev(delRev)})",
        zh: "拼接后的内容已保存，但无法删除冲突修订：${filename}（${displayRev(delRev)}）",
    },
    Configuration: {
        def: "Configuration",
        la: "Configuratio",
        zh: "配置",
    },
    "Configuration issues detected and automatically resolved. However, unsynchronized data may exist. Consider rebuilding if necessary.":
        {
            def: "Configuration issues were found and fixed automatically. Some data may not have been synchronised; rebuild if necessary.",
            la: "Vitia configurationis inventa et sponte correcta sunt. Fortasse tamen data nondum synchronizata exstant; si opus est, reaedifica.",
            zh: "检测到配置问题并已自动修正，但可能仍有未同步的数据，必要时请重建。",
        },
    Configure: {
        def: "Configure",
        la: "Configura",
        zh: "配置",
    },
    "Conflict & Deletion Options": {
        def: "Conflict & Deletion Options",
        la: "Optiones discrepantiarum et deletionis",
        zh: "冲突与删除选项",
    },
    Connect: {
        def: "Connect",
        la: "Conecte",
        zh: "连接",
    },
    Connected: {
        def: "Connected",
        la: "Conexum",
        zh: "已连接",
    },
    "Connected to ${connection.info.db_name} successfully": {
        def: "Connected to ${connection.info.db_name}.",
        la: "Conexio cum ${connection.info.db_name} facta est.",
        zh: "已连接到 ${connection.info.db_name}。",
    },
    "Connected to ${db.info.db_name} successfully": {
        def: "Connected to ${db.info.db_name}",
        la: "Conexio cum ${db.info.db_name} facta est",
        zh: "已连接到 ${db.info.db_name}",
    },
    "Connected:": {
        def: "Connected:",
        la: "Conexi:",
        zh: "已连接：",
    },
    "Connection:": {
        def: "Connection:",
        la: "Conexio:",
        zh: "连接：",
    },
    Content: {
        def: "Content",
        la: "Contentum",
        zh: "内容",
    },
    Copied: {
        def: "Copied",
        la: "Exscriptum",
        zh: "已复制",
    },
    Copy: {
        def: "Copy",
        la: "Exscribe",
        zh: "复制",
    },
    "Copy to clipboard": {
        def: "Copy to clipboard",
        la: "Exscribe in tabellam",
        zh: "复制到剪贴板",
    },
    "CouchDB only. Version 0 preserves legacy path identity; version 1 uses Unicode NFC. Physical file names stay unchanged. Update every device and stop synchronisation, then Rebuild both databases from a complete authoritative Vault and Fetch on the other devices. Resolve colliding file names first. P2P and Object Storage do not support version 1.":
        {
            def: "CouchDB only. Version 0 preserves legacy path identity; version 1 uses Unicode NFC. Physical file names stay unchanged. Update every device and stop synchronisation, then Rebuild both databases from a complete authoritative Vault and Fetch on the other devices. Resolve colliding file names first. P2P and Object Storage do not support version 1.",
            la: "Solum CouchDB. Versio 0 identitatem viarum hereditariam servat; versio 1 Unicode NFC utitur. Nomina plicarum physica non mutantur. Omnia instrumenta renova et synchronizationem siste, deinde ambo repositoria ex tabulario integro et auctoritativo reaedifica et in aliis instrumentis arcesse. Prius nomina plicarum inter se collidentia resolve. P2P et repositorium obiectorum versionem 1 non sustinent.",
            zh: "仅限 CouchDB。版本 0 保留旧版路径标识；版本 1 使用 Unicode NFC。实际文件名保持不变。请更新所有设备并停止同步，然后用一份完整且权威的笔记库重建两个数据库，再在其他设备上获取。请先解决文件名冲突。P2P 和对象存储不支持版本 1。",
        },
    "Could not apply ${tryGetFilePath(info)} revision ${rev}; the selected revision is no longer live": {
        def: "Could not apply revision ${rev} of ${tryGetFilePath(info)}; the selected revision is no longer current",
        la: "Revisio ${rev} plicae ${tryGetFilePath(info)} applicari non potuit; revisio electa iam non viget",
        zh: "无法应用 ${tryGetFilePath(info)} 的修订 ${rev}：所选修订已不再有效",
    },
    "Could not apply the stored filename case: ${existDoc.path} -> ${path}": {
        def: "Could not apply the stored filename case: ${existDoc.path} -> ${path}",
        la: "Forma litterarum nominis plicae servata applicari non potuit: ${existDoc.path} -> ${path}",
        zh: "无法应用数据库中保存的文件名大小写：${existDoc.path} -> ${path}",
    },
    "Could not check the remote database version": {
        def: "Could not check the server's database version",
        la: "Versio repositorii ministratoris inspici non potuit",
        zh: "无法检查服务器数据库的版本",
    },
    "Could not connect to the remote database": {
        def: "Could not connect to the server",
        la: "Ad ministratorem conecti non potuit",
        zh: "无法连接服务器",
    },
    "Could not create ${flag}": {
        def: "Could not create the flag file ${flag}",
        la: "Plica signi ${flag} creari non potuit",
        zh: "无法创建标记文件 ${flag}",
    },
    "Could not find stub file for ${file.path}": {
        def: "Could not find the stub file for ${file.path}",
        la: "Plica vicaria pro ${file.path} inveniri non potuit",
        zh: "找不到 ${file.path} 的占位文件",
    },
    "could not get current revisions:${path}": {
        def: "Could not get the current revisions: ${path}",
        la: "Revisiones praesentes accipi non potuerunt: ${path}",
        zh: "无法获取当前修订：${path}",
    },
    "Could not mark ${file.path} as revision ${baseRevision}; the storage content differs": {
        def: "Could not mark ${file.path} as revision ${baseRevision}; the content in the vault differs",
        la: "${file.path} ut revisio ${baseRevision} notari non potuit; contentum in tabulario differt",
        zh: "无法将 ${file.path} 标记为修订 ${baseRevision}：库中的内容不同",
    },
    "Could not preserve the unknown conflict branch for ${file.path}": {
        def: "Could not keep the unknown conflict branch of ${file.path}",
        la: "Ramus discrepantiae ignotus plicae ${file.path} servari non potuit",
        zh: "无法保留 ${file.path} 未知的冲突分支",
    },
    "Could not preserve the unknown conflict branch for ${file.path}; no current revision is available": {
        def: "Could not keep the unknown conflict branch of ${file.path}; no current revision is available",
        la: "Ramus discrepantiae ignotus plicae ${file.path} servari non potuit; nulla revisio currens praesto est",
        zh: "无法保留 ${file.path} 未知的冲突分支：没有可用的当前修订",
    },
    "could not read conflicted revision ${rightRev}:${path}": {
        def: "Could not read conflicted revision ${rightRev}: ${path}",
        la: "Revisio discrepantiae ${rightRev} legi non potuit: ${path}",
        zh: "无法读取冲突修订 ${rightRev}：${path}",
    },
    "Could not remove ${flag} after restart preparation failed": {
        def: "Preparing the restart failed, and the flag file ${flag} could not be removed",
        la: "Praeparatio iterati initii defecit, et plica signi ${flag} removeri non potuit",
        zh: "重启准备失败，且无法删除标记文件 ${flag}",
    },
    "Could not retrieve remote milestone": {
        def: "Could not retrieve the server's milestone record",
        la: "Monumentum ministratoris legi non potuit",
        zh: "无法读取服务器上的里程碑记录",
    },
    "Could not store ${file.path} on revision ${baseRevision}; the selected revision is no longer live": {
        def: "Could not save ${file.path} on revision ${baseRevision}; the selected revision is no longer current",
        la: "${file.path} in revisione ${baseRevision} servari non potuit; revisio electa iam non viget",
        zh: "无法基于修订 ${baseRevision} 保存 ${file.path}：所选修订已不再有效",
    },
    "Could not validate deletion of ${path}; preserved the database entry": {
        def: "Could not confirm the deletion of ${path}; the database entry was kept",
        la: "Deletio plicae ${path} confirmari non potuit; inscriptio in repositorio servata est",
        zh: "无法确认 ${path} 的删除，已保留数据库中的条目",
    },
    "Could not validate the saved storage operation for ${path} against current storage; the operation remains pending for recovery":
        {
            def: "Could not check the saved file operation for ${path} against the vault; it remains pending for recovery",
            la: "Operatio servata plicae ${path} cum statu praesenti tabularii comparari non potuit; ad restitutionem pendet",
            zh: "无法根据库的当前状态核对 ${path} 已保存的文件操作，该操作仍待恢复",
        },
    "Could not write the resolved content to the storage: ${path}": {
        def: "Could not write the resolved content to storage: ${path}",
        la: "Contentum resolutum in repositorium scribi non potuit: ${path}",
        zh: "无法将解决后的内容写入存储：${path}",
    },
    "Create conflict": {
        def: "Create conflict",
        la: "Crea discrepantiam",
        zh: "制造冲突",
    },
    "Creating chunks Done: ${processed} of ${total} files": {
        def: "Data chunks created: ${processed} of ${total} files",
        la: "Fragmenta creata: ${processed} ex ${total} plicis",
        zh: "数据块已建立：${processed}/${total} 个文件",
    },
    "Creating missing chunks: ${processed} of ${total} files": {
        def: "Creating missing data chunks: ${processed} of ${total} files",
        la: "Fragmenta deficientia creantur: ${processed} ex ${total} plicis",
        zh: "正在补建数据块：${processed}/${total} 个文件",
    },
    "Custom Headers": {
        def: "Custom Headers",
        la: "Capita propria",
        zh: "自定义请求头",
    },
    "Data Compression": {
        def: "Data Compression",
        la: "Compressio datorum",
        zh: "数据压缩",
    },
    "Data retrieval scheduled": {
        def: "Data retrieval scheduled",
        la: "Receptio datorum ordinata",
        zh: "已安排数据获取",
    },
    "Data to Copy": {
        def: "Data to Copy",
        la: "Data exscribenda",
        zh: "要复制的数据",
    },
    'Database active-size: ${sizeToHumanReadable(getSize(info, "active"))}, external-size:${sizeToHumanReadable(\n        getSize(info, "external")\n      )}, file-size: ${sizeToHumanReadable(getSize(info, "file"))}':
        {
            def: 'Database active size: ${sizeToHumanReadable(getSize(info, "active"))}, external size: ${sizeToHumanReadable(\n        getSize(info, "external")\n      )}, file size: ${sizeToHumanReadable(getSize(info, "file"))}',
            la: 'Repositorium, magnitudo activa: ${sizeToHumanReadable(getSize(info, "active"))}, externa: ${sizeToHumanReadable(\n        getSize(info, "external")\n      )}, plicae: ${sizeToHumanReadable(getSize(info, "file"))}',
            zh: '数据库活动大小：${sizeToHumanReadable(getSize(info, "active"))}，外部大小：${sizeToHumanReadable(\n        getSize(info, "external")\n      )}，文件大小：${sizeToHumanReadable(getSize(info, "file"))}',
        },
    "Database and storage reflection has been resumed!": {
        def: "Changes between the database and the vault are being applied again.",
        la: "Reflexio inter repositorium et tabularium resumpta est.",
        zh: "数据库与库中文件之间的更改已恢复相互应用。",
    },
    "Database cleanup cancelled: ${describeRemoteFeatureRejection(assessment)}": {
        def: "Database cleanup cancelled: ${describeRemoteFeatureRejection(assessment)}",
        la: "Purgatio repositorii abrogata est: ${describeRemoteFeatureRejection(assessment)}",
        zh: "已取消数据库清理：${describeRemoteFeatureRejection(assessment)}",
    },
    "Database cleanup cancelled: feature compatibility could not be checked.": {
        def: "Database cleanup cancelled: feature compatibility could not be checked.",
        la: "Purgatio repositorii abrogata est: congruentia facultatum inspici non potuit.",
        zh: "已取消数据库清理：无法检查功能兼容性。",
    },
    "Database initialisation was rejected by a required module.": {
        def: "Database initialisation was rejected by a required module.",
        la: "Initium repositorii a modulo necessario reiectum est.",
        zh: "数据库初始化被一个必需模块拒绝。",
    },
    "Database kept changing while reflecting ${path}": {
        def: "The database kept changing while ${path} was being written to the vault",
        la: "Dum ${path} in tabularium scribitur, repositorium mutari non desiit",
        zh: "将 ${path} 写入库时，数据库仍在不断变化",
    },
    "Database Name": {
        def: "Database Name",
        la: "Nomen repositorii",
        zh: "数据库名称",
    },
    "Database reset has been prevented or failed on some modules.": {
        def: "Database reset was prevented or failed in some modules.",
        la: "Restitutio repositorii in quibusdam modulis impedita est aut defecit.",
        zh: "部分模块阻止了数据库重置，或重置失败。",
    },
    "Database suffix": {
        def: "Database suffix",
        la: "Suffixum repositorii",
        zh: "数据库后缀",
    },
    "Database updated from ${from} to ${to}": {
        def: "Database updated from ${from} to ${to}",
        la: "Repositorium ab ${from} ad ${to} renovatum est",
        zh: "数据库已从 ${from} 更新到 ${to}",
    },
    Date: {
        def: "Date",
        la: "Dies",
        zh: "日期",
    },
    "Decryption failed.": {
        def: "Decryption failed.",
        la: "Decryptatio defecit.",
        zh: "解密失败。",
    },
    Default: {
        def: "Default",
        la: "Praedefinitum",
        zh: "默认",
    },
    "Delay conflict resolution of inactive files": {
        def: "Delay conflict resolution of inactive files",
        la: "Differ resolutionem discrepantiarum plicarum inactivarum",
        zh: "推迟解决不活动文件",
    },
    "Delay merge conflict prompt for inactive files.": {
        def: "Delay merge conflict prompt for inactive files.",
        la: "Differ interrogationem de discrepantiis conflandis plicarum inactivarum.",
        zh: "推迟手动解决不活动文件",
    },
    Delete: {
        def: "Delete",
        la: "Dele",
        zh: "删除",
    },
    "DELETE DATABASE did not delete ${path}; keeping last-seen record to avoid resurrecting the file": {
        def: "Could not delete ${path} from the database; keeping its last-seen record so the file is not restored",
        la: "${path} ex repositorio deleri non potuit; ultimum eius vestigium servatur ne plica revivescat",
        zh: "未能从数据库删除 ${path}；保留其最后记录，以免文件被恢复",
    },
    "Delete local files if deleted on remote": {
        def: "Delete local files if deleted on remote",
        la: "Dele plicas locales si in remoto deletae sunt",
        zh: "远程已删除时删除本地文件",
    },
    "Delete local files if not on remote": {
        def: "Delete local files if not on remote",
        la: "Dele plicas locales si in remoto non sunt",
        zh: "远程不存在时删除本地文件",
    },
    "Delete old metadata of deleted files on start-up": {
        def: "Delete old metadata of deleted files on start-up",
        la: "Dele metadata vetera plicarum deletarum in initio",
        zh: "启动时删除已删除文件的旧元数据",
    },
    Deleted: {
        def: "Deleted",
        la: "Deletum",
        zh: "已删除",
    },
    DENIED: {
        def: "DENIED",
        la: "NEGATUM",
        zh: "已拒绝",
    },
    Deny: {
        def: "Deny",
        la: "Nega",
        zh: "拒绝",
    },
    desktop: {
        def: "desktop",
        la: "instrumentum mensale",
        zh: "桌面设备",
    },
    "Desktop only. Allow sleep on this device even when the general option is disabled.": {
        def: "Desktop only. Allow sleep on this device even when the general option is disabled.",
        la: "Tantum in computatro. Hoc instrumentum dormire sinit etiam si optio generalis non est accensa.",
        zh: "仅桌面端。即使上面的通用选项关闭，也允许这台设备休眠。",
    },
    Developer: {
        def: "Developer",
        la: "Programmator",
        zh: "开发者",
    },
    Device: {
        def: "Device",
        la: "Instrumentum",
        zh: "设备",
    },
    "Device name": {
        def: "Device name",
        la: "Nomen instrumenti",
        zh: "设备名称",
    },
    "Device name missing. Disabling plug-in sync.": {
        def: "Device name is missing. Plug-in sync has been turned off.",
        la: "Nomen instrumenti deest. Synchronizatio additamentorum deactivata est.",
        zh: "缺少设备名称，已关闭插件同步。",
    },
    Diag: {
        def: "Diag",
        la: "Diagn.",
        zh: "诊断",
    },
    "dialog.copy.copied": {
        def: "Your ${title} has been copied to the clipboard.",
        la: "${title} tua in tabellam exscripta sunt.",
        zh: "你的${title}已复制到剪贴板。",
    },
    "dialog.copy.defaultTitle": {
        def: "data",
        la: "data",
        zh: "数据",
    },
    "dialog.copy.ready": {
        def: "Your ${title} is ready to be copied",
        la: "${title} tua ad exscribendum parata sunt",
        zh: "你的${title}已可复制",
    },
    Diff: {
        def: "Diff",
        la: "Differentiae",
        zh: "差异",
    },
    Different: {
        def: "Different",
        la: "Diversum",
        zh: "不同",
    },
    "Disables logging, only shows notifications. Please disable if you report an issue.": {
        def: "Disables logging, only shows notifications. Please disable if you report an issue.",
        la: "Acta deactivat, solum notificationes ostendit. Quaeso deactiva si quaestionem nuntias.",
        zh: "禁用日志记录,仅显示通知。如果您报告问题,请禁用此选项",
    },
    Disconnect: {
        def: "Disconnect",
        la: "Disiunge",
        zh: "断开连接",
    },
    Disconnected: {
        def: "Disconnected",
        la: "Disiunctum",
        zh: "已断开",
    },
    Dismiss: {
        def: "Dismiss",
        la: "Dimitte",
        zh: "忽略",
    },
    "Display Language": {
        def: "Display Language",
        la: "Lingua ostentationis",
        zh: "显示语言",
    },
    "Display name": {
        def: "Display name",
        la: "Nomen ostentum",
        zh: "显示名称",
    },
    "Do not check configuration mismatch before replication": {
        def: "Do not check configuration mismatch before replication",
        la: "Ne inspice discrepantiam configurationis ante replicationem",
        zh: "在复制前不检查配置不匹配",
    },
    "Do not keep metadata of deleted files.": {
        def: "Do not keep metadata of deleted files.",
        la: "Ne serva metadata plicarum deletarum.",
        zh: "不保留已删除文件的元数据 ",
    },
    "Do not split chunks in the background": {
        def: "Do not split chunks in the background",
        la: "Ne divide fragmenta in recessu",
        zh: "不在后台分割 chunks",
    },
    "Do not use internal API": {
        def: "Do not use internal API",
        la: "Ne utere API interno",
        zh: "不使用内部 API",
    },
    "Doctor.Button.DismissThisVersion": {
        def: "No, and do not ask again until the next release",
        la: "Non, nec iterum roga usque ad proximam editionem",
        zh: "拒绝,并且直到下个版本前不再询问",
    },
    "Doctor.Button.Fix": {
        def: "Fix it",
        la: "Corrige",
        zh: "修复",
    },
    "Doctor.Button.FixButNoRebuild": {
        def: "Fix it but no rebuild",
        la: "Corrige sed sine reaedificatione",
        zh: "修复但不重建",
    },
    "Doctor.Button.No": {
        def: "No",
        la: "Non",
        zh: "拒绝",
    },
    "Doctor.Button.Skip": {
        def: "Leave it as is",
        la: "Relinque ut est",
        zh: "保持不变",
    },
    "Doctor.Button.Yes": {
        def: "Yes",
        la: "Ita",
        zh: "确定",
    },
    "Doctor.Dialogue.Main": {
        def: "Hi! Config Doctor has been activated because of ${activateReason}!\nAnd, unfortunately some configurations were detected as potential problems.\nPlease be assured. Let's solve them one by one.\n\nTo let you know ahead of time, we will ask you about the following items.\n\n${issues}\n\nShall we get started?",
        la: "Salve! Medicus configurationis activatus est propter ${activateReason}!\nEt, infeliciter, quaedam configurationes ut difficultates possibiles detectae sunt.\nNoli timere. Eas singillatim solvamus.\n\nUt praescias, de his rebus te interrogabimus.\n\n${issues}\n\nIncipiamusne?",
        zh: "您好！配置医生已根据您的要求启动(感谢您)！！遗憾的是,检测到部分配置存在潜在问题。请放心,我们将逐一解决这些问题。\n\n提前告知您,我们将就以下事项进行确认：\n\n为数据块计算修订版本(此前行为)\n增强块大小\n\n我们开始处理吗?",
    },
    "Doctor.Dialogue.MainFix": {
        def: "\n## ${name}\n\n| Current | Ideal |\n|:---:|:---:|\n| ${current} | ${ideal} |\n\n**Recommendation Level:** ${level}\n\n### Why this has been detected?\n\n${reason}\n\n${note}\n\nFix this to the ideal value?",
        la: "\n## ${name}\n\n| Praesens | Idealis |\n|:---:|:---:|\n| ${current} | ${ideal} |\n\n**Gradus commendationis:** ${level}\n\n### Cur hoc detectum est?\n\n${reason}\n\n${note}\n\nCorrigerene ad valorem idealem?",
        zh: "\n## ${name}\n\n| Current | Ideal |\n|:---:|:---:|\n| ${current} | ${ideal} |\n\n**Recommendation Level:** ${level}\n\n### Why this has been detected?\n\n${reason}\n\n${note}\n\nFix this to the ideal value?",
    },
    "Doctor.Dialogue.Title": {
        def: "Tabularium Config Doctor",
        la: "Medicus configurationis Tabularii",
        zh: "Tabularium 配置诊断",
    },
    "Doctor.Dialogue.TitleAlmostDone": {
        def: "Almost done!",
        la: "Paene perfectum!",
        zh: "全部完成!",
    },
    "Doctor.Dialogue.TitleFix": {
        def: "Fix issue ${current}/${total}",
        la: "Corrige quaestionem ${current}/${total}",
        zh: "修复问题 ${current}/${total}",
    },
    "Doctor.Level.Must": {
        def: "Must",
        la: "Oportet",
        zh: "必须",
    },
    "Doctor.Level.Necessary": {
        def: "Necessary",
        la: "Necessarium",
        zh: "必要",
    },
    "Doctor.Level.Optional": {
        def: "Optional",
        la: "Optionale",
        zh: "可选",
    },
    "Doctor.Level.Recommended": {
        def: "Recommended",
        la: "Commendatum",
        zh: "推荐",
    },
    "Doctor.Message.NoIssues": {
        def: "No issues detected!",
        la: "Nullae quaestiones detectae!",
        zh: "未发现问题!",
    },
    "Doctor.Message.RebuildLocalRequired": {
        def: "Attention! A local database rebuild is required to apply this!",
        la: "Attende! Ad hoc applicandum repositorium locale reaedificandum est!",
        zh: "注意！需要重建本地数据库以应用此项！",
    },
    "Doctor.Message.RebuildRequired": {
        def: "Attention! A rebuild is required to apply this!",
        la: "Attende! Ad hoc applicandum reaedificatio requiritur!",
        zh: "注意！需要重建才能应用此项！",
    },
    "Doctor.Message.SomeSkipped": {
        def: "We left some issues as is. Shall I ask you again on next startup?",
        la: "Quasdam quaestiones ut erant reliquimus. Rogabone te iterum in proximo initio?",
        zh: "我们将某些问题留给了以后处理。是否要在下次启动时再次询问您？",
    },
    "Doctor.RULES.E2EE_V02500.REASON": {
        def: "The End-to-End Encryption has got now more robust and faster. Also because, the previous E2EE was found to be compromised in a re-conducted code review. It should be applied as soon as possible. Really apologises for your inconvenience. And, this setting is not forward compatible. All synchronised devices must be updated to v0.25.0 or higher. Rebuilds are not required and will be converted from the new transfer to the new format, However, it is recommended to rebuild whenever possible.",
        la: "Cryptatio ab extremo ad extremum nunc firmior et celerior facta est. Etiam quia cryptatio E2EE prior in iterata codicis recensione violata esse inventa est. Quam primum applicanda est. Valde nos paenitet incommodi tui. Praeterea haec optio non est prorsus compatibilis. Omnia instrumenta synchronizata ad v0.25.0 vel superiorem renovanda sunt. Reaedificationes non requiruntur, et data in novam formam per novam translationem convertentur; attamen quotiens fieri potest reaedificare commendatur.",
        zh: "The End-to-End Encryption has got now more robust and faster. Also because, the previous E2EE was found to be compromised in a re-conducted code review. It should be applied as soon as possible. Really apologises for your inconvenience. And, this setting is not forward compatible. All synchronised devices must be updated to v0.25.0 or higher. Rebuilds are not required and will be converted from the new transfer to the new format, However, it is recommended to rebuild whenever possible.",
    },
    "Document History": {
        def: "Document History",
        la: "Historia documenti",
        zh: "文档历史记录",
    },
    Done: {
        def: "Done",
        la: "Factum",
        zh: "完成",
    },
    "Done!": {
        def: "Done.",
        la: "Factum est.",
        zh: "完成。",
    },
    'DryRun of cleaning ${connSetting ? "remote" : "local"} database up: Done': {
        def: 'Dry run of cleaning the ${connSetting ? "remote" : "local"} database: done',
        la: 'Purgatio repositorii ${connSetting ? "remote" : "local"} experimento acta: facta',
        zh: '${connSetting ? "remote" : "local"} 数据库清理试运行：完成',
    },
    Duplicate: {
        def: "Duplicate",
        la: "Duplica",
        zh: "复制",
    },
    "Enable advanced features": {
        def: "Enable advanced features",
        la: "Activa facultates provectas",
        zh: "启用高级功能",
    },
    "Enable customization sync": {
        def: "Enable customization sync",
        la: "Activa synchronizationem optionum propriarum",
        zh: "启用自定义同步",
    },
    "Enable edge case treatment features": {
        def: "Enable edge case treatment features",
        la: "Activa facultates tractationis casuum extremorum",
        zh: "启用边缘情况处理功能",
    },
    "Enable poweruser features": {
        def: "Enable poweruser features",
        la: "Activa facultates usorum peritorum",
        zh: "启用高级用户功能",
    },
    "Enable this if your Object Storage doesn't support CORS": {
        def: "Enable this if your Object Storage doesn't support CORS",
        la: "Hoc activa si repositorium obiectorum tuum CORS non sustinet",
        zh: "如果您的对象存储不支持 CORS,请启用此功能 ",
    },
    "Enable this option to automatically apply the most recent change to documents even when it conflicts": {
        def: "Enable this option to automatically apply the most recent change to documents even when it conflicts",
        la: "Hanc optionem activa ut mutatio novissima documentis automatice applicetur etiam cum discrepat",
        zh: "启用此选项可在文档冲突时自动应用最新的更改",
    },
    Enabled: {
        def: "Enabled",
        la: "Activum",
        zh: "已启用",
    },
    "Encrypt contents on the remote database. If you use the plugin's synchronization feature, enabling this is recommended.":
        {
            def: "Encrypt contents on the remote database. If you use the plugin's synchronization feature, enabling this is recommended.",
            la: "Contenta in repositorio remoto crypta. Si facultate synchronizationis additamenti uteris, hoc activare commendatur.",
            zh: "加密远程数据库中的内容。如果您使用插件的同步功能,则建议启用此功能 ",
        },
    "Encrypted remote configurations found, but passphrase is unavailable. Verify configuration before syncing.": {
        def: "Encrypted server configurations were found, but the passphrase is unavailable. Check the configuration before synchronising.",
        la: "Configurationes ministratoris cryptatae inventae sunt, sed tessera arcana praesto non est. Ante synchronizationem configurationem inspice.",
        zh: "发现已加密的服务器配置，但无法获取密码短语。同步前请检查配置。",
    },
    "Encrypting sensitive configuration items": {
        def: "Encrypting sensitive configuration items",
        la: "Res configurationis sensibiles cryptantur",
        zh: "加密敏感配置项",
    },
    "Encryption Algorithm": {
        def: "Encryption Algorithm",
        la: "Algorithmus cryptationis",
        zh: "加密算法",
    },
    "Encryption failed.": {
        def: "Encryption failed.",
        la: "Cryptatio defecit.",
        zh: "加密失败。",
    },
    "End-to-End Encryption": {
        def: "End-to-End Encryption",
        la: "Cryptatio ab extremo ad extremum",
        zh: "端到端加密",
    },
    "Endpoint URL": {
        def: "Endpoint URL",
        la: "URL termini",
        zh: "终端URL",
    },
    "Enhance chunk size": {
        def: "Enhance chunk size",
        la: "Auge magnitudinem fragmentorum",
        zh: "增大块大小",
    },
    "Error in applying external settings: ": {
        def: "Error while applying external settings",
        la: "Erratum in optionibus externis applicandis",
        zh: "应用外部设置时出错",
    },
    "Error in applying partial settings: ": {
        def: "Error while applying partial settings",
        la: "Erratum in optionibus partialibus applicandis",
        zh: "应用部分设置时出错",
    },
    "Error in Setting Save Event": {
        def: "Error while saving settings.",
        la: "Error in optionibus servandis.",
        zh: "保存设置时出错。",
    },
    "Error in update function: ": {
        def: "Error while updating settings",
        la: "Erratum in optionibus renovandis",
        zh: "更新设置时出错",
    },
    "Error processing ${path} with action ${action}": {
        def: "Error processing ${path} (action: ${action})",
        la: "Erratum in ${path} tractando (actio: ${action})",
        zh: "处理 ${path}（操作：${action}）时出错",
    },
    "Error while loading file.": {
        def: "Error while loading file.",
        la: "Error dum plica oneratur.",
        zh: "加载文件时出错。",
    },
    "Error while processing replication result": {
        def: "Error while processing the replication result.",
        la: "Error in eventu synchronizationis tractando.",
        zh: "处理同步结果时出错。",
    },
    "Error while scanning conflicted files...": {
        def: "Error while scanning for conflicted files.",
        la: "Error in plicis discrepantiae perscrutandis.",
        zh: "扫描冲突文件时出错。",
    },
    "Error while synchronising files": {
        def: "Error while synchronising files",
        la: "Erratum dum plicae synchronizantur",
        zh: "同步文件时出错",
    },
    Export: {
        def: "Export",
        la: "Exporta",
        zh: "导出",
    },
    "Failed to activate the selected P2P remote configuration: ${p2pActiveConfigurationId}": {
        def: "Could not activate the selected peer-to-peer configuration: ${p2pActiveConfigurationId}",
        la: "Configuratio inter pares electa activari non potuit: ${p2pActiveConfigurationId}",
        zh: "无法启用所选的点对点配置：${p2pActiveConfigurationId}",
    },
    "Failed to activate the selected remote configuration: ${activeConfigurationId}": {
        def: "Could not activate the selected server configuration: ${activeConfigurationId}",
        la: "Configuratio ministratoris electa activari non potuit: ${activeConfigurationId}",
        zh: "无法启用所选的服务器配置：${activeConfigurationId}",
    },
    "Failed to count compromised chunks in local database": {
        def: "Could not count compromised chunks in this device's database.",
        la: "Fragmenta corrupta in repositorio huius instrumenti numerari non potuerunt.",
        zh: "无法统计此设备数据库中受损的数据块。",
    },
    "Failed to count compromised chunks in remote database": {
        def: "Could not count compromised chunks on the server.",
        la: "Fragmenta corrupta in ministratore numerari non potuerunt.",
        zh: "无法统计服务器上受损的数据块。",
    },
    "Failed to decrypt configuration item": {
        def: "Could not decrypt a configuration item",
        la: "Res configurationis decryptari non potuit",
        zh: "无法解密配置项",
    },
    "Failed to decrypt passphrase from data.json! Ensure configuration is correct before syncing with remote.": {
        def: "Could not decrypt the passphrase from data.json. Make sure the configuration is correct before synchronising with the server.",
        la: "Tessera arcana ex data.json decryptari non potuit. Ante synchronizationem cum ministratore fac ut configuratio recta sit.",
        zh: "无法解密 data.json 中的密码短语。与服务器同步前，请确认配置正确。",
    },
    "Failed to decrypt remote configuration '${id}'. Verify passphrase and configuration.": {
        def: "Could not decrypt server configuration '${id}'. Check the passphrase and the configuration.",
        la: "Configuratio ministratoris “${id}” decryptari non potuit. Tesseram arcanam et configurationem inspice.",
        zh: "无法解密服务器配置“${id}”。请检查密码短语和配置。",
    },
    "Failed to encode split QR Code (${ex2?.message || String(ex2)})": {
        def: "Could not encode the split QR code (${ex2?.message || String(ex2)})",
        la: "Codex QR divisus confici non potuit (${ex2?.message || String(ex2)})",
        zh: "无法编码分段二维码（${ex2?.message || String(ex2)}）",
    },
    "Failed to encrypt remote configuration '${id}'. This entry will be saved in plain text.": {
        def: "Could not encrypt server configuration '${id}'. This entry will be saved in plain text.",
        la: "Configuratio ministratoris “${id}” cryptari non potuit. Haec inscriptio textu aperto servabitur.",
        zh: "无法加密服务器配置“${id}”，该条目将以明文保存。",
    },
    "Failed to fetch by API. ${resp2.status}: ${msg}": {
        def: "The request failed. ${resp2.status}: ${msg}",
        la: "Petitio defecit. ${resp2.status}: ${msg}",
        zh: "请求失败。${resp2.status}: ${msg}",
    },
    "Failed to flush buffered chunks for ${dispFilename}": {
        def: "Could not flush buffered chunks for ${dispFilename}",
        la: "Fragmenta in memoria temporaria pro ${dispFilename} effundi non potuerunt",
        zh: "无法刷新 ${dispFilename} 的缓冲数据块",
    },
    "Failed to gather content of ${docNote}": {
        def: "Could not gather the content of ${docNote}",
        la: "Contentum ${docNote} colligi non potuit",
        zh: "无法收集 ${docNote} 的内容",
    },
    "Failed to get existing document for ${path} (${shortenId(dbDoc._id)}, ${shortenRev(dbDoc._rev)}) ": {
        def: "Could not get the existing document for ${path} (${shortenId(dbDoc._id)}, ${shortenRev(dbDoc._rev)})",
        la: "Documentum exstans pro ${path} accipi non potuit (${shortenId(dbDoc._id)}, ${shortenRev(dbDoc._rev)})",
        zh: "无法获取 ${path} 的现有文档（${shortenId(dbDoc._id)}，${shortenRev(dbDoc._rev)}）",
    },
    "Failed to get the preferred tweak values from the remote.": {
        def: "Could not get the preferred tweak values from the server.",
        la: "Valores accommodationis praelati a ministratore accipi non potuerunt.",
        zh: "无法从服务器获取推荐的调整值。",
    },
    "Failed to obtain passphrase when saving data.json! Please verify the configuration.": {
        def: "Could not obtain the passphrase while saving data.json. Please check the configuration.",
        la: "Dum data.json servatur, tessera arcana obtineri non potuit. Configurationem inspice.",
        zh: "保存 data.json 时无法获取密码短语，请检查配置。",
    },
    "Failed to open KeyValueDB": {
        def: "Could not open the key-value database",
        la: "Repositorium clavium et valorum aperiri non potuit",
        zh: "无法打开键值数据库",
    },
    "Failed to parse settings from decrypted data": {
        def: "Could not parse settings from the decrypted data.",
        la: "Optiones ex datis decryptatis interpretari non potuerunt.",
        zh: "无法从解密后的数据中解析设置。",
    },
    "Failed to parse Setup-URI.": {
        def: "Failed to parse Setup-URI.",
        la: "Setup-URI interpretari non potuit.",
        zh: "无法解析设置 URI。",
    },
    "Failed to reset KeyValueDB": {
        def: "Could not reset the key-value database",
        la: "Repositorium clavium et valorum restitui non potuit",
        zh: "无法重置键值数据库",
    },
    "Failed to restore ${file.path} from storage": {
        def: "Could not restore ${file.path} from storage",
        la: "${file.path} ex repositorio restitui non potuit",
        zh: "无法从存储中恢复 ${file.path}",
    },
    "Failed to retrieve passphrase. data.json contains unencrypted items!": {
        def: "Could not retrieve the passphrase. data.json contains unencrypted items.",
        la: "Tessera arcana accipi non potuit. data.json res non cryptatas continet.",
        zh: "无法获取密码短语。data.json 中包含未加密的项目。",
    },
    "Failed to store rename target; preserving source in the database: ${oldPath}": {
        def: "Could not save the renamed file; keeping the original in the database: ${oldPath}",
        la: "Plica renominata servari non potuit; fons in repositorio servatur: ${oldPath}",
        zh: "无法保存重命名后的文件，数据库中保留原文件：${oldPath}",
    },
    "Failed to write buffered chunks for ${dispFilename}": {
        def: "Could not write buffered chunks for ${dispFilename}",
        la: "Fragmenta in memoria temporaria pro ${dispFilename} scribi non potuerunt",
        zh: "无法写入 ${dispFilename} 的缓冲数据块",
    },
    "Failed to write document ${dispFilename}": {
        def: "Could not write document ${dispFilename}",
        la: "Documentum ${dispFilename} scribi non potuit",
        zh: "无法写入文档 ${dispFilename}",
    },
    "Failed:": {
        def: "Failed:",
        la: "Defecerunt:",
        zh: "失败：",
    },
    "Fast database fetch completed. Total documents in local database: ${allDocs.total_rows}": {
        def: "Fast database fetch complete. Documents in this device's database: ${allDocs.total_rows}",
        la: "Arcessitio celeris repositorii perfecta est. Documenta in repositorio huius instrumenti: ${allDocs.total_rows}",
        zh: "快速获取数据库完成。这台设备的数据库中共有 ${allDocs.total_rows} 个文档。",
    },
    "Fast database fetch is available only for CouchDB remote. Falling back to standard fetch.": {
        def: "Fast database fetch is only available with a CouchDB server. Using standard fetch instead.",
        la: "Arcessitio celeris repositorii tantum cum ministratore CouchDB praesto est. Arcessitio ordinaria adhibetur.",
        zh: "快速获取数据库仅适用于 CouchDB 服务器，改用标准获取。",
    },
    "Fast database fetch is unavailable while 'Use Internal API' is enabled. Falling back to Standard Fetch.": {
        def: "Fast database fetch is unavailable while requests go through Obsidian's internal API. Using standard fetch instead.",
        la: "Arcessitio celeris repositorii non praesto est dum petitiones per API internum Obsidian mittuntur. Arcessitio ordinaria adhibetur.",
        zh: "通过 Obsidian 内部 API 发送请求时无法快速获取数据库，改用标准获取。",
    },
    "Fast fetch checkpoint found, but the local database is empty. Starting from the beginning.": {
        def: "A fast fetch checkpoint was found, but this device's database is empty. Starting from the beginning.",
        la: "Punctum arcessitionis celeris inventum est, sed repositorium huius instrumenti vacuum est. Ab initio incipitur.",
        zh: "找到了快速获取的检查点，但这台设备的数据库是空的，将从头开始。",
    },
    "Fast fetch interrupted. Retrying from sequence: ${since}": {
        def: "Fast fetch interrupted. Retrying from sequence ${since}",
        la: "Arcessitio celeris interrupta est. A sequentia ${since} iterum temptatur",
        zh: "快速获取中断，从序号 ${since} 重试",
    },
    "Fast fetch progress: ${progress.totalValidFetched} / ${progress.docsToFetch}\nTotal bytes fetched: ${sizeToHumanReadable(progress.totalBytes)}":
        {
            def: "Fast fetch progress: ${progress.totalValidFetched} / ${progress.docsToFetch}\nTotal fetched: ${sizeToHumanReadable(progress.totalBytes)}",
            la: "Progressus arcessitionis celeris: ${progress.totalValidFetched} / ${progress.docsToFetch}\nSumma arcessita: ${sizeToHumanReadable(progress.totalBytes)}",
            zh: "快速获取进度：${progress.totalValidFetched} / ${progress.docsToFetch}\n已获取：${sizeToHumanReadable(progress.totalBytes)}",
        },
    Fetch: {
        def: "Fetch",
        la: "Arcesse",
        zh: "获取",
    },
    "Fetch cancelled by user.": {
        def: "Fetch cancelled.",
        la: "Arcessitio abrogata est.",
        zh: "已取消获取。",
    },
    "Fetch chunks on demand": {
        def: "Fetch chunks on demand",
        la: "Arcesse fragmenta ad postulatum",
        zh: "按需获取块",
    },
    "Fetch database with previous behaviour": {
        def: "Fetch database with previous behaviour",
        la: "Arcesse repositorium modo priore",
        zh: "使用以前的行为获取数据库",
    },
    "Fetch exited by user.": {
        def: "Fetch exited.",
        la: "Ab arcessitione discessum est.",
        zh: "已退出获取。",
    },
    "Fetch initialisation cancelled by user.": {
        def: "Fetch set-up cancelled.",
        la: "Praeparatio arcessitionis abrogata est.",
        zh: "已取消获取前的准备。",
    },
    "File ${path} seems to be corrupted! Writing prevented. (${docRead.size} != ${reflectedContent.size})": {
        def: "${path} seems to be corrupted; it was not written (${docRead.size} != ${reflectedContent.size})",
        la: "Plica ${path} corrupta esse videtur; scriptura prohibita est (${docRead.size} != ${reflectedContent.size})",
        zh: "文件 ${path} 似乎已损坏，已阻止写入（${docRead.size} != ${reflectedContent.size}）",
    },
    "File integrity": {
        def: "File integrity",
        la: "Integritas plicarum",
        zh: "文件完整性",
    },
    "File to resolve conflict": {
        def: "File to resolve conflict",
        la: "Plica cuius discrepantia resolvenda est",
        zh: "选择要解决冲突的文件",
    },
    "File to view History": {
        def: "File to view History",
        la: "Plica cuius historia inspicienda est",
        zh: "要查看历史记录的文件",
    },
    Filename: {
        def: "Filename",
        la: "Nomen plicae",
        zh: "文件名",
    },
    "Final Confirmation: Overwrite Server Data with This Device's Files": {
        def: "Final Confirmation: Overwrite Server Data with This Device's Files",
        la: "Confirmatio ultima: data ministratoris plicis huius instrumenti superscribe",
        zh: "最终确认：用本设备的文件覆盖服务器数据",
    },
    "Finalise the process and resume normal operation": {
        def: "Finalise the process and resume normal operation",
        la: "Processum perfice et operationem ordinariam resume",
        zh: "完成流程并恢复正常运行",
    },
    Fix: {
        def: "Fix",
        la: "Corrige",
        zh: "修复",
    },
    "Forces the file to be synced when opened.": {
        def: "Forces the file to be synced when opened.",
        la: "Plicam synchronizari cogit cum aperitur.",
        zh: "打开文件时强制同步该文件 ",
    },
    "Found compromised chunks : ${localCompromised} in local, ${remoteCompromised} in remote": {
        def: "Compromised chunks found: ${localCompromised} on this device, ${remoteCompromised} on the server.",
        la: "Fragmenta corrupta inventa: ${localCompromised} in hoc instrumento, ${remoteCompromised} in ministratore.",
        zh: "发现受损的数据块：此设备 ${localCompromised} 个，服务器 ${remoteCompromised} 个。",
    },
    "From:": {
        def: "From:",
        la: "Ab:",
        zh: "来自：",
    },
    "Furthermore, if conflicts are already present in the server data, they will be synchronised to this device as they are, and you will need to resolve them locally.":
        {
            def: "Furthermore, if conflicts are already present in the server data, they will be synchronised to this device as they are, and you will need to resolve them locally.",
            la: "Praeterea, si discrepantiae iam in datis ministratoris adsunt, ad hoc instrumentum ut sunt synchronizabuntur, et eas localiter resolvere debebis.",
            zh: "此外，如果服务器数据中已存在冲突，它们会原样同步到本设备，你需要在本设备上解决。",
        },
    "Gathering information...": {
        def: "Gathering information...",
        la: "Informationes colliguntur...",
        zh: "正在收集信息…",
    },
    "Generate full report for opening the issue with debug info": {
        def: "Generate full report for opening the issue with debug info",
        la: "Genera relationem plenam cum indiciis ad quaestionem aperiendam",
        zh: "生成含调试信息的完整报告（用于提交问题）",
    },
    "Handle files as Case-Sensitive": {
        def: "Handle files as Case-Sensitive",
        la: "Tracta plicas litterarum magnitudinem discernendo",
        zh: "将文件视为区分大小写",
    },
    "Have you created a backup before proceeding?": {
        def: "Have you created a backup before proceeding?",
        la: "Creavistine exemplar tutelare antequam pergas?",
        zh: "继续之前，你备份了吗？",
    },
    Hide: {
        def: "Hide",
        la: "Cela",
        zh: "隐藏",
    },
    "Highlight diff": {
        def: "Highlight diff",
        la: "Illustra differentias",
        zh: "高亮差异",
    },
    "How should files that were deleted on other devices be handled?\n\n- **${NEWER_CLEANUP}**: Delete local files if they were deleted on remote.\n  This is useful if you want to keep your vault clean and consistent across devices, but please make sure you have a backup if there is already any important data in your vault.\n- **${NEWER_SYNC_ALL}**: Recreate remote files even if they were deleted on remote.\n  This option will keep all your local files, but it may cause duplicates if there are files that exist on local but not on remote. You can clean up these duplicates manually after the synchronisation.":
        {
            def: "How should files that were deleted on other devices be handled?\n\n- **${NEWER_CLEANUP}**: Delete local files if they were deleted on remote.\n  This is useful if you want to keep your vault clean and consistent across devices, but please make sure you have a backup if there is already any important data in your vault.\n- **${NEWER_SYNC_ALL}**: Recreate remote files even if they were deleted on remote.\n  This option will keep all your local files, but it may cause duplicates if there are files that exist on local but not on remote. You can clean up these duplicates manually after the synchronisation.",
            la: "Quomodo tractandae sunt plicae quae in aliis instrumentis deletae sunt?\n\n- **${NEWER_CLEANUP}**: Dele plicas locales si in remoto deletae sunt.\n  Hoc utile est si tabularium tuum mundum et constans per instrumenta servare vis, sed cura ut exemplar tutelare habeas si iam data magni momenti in tabulario tuo sunt.\n- **${NEWER_SYNC_ALL}**: Plicas remotas recrea etiamsi in remoto deletae sunt.\n  Haec optio omnes plicas tuas locales servabit, sed duplicata efficere potest si plicae localiter sed non remote exstant. Haec duplicata post synchronizationem manu purgare potes.",
            zh: "应如何处理在其他设备上已删除的文件？\n\n- **${NEWER_CLEANUP}**：如果文件在远程已删除，则删除本地文件。\n  如果你希望笔记库在各设备之间保持整洁一致，此选项很有用；但如果笔记库中已有重要数据，请确保已做好备份。\n- **${NEWER_SYNC_ALL}**：即使文件在远程已删除，也重新创建远程文件。\n  此选项会保留所有本地文件，但如果有文件只存在于本地而不在远程，可能会产生重复。同步完成后可以手动清理这些重复文件。",
        },
    "How to display network errors when the sync server is unreachable.": {
        def: "How to display network errors when the sync server is unreachable.",
        la: "Quomodo errores retis ostendantur cum ministrator synchronizationis attingi non potest.",
        zh: "当同步服务器不可达时，如何显示网络错误。",
    },
    "How to handle extra existing local files?": {
        def: "How to handle extra existing local files?",
        la: "Quomodo tractandae sunt plicae locales quae supersunt?",
        zh: "如何处理本地多出的已有文件？",
    },
    "I am unable to create a backup of my Vault.": {
        def: "I am unable to create a backup of my Vault.",
        la: "Exemplar tutelare tabularii mei creare non possum.",
        zh: "我无法备份我的库。",
    },
    "I am unable to create a backup of my Vaults.": {
        def: "I am unable to create a backup of my Vaults.",
        la: "Exemplar tutelare tabulariorum meorum creare non possum.",
        zh: "我无法备份我的库。",
    },
    "I have created a backup of my Vault.": {
        def: "I have created a backup of my Vault.",
        la: "Exemplar tutelare tabularii mei creavi.",
        zh: "我已备份我的库。",
    },
    "I understand that all changes made on other smartphones or computers possibly could be lost.": {
        def: "I understand that all changes made on other smartphones or computers possibly could be lost.",
        la: "Intellego omnes mutationes in aliis telephonis callidis vel computatris factas fortasse amitti posse.",
        zh: "我明白在其他手机或电脑上所做的更改可能会丢失。",
    },
    "I understand that other devices will no longer be able to synchronise, and will need to be reset the synchronisation information.":
        {
            def: "I understand that other devices will no longer be able to synchronise, and will need to be reset the synchronisation information.",
            la: "Intellego alia instrumenta iam synchronizare non posse et informationes synchronizationis eorum restituendas esse.",
            zh: "我明白其他设备将无法继续同步，需要重置同步信息。",
        },
    "I understand that this action is irreversible once performed.": {
        def: "I understand that this action is irreversible once performed.",
        la: "Intellego hanc actionem, semel peractam, irrevocabilem esse.",
        zh: "我明白此操作一旦执行便不可撤销。",
    },
    "I understand the risks and will proceed without a backup.": {
        def: "I understand the risks and will proceed without a backup.",
        la: "Pericula intellego et sine exemplari tutelari pergam.",
        zh: "我明白风险，将在没有备份的情况下继续。",
    },
    "I Understand, Overwrite Server": {
        def: "I Understand, Overwrite Server",
        la: "Intellego, superscribe ministratorem",
        zh: "我明白，覆盖服务器",
    },
    "If disabled(toggled), chunks will be split on the UI thread (Previous behaviour).": {
        def: "If disabled(toggled), chunks will be split on the UI thread (Previous behaviour).",
        la: "Si deactivatum est, fragmenta in filo UI dividentur (modus prior).",
        zh: "如果禁用(切换),chunks 将在 UI 线程上分割(以前的行为)",
    },
    "If enabled per-filed efficient customization sync will be used. We need a small migration when enabling this. And all devices should be updated to v0.23.18. Once we enabled this, we lost a compatibility with old versions.":
        {
            def: "If enabled per-filed efficient customization sync will be used. We need a small migration when enabling this. And all devices should be updated to v0.23.18. Once we enabled this, we lost a compatibility with old versions.",
            la: "Si activum est, synchronizatio optionum propriarum efficax per singulas plicas adhibebitur. Cum hoc activatur, parva migratio requiritur. Et omnia instrumenta ad v0.23.18 renovanda sunt. Hoc activato, compatibilitatem cum versionibus veteribus amisimus.",
            zh: "如果启用,将使用基于文件的、高效的自定义同步。启用此功能需要进行一次小的迁移。所有设备都应更新到 v0.23.18。一旦启用此功能,我们将失去与旧版本的兼容性",
        },
    "If enabled, chunks will be split into no more than 100 items. However, dedupe is slightly weaker.": {
        def: "If enabled, chunks will be split into no more than 100 items. However, dedupe is slightly weaker.",
        la: "Si activum est, fragmenta in non plures quam 100 res dividentur. Attamen deduplicatio paulo debilior est.",
        zh: "如果启用,数据块将被分割成不超过 100 项。但是,去重效果会稍弱",
    },
    "If enabled, newly created chunks are temporarily kept within the document, and graduated to become independent chunks once stabilised.":
        {
            def: "If enabled, newly created chunks are temporarily kept within the document, and graduated to become independent chunks once stabilised.",
            la: "Si activum est, fragmenta nuper creata ad tempus intra documentum servantur et, cum stabilita sunt, in fragmenta independentia promoventur.",
            zh: "如果启用,新创建的数据块将暂时保留在文档中,并在稳定后成为独立数据块",
        },
    "If enabled, the ⛔ icon will be shown inside the status instead of the file warnings banner. No details will be shown.":
        {
            def: "If enabled, a SKIP marker will be shown inside the status instead of the file warnings banner. No details will be shown.",
            la: "Si activa est, nota SKIP intra statum monstrabitur loco vexilli monitorum plicarum. Nulla singula monstrabuntur.",
            zh: "启用后，将在状态中显示 SKIP 标记，而不是文件警告横幅。不会显示详细信息。",
        },
    "If enabled, the file under 1kb will be processed in the UI thread.": {
        def: "If enabled, the file under 1kb will be processed in the UI thread.",
        la: "Si activum est, plicae infra 1kb in filo UI tractabuntur.",
        zh: "如果启用,小于 1kb 的文件将在 UI 线程中处理",
    },
    "If enabled, the notification of hidden files change will be suppressed.": {
        def: "If enabled, the notification of hidden files change will be suppressed.",
        la: "Si activum est, notificatio de mutationibus plicarum occultarum supprimetur.",
        zh: "如果启用,将不再通知隐藏文件被更改",
    },
    "If this enabled, All files are handled as case-Sensitive (Previous behaviour).": {
        def: "If this enabled, All files are handled as case-Sensitive (Previous behaviour).",
        la: "Si hoc activum est, omnes plicae litterarum magnitudinem discernendo tractantur (modus prior).",
        zh: "如果启用,所有文件都将视为区分大小写(以前的行为)",
    },
    "If this enabled, chunks will be split into semantically meaningful segments. Not all platforms support this feature.":
        {
            def: "If this enabled, chunks will be split into semantically meaningful segments. Not all platforms support this feature.",
            la: "Si hoc activum est, fragmenta in segmenta significatione praedita dividentur. Non omnia systemata hanc facultatem sustinent.",
            zh: "如果启用此功能,数据块将被分割成具有语义意义的段落。并非所有平台都支持此功能",
        },
    "If this is set, changes to local files which are matched by the ignore files will be skipped. Remote changes are determined using local ignore files.":
        {
            def: "If this is set, changes to local files which are matched by the ignore files will be skipped. Remote changes are determined using local ignore files.",
            la: "Si hoc constituitur, mutationes plicarum localium quae plicis ignorandis congruunt praetermittentur. Mutationes remotae per plicas ignorandas locales determinantur.",
            zh: "如果设置了此项,与忽略文件匹配的本地文件的更改将被跳过。远程更改使用本地忽略文件确定",
        },
    "If this option is enabled, PouchDB will hold the connection open for 60 seconds, and if no change arrives in that time, close and reopen the socket, instead of holding it open indefinitely. Useful when a proxy limits request duration but can increase resource usage.":
        {
            def: "If this option is enabled, PouchDB will hold the connection open for 60 seconds, and if no change arrives in that time, close and reopen the socket, instead of holding it open indefinitely. Useful when a proxy limits request duration but can increase resource usage.",
            la: "Si haec optio activa est, PouchDB conexionem per 60 secundas apertam tenebit et, si nulla mutatio eo tempore advenit, foramen claudet et iterum aperiet, pro eo sine fine aperto tenendo. Utile cum procurator durationem petitionum limitat, sed usum facultatum augere potest.",
            zh: "如果启用此选项,PouchDB 将保持连接打开 60 秒,如果在此时间内没有更改到达,则关闭并重新打开套接字,而不是无限期保持打开。当代理限制请求持续时间时有用,但可能会增加资源使用ß",
        },
    "If you have unsynchronised changes in your Vault on this device, they will likely diverge from the server's versions after the reset. This may result in a large number of file conflicts.":
        {
            def: "If you have unsynchronised changes in your Vault on this device, they will likely diverge from the server's versions after the reset. This may result in a large number of file conflicts.",
            la: "Si mutationes non synchronizatas in tabulario tuo in hoc instrumento habes, post restitutionem verisimiliter a versionibus ministratoris discedent. Hoc magnum numerum discrepantiarum plicarum efficere potest.",
            zh: "如果本设备的库中有未同步的更改，重置后它们很可能与服务器上的版本产生分歧。这可能导致大量文件冲突。",
        },
    "If you understand the risks and still wish to proceed, select so.": {
        def: "If you understand the risks and still wish to proceed, select so.",
        la: "Si pericula intellegis et tamen pergere vis, hoc elige.",
        zh: "如果你明白风险但仍希望继续，请选择此项。",
    },
    Ignore: {
        def: "Ignore",
        la: "Ignora",
        zh: "忽略",
    },
    "Ignore files": {
        def: "Ignore files",
        la: "Plicae ignorandae",
        zh: "忽略文件",
    },
    "Ignore patterns": {
        def: "Ignore patterns",
        la: "Exemplaria ignoranda",
        zh: "忽略模式",
    },
    "Important Notice": {
        def: "Important Notice",
        la: "Nuntius gravis",
        zh: "重要通知",
    },
    "In this scenario, Self-hosted LiveSync will recreate metadata for every file and deliberately generate conflicts. Where the file content is identical, these conflicts will be resolved automatically.":
        {
            def: "In this scenario, Tabularium will recreate metadata for every file and deliberately generate conflicts. Where the file content is identical, these conflicts will be resolved automatically.",
            la: "Hoc in casu, Tabularium metadata omnium plicarum recreabit et consulto discrepantias generabit. Ubi contentum plicae idem est, hae discrepantiae automatice resolventur.",
            zh: "在此情形下，Tabularium 会为每个文件重建元数据并有意制造冲突。若文件内容完全相同，这些冲突将被自动解决。",
        },
    "Incoming:": {
        def: "Incoming:",
        la: "Advenientia:",
        zh: "接收：",
    },
    "Incubate Chunks in Document": {
        def: "Incubate Chunks in Document",
        la: "Fove fragmenta in documento",
        zh: "在文档中孵化块",
    },
    "Info:": {
        def: "Info:",
        la: "Informatio:",
        zh: "信息：",
    },
    "Initialize done!": {
        def: "Initialisation complete",
        la: "Initium paratum est",
        zh: "初始化完成",
    },
    Initializing: {
        def: "Initialising",
        la: "Initium paratur",
        zh: "正在初始化",
    },
    "Interval (sec)": {
        def: "Interval (sec)",
        la: "Intervallum (sec)",
        zh: "间隔(秒)",
    },
    "It is strongly advised to create a backup before proceeding. Continuing without a backup may lead to data loss.": {
        def: "It is strongly advised to create a backup before proceeding. Continuing without a backup may lead to data loss.",
        la: "Valde suadetur ut exemplar tutelare crees antequam pergas. Sine exemplari tutelari pergere ad datorum amissionem ducere potest.",
        zh: "强烈建议在继续之前先做备份。没有备份继续可能导致数据丢失。",
    },
    "JWT Algorithm": {
        def: "JWT Algorithm",
        la: "Algorithmus JWT",
        zh: "JWT 算法",
    },
    "K.exp": {
        def: "Experimental",
        la: "Experimentale",
        zh: "实验性",
    },
    "K.long_p2p_sync": {
        def: "Peer-to-Peer Sync",
        la: "Synchronizatio inter pares",
        zh: "Peer-to-Peer同步 (实验性)",
    },
    "K.P2P": {
        def: "Peer-to-Peer",
        la: "Par ad Par",
        zh: "Peer-to-Peer",
    },
    "K.Peer": {
        def: "Peer",
        la: "Par",
        zh: "Peer",
    },
    "K.ScanCustomization": {
        def: "Scan customization",
        la: "Perlustra optiones proprias",
        zh: "扫描自定义",
    },
    "K.short_p2p_sync": {
        def: "P2P Sync",
        la: "Synchronizatio P2P",
        zh: "P2P同步(实验性)",
    },
    "K.title_p2p_sync": {
        def: "Peer-to-Peer Sync",
        la: "Synchronizatio inter pares",
        zh: "Peer-to-Peer同步",
    },
    "Keep empty folder": {
        def: "Keep empty folder",
        la: "Serva thecam vacuam",
        zh: "保留空文件夹",
    },
    "Keep local files even if deleted on remote": {
        def: "Keep local files even if deleted on remote",
        la: "Serva plicas locales etiamsi in remoto deletae sunt",
        zh: "即使远程已删除也保留本地文件",
    },
    "Keep local files even if not on remote": {
        def: "Keep local files even if not on remote",
        la: "Serva plicas locales etiamsi in remoto non sunt",
        zh: "即使远程不存在也保留本地文件",
    },
    "lang-auto": {
        def: "Default (follow Obsidian)",
        la: "Praedefinitum (Obsidian sequere)",
        zh: "默认（跟随 Obsidian）",
    },
    "lang-def": {
        def: "%{lang_def}",
        la: "%{lang_def}",
        zh: "%{lang_def}",
    },
    "lang-la": {
        def: "Latina",
        la: "Latina",
        zh: "Latina",
    },
    "lang-zh": {
        def: "中文",
        la: "中文",
        zh: "中文",
    },
    Later: {
        def: "Later",
        la: "Postea",
        zh: "稍后",
    },
    "Legacy remote configuration has been migrated to the remote configuration list.": {
        def: "The old server configuration has been moved to the server configuration list.",
        la: "Configuratio vetus ministratoris in indicem configurationum ministratoris translata est.",
        zh: "旧的服务器配置已迁移到服务器配置列表。",
    },
    live: {
        def: "live",
        la: "continua",
        zh: "实时",
    },
    "LiveSync could not handle multiple vaults which have same name without different prefix, This should be automatically configured.":
        {
            def: "Tabularium could not handle multiple vaults which have same name without different prefix, This should be automatically configured.",
            la: "Tabularium plura tabularia eodem nomine sine praefixo diverso tractare non potuit. Hoc automatice configurari debet.",
            zh: "Tabularium 无法处理具有相同名称但没有不同前缀的多个库。这应该自动配置",
        },
    "liveSyncReplicator.beforeLiveSync": {
        def: "Before live sync, run a one-shot sync once...",
        la: "Ante synchronizationem vivam semel synchronizationem singularem incipe...",
        zh: "实时同步前，先执行一次单次同步...",
    },
    "liveSyncReplicator.cantReplicateLowerValue": {
        def: "We can't replicate more lower value.",
        la: "Valorem minorem replicare non possumus.",
        zh: "我们无法复制更小的值",
    },
    "liveSyncReplicator.checkingLastSyncPoint": {
        def: "Looking for the point last synchronized point.",
        la: "Punctum ultimae synchronizationis quaeritur.",
        zh: "查找上次同步点",
    },
    "liveSyncReplicator.couldNotConnectTo": {
        def: "Could not connect to ${uri} : ${name}\n(${db})",
        la: "Ad ${uri} conecti non potuit : ${name}\n(${db})",
        zh: "无法连接到 ${uri} : ${name}\n(${db})",
    },
    "liveSyncReplicator.couldNotConnectToRemoteDb": {
        def: "Could not connect to remote database: ${d}",
        la: "Ad repositorium remotum conecti non potuit: ${d}",
        zh: "无法连接到远程数据库：${d}",
    },
    "liveSyncReplicator.couldNotConnectToServer": {
        def: "The connection to the remote has been prevented, or failed.",
        la: "Conexio ad remotum impedita est aut defecit.",
        zh: "无法连接到服务器",
    },
    "liveSyncReplicator.couldNotConnectToURI": {
        def: "Could not connect to ${uri}:${dbRet}",
        la: "Ad ${uri} conecti non potuit:${dbRet}",
        zh: "无法连接到 ${uri}:${dbRet}",
    },
    "liveSyncReplicator.couldNotMarkResolveRemoteDb": {
        def: "Could not mark resolve remote database.",
        la: "Repositorium remotum ut resolutum notari non potuit.",
        zh: "无法标记并解决远程数据库",
    },
    "liveSyncReplicator.liveSyncBegin": {
        def: "Live sync started...",
        la: "Synchronizatio viva incipit...",
        zh: "实时同步开始...",
    },
    "liveSyncReplicator.lockRemoteDb": {
        def: "Lock remote database to prevent data corruption",
        la: "Obsera repositorium remotum ne data corrumpantur",
        zh: "锁定远程数据库以防止数据损坏",
    },
    "liveSyncReplicator.markDeviceResolved": {
        def: "Mark this device as 'resolved'.",
        la: "Nota hoc instrumentum ut “resolutum”.",
        zh: "将此设备标记为“已解决”",
    },
    "liveSyncReplicator.mismatchedTweakDetected": {
        def: "Some mismatches have been detected in the configuration between devices. Running a manual replication will attempt to resolve this issue.",
        la: "Aliquae discrepantiae in configuratione inter instrumenta detectae sunt. Replicatio manualis hanc rem resolvere conabitur.",
        zh: "检测到设备之间的配置存在不一致。执行一次手动复制将尝试解决此问题。",
    },
    "liveSyncReplicator.oneShotSyncBegin": {
        def: "OneShot Sync begin... (${syncMode})",
        la: "Synchronizatio OneShot incipit... (${syncMode})",
        zh: "OneShot同步开始...(${syncMode})",
    },
    "liveSyncReplicator.remoteDbCorrupted": {
        def: "Remote database is newer or corrupted, make sure to latest version of Tabularium installed",
        la: "Repositorium remotum recentius aut corruptum est; cura ut versio novissima Tabularii installata sit",
        zh: "远程数据库较新或已损坏,请确保已安装最新版本的 Tabularium",
    },
    "liveSyncReplicator.remoteDbCreatedOrConnected": {
        def: "Remote Database Created or Connected",
        la: "Repositorium remotum creatum vel conexum",
        zh: "远程数据库已创建或连接",
    },
    "liveSyncReplicator.remoteDbDestroyed": {
        def: "Remote Database Destroyed",
        la: "Repositorium remotum deletum",
        zh: "远程数据库已销毁",
    },
    "liveSyncReplicator.remoteDbDestroyError": {
        def: "Something happened on Remote Database Destroy:",
        la: "Aliquid accidit in deletione repositorii remoti:",
        zh: "远程数据库销毁时发生错误：",
    },
    "liveSyncReplicator.remoteDbMarkedResolved": {
        def: "Remote database has been marked resolved.",
        la: "Repositorium remotum ut resolutum notatum est.",
        zh: "远程数据库已标记为已解决",
    },
    "liveSyncReplicator.replicationClosed": {
        def: "Replication closed",
        la: "Replicatio clausa",
        zh: "同步已关闭",
    },
    "liveSyncReplicator.replicationInProgress": {
        def: "Replication is already in progress",
        la: "Replicatio iam in cursu est",
        zh: "同步正在进行中",
    },
    "liveSyncReplicator.retryLowerBatchSize": {
        def: "Retry with lower batch size:${batch_size}/${batches_limit}",
        la: "Iterum conare cum minore magnitudine acervi:${batch_size}/${batches_limit}",
        zh: "使用更小的批量大小重试：${batch_size}/${batches_limit}",
    },
    "liveSyncReplicator.unlockRemoteDb": {
        def: "Unlock remote database to prevent data corruption",
        la: "Resera repositorium remotum ne data corrumpantur",
        zh: "解锁远程数据库以防止数据损坏",
    },
    "Loading old revisions...": {
        def: "Loading old revisions...",
        la: "Recensiones veteres onerantur...",
        zh: "正在加载旧版本...",
    },
    "local -> remote: Done": {
        def: "This device → server: done",
        la: "Hoc instrumentum → ministrator: factum",
        zh: "此设备 → 服务器：完成",
    },
    "Local chunk backed up: new:${total.ok} ,exist:${total.exist}, error:${total.error}": {
        def: "Chunks on this device backed up: new ${total.ok}, existing ${total.exist}, errors ${total.error}",
        la: "Fragmenta huius instrumenti servata: nova ${total.ok}, iam exstantia ${total.exist}, errores ${total.error}",
        zh: "此设备的数据块已备份：新增 ${total.ok}，已存在 ${total.exist}，错误 ${total.error}",
    },
    "Local Database could not be reinitialised after reset.": {
        def: "This device's database could not be initialised again after the reset.",
        la: "Repositorium huius instrumenti post restitutionem denuo initiari non potuit.",
        zh: "重置后无法重新初始化此设备的数据库。",
    },
    "Local Database Reset": {
        def: "Reset this device's database",
        la: "Repositorium huius instrumenti restituitur",
        zh: "重置此设备的数据库",
    },
    Lock: {
        def: "Lock",
        la: "Obsera",
        zh: "锁定",
    },
    "logPane.autoScroll": {
        def: "Auto scroll",
        la: "Volutatio automatica",
        zh: "自动滚动",
    },
    "logPane.logWindowOpened": {
        def: "Log window opened",
        la: "Fenestra actorum aperta",
        zh: "日志窗口已打开",
    },
    "logPane.pause": {
        def: "Pause",
        la: "Intermitte",
        zh: "暂停",
    },
    "logPane.title": {
        def: "Tabularium Log",
        la: "Acta Tabularii",
        zh: "Tabularium 日志",
    },
    "logPane.wrap": {
        def: "Wrap",
        la: "Involve",
        zh: "自动换行",
    },
    "Maximum delay for batch database updating": {
        def: "Maximum delay for batch database updating",
        la: "Maxima mora renovationis repositorii acervatim",
        zh: "批量数据库更新的最大延迟",
    },
    "Maximum file size": {
        def: "Maximum file size",
        la: "Maxima magnitudo plicae",
        zh: "最大文件大小",
    },
    "Maximum Incubating Chunk Size": {
        def: "Maximum Incubating Chunk Size",
        la: "Maxima magnitudo fragmenti fovendi",
        zh: "最大孵化块大小",
    },
    "Maximum Incubating Chunks": {
        def: "Maximum Incubating Chunks",
        la: "Maximus numerus fragmentorum fovendorum",
        zh: "最大孵化块数",
    },
    "Maximum Incubation Period": {
        def: "Maximum Incubation Period",
        la: "Maximum tempus fotus",
        zh: "最大孵化期",
    },
    "MB (0 to disable).": {
        def: "MB (0 to disable).",
        la: "MB (0 ad deactivandum).",
        zh: "MB(0为禁用)",
    },
    "Memory cache": {
        def: "Memory cache",
        la: "Memoria temporaria",
        zh: "内存缓存",
    },
    "Memory cache size (by total characters)": {
        def: "Memory cache size (by total characters)",
        la: "Magnitudo memoriae temporariae (secundum characteres omnes)",
        zh: "内存缓存大小(按总字符数)",
    },
    "Memory cache size (by total items)": {
        def: "Memory cache size (by total items)",
        la: "Magnitudo memoriae temporariae (secundum res omnes)",
        zh: "内存缓存大小(按总项目数)",
    },
    Merge: {
        def: "Merge",
        la: "Confla",
        zh: "合并",
    },
    "Merge: Something went wrong: ${filename}, (${String(toDelete)})": {
        def: "Merge failed: ${filename} (${String(toDelete)})",
        la: "Coniunctio defecit: ${filename} (${String(toDelete)})",
        zh: "合并失败：${filename}（${String(toDelete)}）",
    },
    "Merge: Something went wrong: ${filename}, (${toDelete})": {
        def: "Merge failed: ${filename} (${toDelete})",
        la: "Coniunctio defecit: ${filename} (${toDelete})",
        zh: "合并失败：${filename}（${toDelete}）",
    },
    "Merged content cannot be stored:${path}": {
        def: "Merged content could not be stored: ${path}",
        la: "Contentum coniunctum servari non potuit: ${path}",
        zh: "无法保存合并后的内容：${path}",
    },
    "Minimum delay for batch database updating": {
        def: "Minimum delay for batch database updating",
        la: "Minima mora renovationis repositorii acervatim",
        zh: "批量数据库更新的最小延迟",
    },
    "Minimum interval for syncing": {
        def: "Minimum interval for syncing",
        la: "Minimum intervallum synchronizationis",
        zh: "同步最小间隔",
    },
    "Missing document content!, could not read ${dispFilename}(${meta._id.substring(0, 8)}) from database.": {
        def: "Document content is missing; could not read ${dispFilename} (${meta._id.substring(0, 8)}) from the database.",
        la: "Contentum documenti deest; ${dispFilename} (${meta._id.substring(0, 8)}) ex repositorio legi non potuit.",
        zh: "文档内容缺失，无法从数据库读取 ${dispFilename}（${meta._id.substring(0, 8)}）。",
    },
    Mixed: {
        def: "Mixed",
        la: "Mixtum",
        zh: "混合",
    },
    Modified: {
        def: "Modified",
        la: "Mutatum",
        zh: "已修改",
    },
    "Modified: ${date}": {
        def: "Modified: ${date}",
        la: "Mutatum: ${date}",
        zh: "修改时间：${date}",
    },
    "moduleCheckRemoteSize.logCheckingStorageSizes": {
        def: "Checking storage sizes",
        la: "Magnitudines repositorii inspiciuntur",
        zh: "正在检查存储大小",
    },
    "moduleCheckRemoteSize.logCurrentStorageSize": {
        def: "Remote storage size: ${measuredSize}",
        la: "Magnitudo repositorii remoti: ${measuredSize}",
        zh: "远程存储大小：${measuredSize}",
    },
    "moduleCheckRemoteSize.logExceededWarning": {
        def: "Remote storage size: ${measuredSize} exceeded ${notifySize}",
        la: "Magnitudo repositorii remoti: ${measuredSize} excessit ${notifySize}",
        zh: "远程存储大小：${measuredSize} 超过 ${notifySize}",
    },
    "moduleCheckRemoteSize.logThresholdEnlarged": {
        def: "Threshold has been enlarged to ${size}MB",
        la: "Limen ad ${size}MB auctum est",
        zh: "阈值已扩大到 ${size}MB",
    },
    "moduleCheckRemoteSize.msgConfirmRebuild": {
        def: "This may take a bit of a long time. Do you really want to rebuild everything now?",
        la: "Hoc aliquantum temporis postulare potest. Visne vere omnia nunc reaedificare?",
        zh: "这可能需要一些时间。您真的想现在重建所有内容吗？",
    },
    "moduleCheckRemoteSize.msgDatabaseGrowing": {
        def: "**Your database is getting larger!** But do not worry, we can address it now. The time before running out of space on the remote storage.\n\n| Measured size | Configured size |\n| --- | --- |\n| ${estimatedSize} | ${maxSize} |\n\n> [!MORE]-\n> If you have been using it for many years, there may be unreferenced chunks - that is, garbage - accumulating in the database. Therefore, we recommend rebuilding everything. It will probably become much smaller.\n>\n> If the volume of your vault is simply increasing, it is better to rebuild everything after organizing the files. Tabularium does not delete the actual data even if you delete it to speed up the process. It is roughly [documented](https://github.com/vrtmrz/obsidian-livesync/blob/main/docs/tech_info.md).\n>\n> If you don't mind the increase, you can increase the notification limit by 100MB. This is the case if you are running it on your own server. However, it is better to rebuild everything from time to time.\n>\n\n> [!WARNING]\n> If you perform rebuild everything, make sure all devices are synchronised. The plug-in will merge as much as possible, though.\n",
        la: "**Repositorium tuum crescit!** Sed noli sollicitari, rem nunc tractare possumus. Tempus antequam spatium in repositorio remoto deficiat.\n\n| Magnitudo mensa | Magnitudo configurata |\n| --- | --- |\n| ${estimatedSize} | ${maxSize} |\n\n> [!MORE]-\n> Si eo per multos annos usus es, fragmenta sine relatione - id est, purgamenta - in repositorio cumulari possunt. Itaque omnia reaedificare suademus. Verisimiliter multo minus fiet.\n>\n> Si moles tabularii tui simpliciter crescit, melius est omnia reaedificare postquam plicas ordinaveris. Tabularium data ipsa non delet, etiam si ea deles, ut processus acceleretur. Hoc fere [documentatum est](https://github.com/vrtmrz/obsidian-livesync/blob/main/docs/tech_info.md).\n>\n> Si incrementum non curas, limitem notificationis 100MB augere potes. Hoc fit si in ministratore tuo proprio id curris. Attamen melius est omnia interdum reaedificare.\n>\n\n> [!WARNING]\n> Si omnia reaedificas, cura ut omnia instrumenta synchronizata sint. Additamentum tamen quam plurimum conflabit.\n",
        zh: "**您的数据库正在变大！** 但别担心,我们现在可以解决它。在远程存储空间用完之前还有时间。\n\n| 测量大小 | 配置大小 |\n| --- | --- |\n| ${estimatedSize} | ${maxSize} |\n\n> [!MORE]-\n> 如果您已经使用了很多年,数据库中可能会积累未引用的 chunks——也就是垃圾。因此,我们建议重建所有内容。它可能会变得小得多。\n>\n> 如果您的库容量只是在增加,最好在整理文件后重建所有内容。即使您为了加速过程删除了文件,Tabularium 也不会删除实际数据。这大致[有文档记录](https://github.com/vrtmrz/obsidian-livesync/blob/main/docs/tech_info.md)。\n>\n> 如果您不介意增加,可以将通知限制增加 100MB。如果您在自己的服务器上运行,就是这种情况。但是,最好还是不时地重建所有内容。\n>\n\n> [!WARNING]\n> 如果您执行重建所有内容,请确保所有设备都已同步。尽管如此,插件会尽可能地合并\n",
    },
    "moduleCheckRemoteSize.msgSetDBCapacity": {
        def: "We can set a maximum database capacity warning, **to take action before running out of space on the remote storage**.\nDo you want to enable this?\n\n> [!MORE]-\n> - 0: Do not warn about storage size.\n>   This is recommended if you have enough space on the remote storage especially you have self-hosted. And you can check the storage size and rebuild manually.\n> - 800: Warn if the remote storage size exceeds 800MB.\n>   This is recommended if you are using fly.io with 1GB limit or IBM Cloudant.\n> - 2000: Warn if the remote storage size exceeds 2GB.\n\nIf we have reached the limit, we will be asked to enlarge the limit step by step.\n",
        la: "Monitum de maxima capacitate repositorii constituere possumus, **ut agas antequam spatium in repositorio remoto deficiat**.\nVisne hoc activare?\n\n> [!MORE]-\n> - 0: Noli de magnitudine repositorii monere.\n>   Hoc suadetur si satis spatii in repositorio remoto habes, praesertim si ipse hospitaris. Et magnitudinem repositorii inspicere et manu reaedificare potes.\n> - 800: Mone si magnitudo repositorii remoti 800MB excedit.\n>   Hoc suadetur si fly.io cum limite 1GB vel IBM Cloudant uteris.\n> - 2000: Mone si magnitudo repositorii remoti 2GB excedit.\n\nSi limitem attigerimus, rogabimur ut limitem gradatim augeamus.\n",
        zh: "我们可以设置一个最大数据库容量警告,**以便在远程存储空间耗尽前采取行动**。\n您想启用这个功能吗?\n\n> [!MORE]-\n> - 0: 不警告存储大小。\n>   如果您在远程存储(尤其是自托管)上有足够的空间,则推荐此选项。您可以手动检查存储大小并重建。\n> - 800: 如果远程存储大小超过 800MB 则发出警告。\n>   如果您使用的是 fly.io(1GB 限制) 或 IBM Cloudant,则推荐此选项。\n> - 2000: 如果远程存储大小超过 2GB 则发出警告。\n\n如果达到限制,系统会要求我们逐步增大限制\n",
    },
    "moduleCheckRemoteSize.noticeExceeded": {
        def: "Remote storage size is ${measuredSize}, above the configured ${notifySize} notification threshold. {HERE}",
        la: "Magnitudo repositorii remoti est ${measuredSize}, supra limen notificationis configuratum ${notifySize}. {HERE}",
        zh: "远端存储体积为 ${measuredSize}，已超过配置的提醒阈值 ${notifySize}。{HERE}",
    },
    "moduleCheckRemoteSize.noticeNotConfigured": {
        def: "Remote storage size notifications are not configured. {HERE}",
        la: "Notificationes de magnitudine repositorii remoti non configuratae sunt. {HERE}",
        zh: "未配置远端存储体积提醒。{HERE}",
    },
    "moduleCheckRemoteSize.option2GB": {
        def: "2GB (Standard)",
        la: "2GB (Normale)",
        zh: "2GB (标准)",
    },
    "moduleCheckRemoteSize.option800MB": {
        def: "800MB (Cloudant, fly.io)",
        la: "800MB (Cloudant, fly.io)",
        zh: "800MB (Cloudant, fly.io)",
    },
    "moduleCheckRemoteSize.optionAskMeLater": {
        def: "Ask me later",
        la: "Roga me postea",
        zh: "稍后问我",
    },
    "moduleCheckRemoteSize.optionDismiss": {
        def: "Dismiss",
        la: "Dimitte",
        zh: "忽略",
    },
    "moduleCheckRemoteSize.optionIncreaseLimit": {
        def: "increase to ${newMax}MB",
        la: "auge ad ${newMax}MB",
        zh: "增加到 ${newMax}MB",
    },
    "moduleCheckRemoteSize.optionNoWarn": {
        def: "No, never warn please",
        la: "Minime, numquam mone, quaeso",
        zh: "不,请永远不要警告",
    },
    "moduleCheckRemoteSize.optionRebuildAll": {
        def: "Rebuild Everything Now",
        la: "Omnia nunc reaedifica",
        zh: "立即重建所有内容",
    },
    "moduleCheckRemoteSize.optionReview": {
        def: "Review options",
        la: "Optiones recense",
        zh: "查看选项",
    },
    "moduleCheckRemoteSize.titleDatabaseSizeLimitExceeded": {
        def: "Remote storage size exceeded the limit",
        la: "Magnitudo repositorii remoti limitem excessit",
        zh: "远程存储大小超出限制",
    },
    "moduleCheckRemoteSize.titleDatabaseSizeNotify": {
        def: "Setting up database size notification",
        la: "Notificatio de magnitudine repositorii constituitur",
        zh: "设置数据库大小通知",
    },
    "moduleInputUIObsidian.defaultTitleConfirmation": {
        def: "Confirmation",
        la: "Confirmatio",
        zh: "确认",
    },
    "moduleInputUIObsidian.defaultTitleSelect": {
        def: "Select",
        la: "Elige",
        zh: "选择",
    },
    "moduleInputUIObsidian.optionNo": {
        def: "No",
        la: "Non",
        zh: "否",
    },
    "moduleInputUIObsidian.optionYes": {
        def: "Yes",
        la: "Ita",
        zh: "是",
    },
    "moduleLiveSyncMain.logAdditionalSafetyScan": {
        def: "Additional safety scan...",
        la: "Perscrutatio securitatis addita...",
        zh: "额外的安全扫描...",
    },
    "moduleLiveSyncMain.logLoadingPlugin": {
        def: "Loading plugin...",
        la: "Additamentum oneratur...",
        zh: "正在加载插件...",
    },
    "moduleLiveSyncMain.logPluginInitCancelled": {
        def: "Plugin initialisation was cancelled by a module",
        la: "Initium additamenti a modulo abrogatum est",
        zh: "插件初始化被某个模块取消",
    },
    "moduleLiveSyncMain.logPluginVersion": {
        def: "Tabularium v${manifestVersion} ${packageVersion}",
        la: "Tabularium v${manifestVersion} ${packageVersion}",
        zh: "Tabularium v${manifestVersion} ${packageVersion}",
    },
    "moduleLiveSyncMain.logSafetyScanCompleted": {
        def: "Additional safety scan completed",
        la: "Perscrutatio securitatis addita perfecta",
        zh: "额外的安全扫描完成",
    },
    "moduleLiveSyncMain.logSafetyScanFailed": {
        def: "Additional safety scan has failed on a module",
        la: "Perscrutatio securitatis addita in modulo defecit",
        zh: "额外的安全扫描在某个模块上失败",
    },
    "moduleLiveSyncMain.logUnloadingPlugin": {
        def: "Unloading plugin...",
        la: "Additamentum exoneratur...",
        zh: "正在卸载插件...",
    },
    "moduleLiveSyncMain.msgScramEnabled": {
        def: "Tabularium has been configured to ignore some events. Is this correct?\n\n| Type | Status | Note |\n|:---:|:---:|---|\n| Storage Events | ${fileWatchingStatus} | Every modification will be ignored |\n| Database Events | ${parseReplicationStatus} | Every synchronised change will be postponed |\n\nDo you want to resume them and restart Obsidian?\n\n> [!DETAILS]-\n> These flags are set by the plug-in while rebuilding, or fetching. If the process ends abnormally, it may be kept unintended.\n> If you are not sure, you can try to rerun these processes. Make sure to back your vault up.\n",
        la: "Tabularium configuratum est ut aliquos eventus neglegat. Rectumne est?\n\n| Genus | Status | Nota |\n|:---:|:---:|---|\n| Eventus repositorii | ${fileWatchingStatus} | Omnis mutatio neglegetur |\n| Eventus repositorii datorum | ${parseReplicationStatus} | Omnis mutatio synchronizata differetur |\n\nVisne eos resumere et Obsidian iterum incipere?\n\n> [!DETAILS]-\n> Haec signa ab additamento ponuntur dum reaedificat vel arcessit. Si processus abnormiter finitur, praeter intentionem retineri possunt.\n> Si non certus es, hos processus iterum currere conari potes. Cura ut tabularium tuum ante servetur.\n",
        zh: "Tabularium 已被配置为忽略某些事件。这样对吗？\n\n| 类型 | 状态 | 说明 |\n|:---:|:---:|---|\n| 存储事件 | ${fileWatchingStatus} | 所有修改都将被忽略 |\n| 数据库事件 | ${parseReplicationStatus} | 所有同步的更改都将被推迟 |\n\n您想恢复它们并重启 Obsidian 吗？\n\n> [!DETAILS]-\n> 这些标志是在重建或获取时由插件设置的。如果过程异常结束,它们可能会被无意中保留。\n> 如果您不确定,可以尝试重新运行这些过程。请确保备份您的库。\n",
    },
    "moduleLiveSyncMain.optionKeepLiveSyncDisabled": {
        def: "Keep live sync disabled",
        la: "Retine synchronizationem vivam deactivatam",
        zh: "保持实时同步关闭",
    },
    "moduleLiveSyncMain.optionResumeAndRestart": {
        def: "Resume and restart Obsidian",
        la: "Resume et Obsidian iterum incipe",
        zh: "恢复并重启 Obsidian",
    },
    "moduleLiveSyncMain.titleScramEnabled": {
        def: "Scram Enabled",
        la: "Scram activum",
        zh: "紧急停止已启用",
    },
    "moduleLocalDatabase.logWaitingForReady": {
        def: "Waiting for ready...",
        la: "Exspectatur dum paratum sit...",
        zh: "等待就绪...",
    },
    "moduleLog.debugInfoCopied": {
        def: "Debug info copied to clipboard. You can paste it in the issue. Be careful as it may contain sensitive information, review it before sharing.",
        la: "Informationes ad vitia investiganda in tabellam exscriptae. Eas in quaestione inserere potes. Cave, nam informationes sensibiles continere possunt; eas ante communicationem inspice.",
        zh: "调试信息已复制到剪贴板，可以粘贴到 issue 中。其中可能包含敏感信息，分享前请仔细检查。",
    },
    "moduleLog.debugInfoTitle": {
        def: "Debug info",
        la: "Informationes ad vitia investiganda",
        zh: "调试信息",
    },
    "moduleLog.fileCaseConflict": {
        def: "There are multiple files with the same name (case-insensitive match)",
        la: "Plures plicae eodem nomine sunt (congruentia sine discrimine litterarum maiuscularum)",
        zh: "存在多个同名文件（不区分大小写）",
    },
    "moduleLog.fileIgnored": {
        def: "This file is ignored by the ignore rules",
        la: "Haec plica regulis neglegendi neglegitur",
        zh: "此文件被忽略规则排除",
    },
    "moduleLog.fileInvalidPath": {
        def: "This file has an invalid path under the current settings",
        la: "Haec plica viam invalidam sub optionibus praesentibus habet",
        zh: "在当前设置下，此文件的路径无效",
    },
    "moduleLog.fileNotSynchronised": {
        def: "Not synchronised: ${reasons}",
        la: "Non synchronizata: ${reasons}",
        zh: "未同步：${reasons}",
    },
    "moduleLog.filePlatformIncompatible": {
        def: "Some platforms may be unable to process this file correctly: ${platforms}",
        la: "Quaedam suggesta hanc plicam recte tractare fortasse non possunt: ${platforms}",
        zh: "部分平台可能无法正确处理此文件：${platforms}",
    },
    "moduleLog.fileTooLarge": {
        def: "This file size exceeds the configured limit",
        la: "Magnitudo huius plicae limitem configuratum excedit",
        zh: "此文件大小超出了配置的上限",
    },
    "moduleLog.fileWarning": {
        def: "Warning: ${reasons}",
        la: "Monitum: ${reasons}",
        zh: "警告：${reasons}",
    },
    "moduleLog.networkErrorIcon": {
        def: "Network ✗",
        la: "Rete ✗",
        zh: "网络 ✗",
    },
    "moduleLog.pathComponentTooLong": {
        def: "This path contains a file or folder name longer than ${maxBytes} UTF-8 bytes. It may not work on some Android and Linux file systems.",
        la: "Haec via nomen plicae vel thecae longius quam ${maxBytes} octetis UTF-8 continet. In aliquibus systematibus plicarum Android et Linux fortasse non funget.",
        zh: "此路径中包含超过 ${maxBytes} 个 UTF-8 字节的文件或文件夹名。在某些 Android 和 Linux 文件系统上可能无法正常工作。",
    },
    "moduleLog.restartScheduled": {
        def: "WARNING! RESTARTING OBSIDIAN IS SCHEDULED!",
        la: "MONITUM! OBSIDIAN ITERUM INCIPERE STATUTUM EST!",
        zh: "警告！已计划重启 Obsidian！",
    },
    "moduleLog.showLog": {
        def: "Show Log",
        la: "Monstra acta",
        zh: "显示日志",
    },
    "moduleLog.statusFastForwardCompared": {
        def: "Compared CouchDB feed entries",
        la: "Inscriptiones fluxus CouchDB comparatae",
        zh: "已比较的 CouchDB feed 条目",
    },
    "moduleLog.statusFileBatched": {
        def: "Files waiting for the batch delay",
        la: "Plicae moram acervi exspectantes",
        zh: "等待批处理延迟的文件",
    },
    "moduleLog.statusFilePending": {
        def: "Files waiting to be processed",
        la: "Plicae tractationem exspectantes",
        zh: "等待处理的文件",
    },
    "moduleLog.statusFileProcessing": {
        def: "Files being processed",
        la: "Plicae quae tractantur",
        zh: "正在处理的文件",
    },
    "moduleLog.statusQueueChunkInitial": {
        def: "Chunks being fetched",
        la: "Fragmenta quae arcessuntur",
        zh: "正在获取的块",
    },
    "moduleLog.statusQueueChunkRetrying": {
        def: "Chunks being fetched again",
        la: "Fragmenta quae iterum arcessuntur",
        zh: "正在重新获取的块",
    },
    "moduleLog.statusQueueConflicts": {
        def: "Conflicts waiting to be checked",
        la: "Discrepantiae inspectionem exspectantes",
        zh: "等待检查的冲突",
    },
    "moduleLog.statusQueueDatabase": {
        def: "Changes waiting to be written to the local database",
        la: "Mutationes in repositorium locale inscribendae",
        zh: "等待写入本地数据库的变更",
    },
    "moduleLog.statusQueueHiddenFiles": {
        def: "Hidden files waiting to be processed",
        la: "Plicae occultae tractationem exspectantes",
        zh: "等待处理的隐藏文件",
    },
    "moduleLog.statusQueuePluginScan": {
        def: "Plug-ins waiting to be scanned",
        la: "Additamenta perscrutationem exspectantia",
        zh: "等待扫描的插件",
    },
    "moduleLog.statusQueueReplication": {
        def: "Received changes waiting to be applied",
        la: "Mutationes acceptae applicationem exspectantes",
        zh: "等待应用的已接收变更",
    },
    "moduleLog.statusQueueStorage": {
        def: "Changes waiting to be written to the vault",
        la: "Mutationes in tabularium inscribendae",
        zh: "等待写入笔记库的变更",
    },
    "moduleLog.statusRemoteOperation": {
        def: "Remote operation in progress",
        la: "Operatio remota in progressu",
        zh: "远程操作进行中",
    },
    "moduleLog.statusRemoteRequests": {
        def: "Remote requests in progress",
        la: "Petitiones remotae in progressu",
        zh: "远程请求进行中",
    },
    "moduleLog.statusSyncPrefix": {
        def: "Sync:",
        la: "Synchronizatio:",
        zh: "同步：",
    },
    "moduleLog.syncStatusConnected": {
        def: "Synchronising",
        la: "Synchronizatur",
        zh: "正在同步",
    },
    "moduleLog.syncStatusErrored": {
        def: "Synchronisation error",
        la: "Error synchronizationis",
        zh: "同步出错",
    },
    "moduleLog.syncStatusFastForward": {
        def: "Checking the remote feed",
        la: "Fluxus remotus inspicitur",
        zh: "正在检查远程 feed",
    },
    "moduleLog.syncStatusJournalReceive": {
        def: "Receiving journal",
        la: "Diarium accipitur",
        zh: "正在接收日志",
    },
    "moduleLog.syncStatusJournalSend": {
        def: "Sending journal",
        la: "Diarium mittitur",
        zh: "正在发送日志",
    },
    "moduleLog.syncStatusPaused": {
        def: "Up to date, waiting for changes",
        la: "Recens, mutationes exspectans",
        zh: "已是最新，等待变更",
    },
    "moduleLog.syncStatusStarting": {
        def: "Connecting",
        la: "Conectitur",
        zh: "正在连接",
    },
    "moduleLog.syncStatusStopped": {
        def: "Not synchronising",
        la: "Non synchronizatur",
        zh: "未在同步",
    },
    "moduleMigration.fix0256.buttons.checkItLater": {
        def: "Check it later",
        la: "Postea inspice",
        zh: "稍后检查",
    },
    "moduleMigration.fix0256.buttons.DismissForever": {
        def: "I have fixed it, and do not ask again",
        la: "Correxi, et noli iterum rogare",
        zh: "我已经修复了，不再询问",
    },
    "moduleMigration.fix0256.buttons.fix": {
        def: "Fix",
        la: "Corrige",
        zh: "修复",
    },
    "moduleMigration.fix0256.message": {
        def: 'Some notes were not saved completely in the synchronisation data.\n\n**Can be fixed from this device:**\n\n${files}\n\nThese files on this device have the expected size, so they can be used to repair the synchronisation data. Choose "Fix" to repair them.\n\n${messageUnrecoverable}\n\nTo check again later: Settings, Tabularium, Maintenance, Find incomplete files.\n',
        la: "Aliqui commentarii in datis synchronizationis non integre servati sunt.\n\n**Ex hoc instrumento corrigi possunt:**\n\n${files}\n\nHae plicae in hoc instrumento magnitudinem exspectatam habent, itaque data synchronizationis reparare possunt. 'Corrige' elige.\n\n${messageUnrecoverable}\n\nUt postea iterum inspicias: Optiones, Tabularium, Cura, Plicas imperfectas quaerere.\n",
        zh: "部分笔记在同步数据中没有完整保存。\n\n**可以用这台设备修复：**\n\n${files}\n\n这些文件在本机的大小与预期一致，可以用来修复同步数据。点「修复」即可。\n\n${messageUnrecoverable}\n\n以后要再次检查：设置 → Tabularium → 维护 → 查找不完整的文件。\n",
    },
    "moduleMigration.fix0256.messageUnrecoverable": {
        def: "**Cannot be fixed from this device:**\n\n${filesNotRecoverable}\n\nIt is not clear which copy of these is correct. Check them on your other devices with the same maintenance action, or restore them from a backup.\n",
        la: "**Ex hoc instrumento corrigi non possunt:**\n\n${filesNotRecoverable}\n\nNon liquet quod exemplar horum rectum sit. In aliis instrumentis eadem cura inspice, vel ex exemplo tutelari restitue.\n",
        zh: "**无法用这台设备修复：**\n\n${filesNotRecoverable}\n\n无法确定这些文件的哪一份是正确的。请在其他设备上用同样的维护操作检查，或从备份恢复。\n",
    },
    "moduleMigration.fix0256.title": {
        def: "Incomplete notes found",
        la: "Commentarii imperfecti inventi",
        zh: "发现不完整的笔记",
    },
    "moduleMigration.insecureChunkExist.buttons.fetch": {
        def: "I already rebuilt the remote. Fetch from the remote",
        la: "Iam remotum reaedificavi. Arcesse ex remoto",
        zh: "我已经重建了远程数据库，将从远程获取",
    },
    "moduleMigration.insecureChunkExist.buttons.later": {
        def: "I will do it later",
        la: "Postea id faciam",
        zh: "我稍后再做",
    },
    "moduleMigration.insecureChunkExist.buttons.rebuild": {
        def: "Rebuild Everything",
        la: "Omnia reaedifica",
        zh: "重建所有内容",
    },
    "moduleMigration.insecureChunkExist.laterMessage": {
        def: "We strongly recommend to treat this as soon as possible!",
        la: "Vehementer suademus ut hoc quam primum tractetur!",
        zh: "我们强烈建议尽快处理此问题！",
    },
    "moduleMigration.insecureChunkExist.message": {
        def: "Some chunks are not securely stored and are not encrypted in databases.\n**Please rebuild the database to fix this issue**.\n\nIf your Remote Database is not configured with SSL, or using less-secure credentials, **you are at risk of exposing sensitive data**.\n\nNote: Please upgrade your Tabularium v0.25.6 or higher on all your devices, and back your vault up surely.\nNote2: Rebuild Everything and Fetch consumes a bit of time and traffic, please do it in off-peak hours and ensure a stable network connection.\n",
        la: "Aliqua fragmenta non tuto servata nec in repositoriis cryptata sunt.\n**Quaeso repositorium reaedifica ut hanc rem corrigas**.\n\nSi repositorium remotum tuum sine SSL configuratum est, vel testimoniis minus tutis utitur, **periculum est ne data sensibilia patefiant**.\n\nNota: Quaeso Tabularium ad v0.25.6 vel superiorem in omnibus instrumentis tuis renova, et tabularium tuum certe serva.\nNota 2: “Omnia reaedifica” et “Arcesse” aliquantum temporis et commeatus consumunt; quaeso fac horis minus frequentatis et cura conexionem retis stabilem.\n",
        zh: "一些块未安全存储，并且在数据库中未加密\n**请重建数据库以修复此问题**.\n\n如果你的远程数据库未配置 SSL，或者使用了不安全的凭据 **你可能面临暴露敏感数据的风险**.\n\n注意：请在所有设备上将 Tabularium 升级到 v0.25.6 或更高版本，并确保备份你的保险库\n\n注意2：重建所有内容和获取操作会消耗一些时间和流量，请在非高峰时段进行，并确保网络连接稳定\n",
    },
    "moduleMigration.insecureChunkExist.title": {
        def: "Insecure chunks found!",
        la: "Fragmenta non tuta inventa!",
        zh: "发现不安全的块！",
    },
    "moduleMigration.logBulkSendCorrupted": {
        def: "Send chunks in bulk has been enabled, however, this feature had been corrupted. Sorry for your inconvenience. Automatically disabled.",
        la: "Missio fragmentorum cumulata activata erat, sed haec facultas corrupta erat. Ignosce incommodo. Automatice deactivata est.",
        zh: "已启用批量发送 chunks,但此功能已损坏。给您带来不便,我们深表歉意。已自动禁用",
    },
    "moduleMigration.logLocalDatabaseNotReady": {
        def: "Something went wrong! The local database is not ready",
        la: "Aliquid erravit! Repositorium locale non paratum est",
        zh: "出错了！本地数据库尚未准备好",
    },
    "moduleObsidianMenu.replicate": {
        def: "Replicate",
        la: "Replica",
        zh: "复制",
    },
    "More actions": {
        def: "More actions",
        la: "Plures actiones",
        zh: "更多操作",
    },
    "Move remotely deleted files to the trash, instead of deleting.": {
        def: "Move remotely deleted files to the trash, instead of deleting.",
        la: "Plicas remote deletas in quisquilias move, pro eis delendis.",
        zh: "将远程删除的文件移至回收站,而不是直接删除",
    },
    Name: {
        def: "Name",
        la: "Nomen",
        zh: "名称",
    },
    "Network is offline": {
        def: "The network is offline",
        la: "Rete abest",
        zh: "网络已断开",
    },
    "Network warning style": {
        def: "Network warning style",
        la: "Modus monitorum retis",
        zh: "网络警告样式",
    },
    NEW: {
        def: "NEW",
        la: "NOVUM",
        zh: "新增",
    },
    Next: {
        def: "Next",
        la: "Sequens",
        zh: "下一步",
    },
    "No active replicator found": {
        def: "No synchronisation is set up",
        la: "Nulla synchronizatio constituta est",
        zh: "没有设置同步",
    },
    "No active replicator found when trying to reset remote database.": {
        def: "No active synchronisation connection was found while resetting the server's database.",
        la: "Dum repositorium ministratoris restituitur, nulla conexio synchronizationis activa inventa est.",
        zh: "重置服务器数据库时未找到活动的同步连接。",
    },
    "No data to save in ${dispFilename}!! This document may be corrupted in the local database! Please back it up immediately, and report an issue!":
        {
            def: "No data to save in ${dispFilename}. This document may be corrupted in this device's database. Back it up immediately and report the issue.",
            la: "In ${dispFilename} nulla data servanda sunt. Hoc documentum in repositorio huius instrumenti fortasse corruptum est. Statim exemplar tutum fac et rem nuntia.",
            zh: "${dispFilename} 中没有可保存的数据。此文档在此设备的数据库中可能已损坏。请立即备份，并报告此问题。",
        },
    "No passphrase found for data.json! Verify configuration before syncing.": {
        def: "No passphrase found for data.json. Check the configuration before synchronising.",
        la: "Nulla tessera arcana pro data.json inventa est. Ante synchronizationem configurationem inspice.",
        zh: "未找到 data.json 的密码短语。同步前请检查配置。",
    },
    "No unreferenced chunks! ${info.db_name}": {
        def: "No unreferenced chunks in ${info.db_name}.",
        la: "Nulla fragmenta non relata in ${info.db_name}.",
        zh: "${info.db_name} 中没有未被引用的数据块。",
    },
    "Node ID": {
        def: "Node ID",
        la: "ID nodi",
        zh: "节点 ID",
    },
    'Not all messages have been translated. And, please revert to "Default" when reporting errors.': {
        def: 'Not all messages have been translated. And, please revert to "Default" when reporting errors.',
        la: "Non omnes nuntii translati sunt. Atque, quaeso, ad “Default” redi cum errores refers.",
        zh: '并非所有消息都已翻译。请在报告错误时恢复为"默认"',
    },
    "Not configured": {
        def: "Not configured",
        la: "Non constitutum",
        zh: "未配置",
    },
    "Notify all setting files": {
        def: "Notify all setting files",
        la: "Nuntia omnes plicas optionum",
        zh: "通知所有设置文件",
    },
    "Notify customized": {
        def: "Notify customized",
        la: "Nuntia propria",
        zh: "通知自定义设置",
    },
    "Notify when other device has newly customized.": {
        def: "Notify when other device has newly customized.",
        la: "Nuntia cum aliud instrumentum nova propria constituit.",
        zh: "当其他设备有新的自定义设置时通知 ",
    },
    "Notify when the estimated remote storage size exceeds on start up": {
        def: "Notify when the estimated remote storage size exceeds on start up",
        la: "Nuntia in initio cum magnitudo aestimata repositorii remoti limitem excedit",
        zh: "启动时当估计的远程存储大小超出时通知",
    },
    "Number of batches to process at a time. Defaults to 40. Minimum is 2. This along with batch size controls how many docs are kept in memory at a time.":
        {
            def: "Number of batches to process at a time. Defaults to 40. Minimum is 2. This along with batch size controls how many docs are kept in memory at a time.",
            la: "Numerus acervorum simul tractandorum. Praedefinitum est 40. Minimum est 2. Hoc una cum magnitudine acervi moderatur quot documenta simul in memoria teneantur.",
            zh: "一次处理的批量数量。默认为 40。最小为 2。此设置与批量大小一起控制一次在内存中保留多少文档",
        },
    "Number of changes to sync at a time. Defaults to 50. Minimum is 2.": {
        def: "Number of changes to sync at a time. Defaults to 50. Minimum is 2.",
        la: "Numerus mutationum simul synchronizandarum. Praedefinitum est 50. Minimum est 2.",
        zh: "一次同步的更改数量。默认为 50。最小为 2。",
    },
    "Number of unreferenced chunks on ${info.db_name}: ${chunks.length}": {
        def: "Unreferenced chunks in ${info.db_name}: ${chunks.length}",
        la: "Fragmenta non relata in ${info.db_name}: ${chunks.length}",
        zh: "${info.db_name} 中未被引用的数据块：${chunks.length}",
    },
    "Obsidian version": {
        def: "Obsidian version",
        la: "Versio Obsidian",
        zh: "Obsidian 版本",
    },
    "Obsidian will be restarted soon! (Within ${stableCheck} seconds)": {
        def: "Obsidian will restart within ${stableCheck} seconds.",
        la: "Obsidian intra ${stableCheck} secunda denuo incipiet.",
        zh: "Obsidian 将在 ${stableCheck} 秒内重启。",
    },
    "Of course, we can back up the data before proceeding.": {
        def: "Of course, we can back up the data before proceeding.",
        la: "Scilicet data antequam pergimus servare (exemplar tutelae facere) possumus.",
        zh: "当然，我们可以先备份数据再继续。",
    },
    Off: {
        def: "Off",
        la: "Inactivum",
        zh: "关闭",
    },
    Ok: {
        def: "Ok",
        la: "Bene",
        zh: "确定",
    },
    OK: {
        def: "OK",
        la: "OK",
        zh: "确定",
    },
    "Old content copied to clipboard": {
        def: "Old content copied to clipboard",
        la: "Contentum vetus in tabellam exscriptum",
        zh: "旧内容已复制到剪贴板",
    },
    On: {
        def: "On",
        la: "Activum",
        zh: "开启",
    },
    "Only an ordinary valid Vault path can be restored from Document History.": {
        def: "Only a valid, ordinary vault path can be restored from Document History.",
        la: "Ex Historia documenti restitui potest sola via ordinaria et valida in tabulario.",
        zh: "只有普通且有效的库路径才能从文档历史记录中恢复。",
    },
    Open: {
        def: "Open",
        la: "Aperi",
        zh: "打开",
    },
    Overwrite: {
        def: "Overwrite",
        la: "Superscribe",
        zh: "覆盖",
    },
    "Overwrite all with remote files": {
        def: "Overwrite all with remote files",
        la: "Superscribe omnia plicis remotis",
        zh: "全部用远程文件覆盖",
    },
    "Overwrite Server Data with This Device's Files": {
        def: "Overwrite Server Data with This Device's Files",
        la: "Superscribe data ministratoris plicis huius instrumenti",
        zh: "用本设备文件覆盖服务器数据",
    },
    "P2P Status": {
        def: "P2P Status",
        la: "Status P2P",
        zh: "P2P 状态",
    },
    "P2P.AskPassphraseForDecrypt": {
        def: "The remote peer shared the configuration. Please input the passphrase to decrypt the configuration.",
        la: "Par remotus configurationem communicavit. Quaeso tesseram arcanam insere ut configurationem decryptes.",
        zh: "远程对等方共享了配置，请输入密码短语以解密配置",
    },
    "P2P.AskPassphraseForShare": {
        def: "The remote peer requested this device configuration. Please input the passphrase to share the configuration. You can ignore the request by cancelling this dialogue.",
        la: "Par remotus configurationem huius instrumenti petivit. Quaeso tesseram arcanam insere ut configurationem communices. Petitionem neglegere potes hunc dialogum abrogando.",
        zh: "远程对等方请求此设备配置，请输入密码短语以共享配置。你可以通过取消此对话框来忽略此请求",
    },
    "P2P.DisabledButNeed": {
        def: "Peer-to-Peer Sync is disabled. Do you really want to enable it?",
        la: "Synchronizatio inter pares deactivatum est. Visne vere id activare?",
        zh: "Peer-to-Peer同步 已禁用。你确定要启用它吗？",
    },
    "P2P.NoAutoSyncPeers": {
        def: "No auto-sync peers found. Please set peers on the Peer-to-Peer Sync pane.",
        la: "Nulli pares synchronizationis automaticae inventi. Quaeso pares in tabula Synchronizatio inter pares constitue.",
        zh: "未找到自动同步的对等方，请在 Peer-to-Peer同步 (实验性) 面板中设置对等方",
    },
    "P2P.NoKnownPeers": {
        def: "No peers has been detected, waiting incoming other peers...",
        la: "Nulli pares detecti sunt; exspectantur alii pares advenientes...",
        zh: "未检测到对等方，正在等待其他对等方的连接...",
    },
    "P2P.NotEnabled": {
        def: "Peer-to-Peer Sync is not enabled. We cannot open a new connection.",
        la: "Synchronizatio inter pares non activum est. Novam conexionem aperire non possumus.",
        zh: "Peer-to-Peer同步 is not enabled. We cannot open a new connection.",
    },
    "P2P.ReplicatorInstanceMissing": {
        def: "P2P Sync replicator is not found, possibly not have been configured or enabled.",
        la: "Replicator synchronizationis P2P non inventus est; fortasse non constitutus vel non activatus est.",
        zh: "P2P Sync replicator is not found, possibly not have been configured or enabled.",
    },
    "P2P.SeemsOffline": {
        def: "Peer ${name} seems offline, skipped.",
        la: "Par ${name} extra lineam esse videtur; praetermissus est.",
        zh: "Peer ${name} seems offline, skipped.",
    },
    "P2P.SyncAlreadyRunning": {
        def: "P2P Sync is already running.",
        la: "Synchronizatio P2P iam currit.",
        zh: "P2P Sync is already running.",
    },
    "P2P.SyncCompleted": {
        def: "P2P Sync completed.",
        la: "Synchronizatio P2P perfecta est.",
        zh: "P2P Sync completed.",
    },
    "P2P.SyncStartedWith": {
        def: "P2P Sync with ${name} have been started.",
        la: "Synchronizatio P2P cum ${name} incepta est.",
        zh: "P2P Sync with ${name} have been started.",
    },
    Passphrase: {
        def: "Passphrase",
        la: "Tessera arcana",
        zh: "密码",
    },
    "Passphrase of sensitive configuration items": {
        def: "Passphrase of sensitive configuration items",
        la: "Tessera arcana optionum sensibilium",
        zh: "敏感配置项的密码",
    },
    password: {
        def: "password",
        la: "tessera",
        zh: "密码",
    },
    Password: {
        def: "Password",
        la: "Tessera",
        zh: "密码",
    },
    Path: {
        def: "Path",
        la: "Via",
        zh: "路径",
    },
    "Path identity mode": {
        def: "Path identity mode",
        la: "Modus identitatis viarum",
        zh: "路径标识模式",
    },
    Peers: {
        def: "Peers",
        la: "Pares",
        zh: "对等方",
    },
    "Pending file events remain because their commit did not complete before the window visibility changed.": {
        def: "Pending file events remain because their commit did not complete before the window visibility changed.",
        la: "Eventa plicarum pendentia manent, quia consignari non potuerunt antequam visibilitas fenestrae mutaretur.",
        zh: "窗口可见状态改变前，待处理的文件事件未能提交完毕，因此仍在等待处理。",
    },
    "Per-file-saved customization sync": {
        def: "Per-file-saved customization sync",
        la: "Synchronizatio optionum propriarum per singulas plicas servata",
        zh: "按文件保存的自定义同步",
    },
    Perform: {
        def: "Perform",
        la: "Exsequere",
        zh: "执行",
    },
    "Periodic Sync interval": {
        def: "Periodic Sync interval",
        la: "Intervallum synchronizationis periodicae",
        zh: "定期同步间隔",
    },
    "Pick a file to resolve conflict": {
        def: "Pick a file to resolve conflict",
        la: "Elige plicam ad discrepantiam solvendam",
        zh: "选择要解决冲突的文件",
    },
    "Pick a file to show history": {
        def: "Pick a file to show history",
        la: "Elige plicam ad historiam monstrandam",
        zh: "选择一个文件以显示历史记录",
    },
    "Please Confirm the Following": {
        def: "Please Confirm the Following",
        la: "Quaeso sequentia confirma",
        zh: "请确认以下内容",
    },
    "Please select 'Cancel' explicitly to cancel this operation.": {
        def: "Please select 'Cancel' explicitly to cancel this operation.",
        la: "Quaeso 'Cancel' expresse elige ut hanc operationem abroges.",
        zh: "如需取消此操作，请明确选择“取消”。",
    },
    "Plug-in version": {
        def: "Plug-in version",
        la: "Versio additamenti",
        zh: "插件版本",
    },
    Plugins: {
        def: "Plugins",
        la: "Additamenta",
        zh: "插件",
    },
    "Preserved ${path}: a current storage item contradicts its deletion event": {
        def: "Kept ${path}: an item now in the vault contradicts its deletion event",
        la: "${path} servatus est: res praesens in tabulario eventui deletionis repugnat",
        zh: "已保留 ${path}：库中现有的项目与其删除事件矛盾",
    },
    "Preserved ${path}: rename target ${targetPath} is still selected": {
        def: "Kept ${path}: the rename target ${targetPath} is still selected",
        la: "${path} servatus est: nomen novum ${targetPath} adhuc electum est",
        zh: "已保留 ${path}：重命名目标 ${targetPath} 仍处于选中状态",
    },
    "Preserved ${path}: the rename target no longer resolves to ${targetPath}": {
        def: "Kept ${path}: the rename target no longer resolves to ${targetPath}",
        la: "${path} servatus est: nomen novum iam ad ${targetPath} non spectat",
        zh: "已保留 ${path}：重命名目标不再指向 ${targetPath}",
    },
    "Preserved unsynchronised local changes as a conflict for ${path}": {
        def: "Kept unsynchronised changes to ${path} on this device as a conflict",
        la: "Mutationes plicae ${path} in hoc instrumento nondum synchronizatae ut discrepantia servatae sunt",
        zh: "已将 ${path} 在这台设备上尚未同步的更改保留为冲突",
    },
    Presets: {
        def: "Presets",
        la: "Praeconstituta",
        zh: "预设",
    },
    "Prevented overwriting unsynchronised local changes for ${path}": {
        def: "Did not overwrite unsynchronised changes to ${path} on this device",
        la: "Mutationes plicae ${path} in hoc instrumento nondum synchronizatae non superscriptae sunt",
        zh: "已阻止覆盖 ${path} 在这台设备上尚未同步的更改",
    },
    Proceed: {
        def: "Proceed",
        la: "Perge",
        zh: "继续",
    },
    "Process small files in the foreground": {
        def: "Process small files in the foreground",
        la: "Tracta parvas plicas in proscaenio",
        zh: "在前台处理小文件",
    },
    'Processed database active-size: ${sizeToHumanReadable(\n        getSize(endInfo, "active")\n      )}, external-size:${sizeToHumanReadable(\n        getSize(endInfo, "external")\n      )}, file-size: ${sizeToHumanReadable(getSize(endInfo, "file"))}':
        {
            def: 'Database after processing: active size: ${sizeToHumanReadable(\n        getSize(endInfo, "active")\n      )}, external size: ${sizeToHumanReadable(\n        getSize(endInfo, "external")\n      )}, file size: ${sizeToHumanReadable(getSize(endInfo, "file"))}',
            la: 'Repositorium post tractationem, magnitudo activa: ${sizeToHumanReadable(\n        getSize(endInfo, "active")\n      )}, externa: ${sizeToHumanReadable(\n        getSize(endInfo, "external")\n      )}, plicae: ${sizeToHumanReadable(getSize(endInfo, "file"))}',
            zh: '处理后的数据库：活动大小：${sizeToHumanReadable(\n        getSize(endInfo, "active")\n      )}，外部大小：${sizeToHumanReadable(\n        getSize(endInfo, "external")\n      )}，文件大小：${sizeToHumanReadable(getSize(endInfo, "file"))}',
        },
    "Processing ${docPath} has been skipped due to file size exceeding the limit": {
        def: "Skipped ${docPath} because the file exceeds the size limit.",
        la: "${docPath} praeterita est, quia plica modum magnitudinis excedit.",
        zh: "已跳过 ${docPath}，因为文件超过大小限制。",
    },
    "Processing: ${processedCount}/${pairs.length}": {
        def: "Processing: ${processedCount}/${pairs.length}",
        la: "Tractantur: ${processedCount}/${pairs.length}",
        zh: "正在处理：${processedCount}/${pairs.length}",
    },
    Progress: {
        def: "Progress",
        la: "Progressus",
        zh: "进度",
    },
    "Property Encryption": {
        def: "Property Encryption",
        la: "Cryptatio proprietatum",
        zh: "属性加密",
    },
    "Purging unused ${docs.length} chunks ": {
        def: "Purging ${docs.length} unused chunks",
        la: "${docs.length} fragmenta non adhibita purgantur",
        zh: "正在清除 ${docs.length} 个未使用的数据块",
    },
    "Purging unused ${docs.length} chunks... ": {
        def: "Purging ${docs.length} unused chunks...",
        la: "${docs.length} fragmenta non adhibita purgantur...",
        zh: "正在清除 ${docs.length} 个未使用的数据块……",
    },
    "Purging unused chunks done!: ${totalRemoved} chunks has been deleted.": {
        def: "Purging unused chunks done: ${totalRemoved} chunks deleted.",
        la: "Purgatio fragmentorum non adhibitorum facta est: ${totalRemoved} fragmenta deleta.",
        zh: "未使用的数据块已清除：删除了 ${totalRemoved} 个数据块。",
    },
    "Purging:  ${totalRemoved} / ${docs.length}": {
        def: "Purging: ${totalRemoved} / ${docs.length}",
        la: "Purgatio: ${totalRemoved} / ${docs.length}",
        zh: "正在清除：${totalRemoved} / ${docs.length}",
    },
    "PUT: FAILED: ${path}": {
        def: "Write failed: ${path}",
        la: "Scriptio defecit: ${path}",
        zh: "写入失败：${path}",
    },
    "QR Code size exceeded, switching to aggregator mode": {
        def: "QR code size exceeded; switching to aggregator mode.",
        la: "Magnitudo codicis QR excessa est; ad modum aggregationis transitur.",
        zh: "二维码超出大小限制，改用聚合模式。",
    },
    "Reboot to re-run the process": {
        def: "Reboot to re-run the process",
        la: "Denuo incipe ut processus iterum curratur",
        zh: "重启以重新运行此流程",
    },
    "Rebuilding has been refused: remediation mode is active. Clear the modification-time limit to rebuild.": {
        def: "Rebuild refused: remediation mode is active. Clear the modification-time limit to rebuild.",
        la: "Reaedificatio recusata est: modus remedii activus est. Finem temporis mutationis remove ut reaedifices.",
        zh: "已拒绝重建：修复模式已开启。请清除修改时间限制后再重建。",
    },
    "RedFlag.CouldNotDeleteFlag": {
        def: "Could not delete ${path}",
        la: "${path} deleri non potuit",
        zh: "无法删除 ${path}",
    },
    "RedFlag.Fetch.Cancelled": {
        def: "Fetch everything cancelled by user.",
        la: "Arcessitio omnium ab usore abrogata.",
        zh: "用户已取消获取全部内容。",
    },
    "RedFlag.Fetch.Completed": {
        def: "Fetch everything operation completed. Vault files will be gradually synced.",
        la: "Arcessitio omnium perfecta. Plicae tabularii paulatim synchronizabuntur.",
        zh: "获取全部内容的操作已完成。笔记库中的文件将逐步同步。",
    },
    "RedFlag.Fetch.InitialisationCancelled": {
        def: "Fetch initialisation cancelled by user.",
        la: "Initium arcessitionis ab usore abrogatum.",
        zh: "用户已取消获取初始化。",
    },
    "RedFlag.Fetch.Starting": {
        def: "Fetching everything with settings: makeLocalChunkBeforeSync=${makeLocalChunkBeforeSync}, makeLocalFilesBeforeSync=${makeLocalFilesBeforeSync}",
        la: "Omnia arcessuntur his optionibus: makeLocalChunkBeforeSync=${makeLocalChunkBeforeSync}, makeLocalFilesBeforeSync=${makeLocalFilesBeforeSync}",
        zh: "正在使用以下设置获取全部内容：makeLocalChunkBeforeSync=${makeLocalChunkBeforeSync}，makeLocalFilesBeforeSync=${makeLocalFilesBeforeSync}",
    },
    "RedFlag.Initialisation.Error": {
        def: "Error during vault initialisation.",
        la: "Error dum tabularium initiatur.",
        zh: "笔记库初始化时出错。",
    },
    "RedFlag.Initialisation.ProcessError": {
        def: "Error during vault initialisation process.",
        la: "Error in processu initiandi tabularii.",
        zh: "笔记库初始化过程中出错。",
    },
    "RedFlag.Rebuild.Cancelled": {
        def: "Rebuild everything cancelled by user.",
        la: "Reaedificatio omnium ab usore abrogata.",
        zh: "用户已取消重建全部内容。",
    },
    "RedFlag.Rebuild.Completed": {
        def: "Rebuild everything operation completed.",
        la: "Reaedificatio omnium perfecta.",
        zh: "重建全部内容的操作已完成。",
    },
    "RedFlag.Rebuild.InitialisationCancelled": {
        def: "Rebuild initialisation cancelled by user.",
        la: "Initium reaedificationis ab usore abrogatum.",
        zh: "用户已取消重建初始化。",
    },
    "RedFlag.RemoteSettings.Applied": {
        def: "Remote configuration applied.",
        la: "Configuratio remota applicata.",
        zh: "已应用远程配置。",
    },
    "RedFlag.RemoteSettings.Buttons.OK": {
        def: "OK",
        la: "OK",
        zh: "确定",
    },
    "RedFlag.RemoteSettings.Matched": {
        def: "Remote configuration matches local configuration. No changes applied.",
        la: "Configuratio remota cum configuratione locali congruit. Nullae mutationes applicatae.",
        zh: "远程配置与本地配置一致，未做任何更改。",
    },
    "RedFlag.RemoteSettings.NotApplied": {
        def: "Remote configuration not applied.",
        la: "Configuratio remota non applicata.",
        zh: "未应用远程配置。",
    },
    "RedFlag.RemoteSettings.NotConfigured": {
        def: "Remote synchronisation settings are not configured (${reason}).",
        la: "Optiones synchronizationis remotae non configuratae sunt (${reason}).",
        zh: "远程同步设置尚未配置（${reason}）。",
    },
    "RedFlag.RemoteSettings.RebuildUsesLocal": {
        def: "Rebuild will use this device's synchronisation settings.",
        la: "Reaedificatio optionibus synchronizationis huius instrumenti utetur.",
        zh: "重建将使用此设备的同步设置。",
    },
    "RedFlag.RemoteSettings.SkippedP2P": {
        def: "Remote configuration fetch skipped (P2P mode).",
        la: "Arcessitio configurationis remotae omissa (modus P2P).",
        zh: "已跳过获取远程配置（P2P 模式）。",
    },
    "RedFlag.RemoteSettings.Supplemented": {
        def: "Your settings differed slightly from the server's. The plug-in has supplemented the incompatible parts with the server settings!",
        la: "Optiones tuae paulum ab optionibus ministratoris differebant. Additamentum partes incompatibiles optionibus ministratoris supplevit!",
        zh: "你的设置与服务器的设置略有不同。插件已用服务器设置补全了不兼容的部分！",
    },
    "RedFlag.RemoteSettings.Unavailable": {
        def: "Could not read synchronisation settings from the remote.",
        la: "Optiones synchronizationis ex remoto legi non potuerunt.",
        zh: "无法从远程读取同步设置。",
    },
    "RedFlag.RemoteSettings.Unsupported": {
        def: "Remote synchronisation settings are not supported by this remote type.",
        la: "Optiones synchronizationis remotae ab hoc genere remoti non sustinentur.",
        zh: "此远程类型不支持远程同步设置。",
    },
    "RedFlag.ResumeAndRestart": {
        def: "Do you want to resume file and database processing, and restart obsidian now?",
        la: "Visne tractationem plicarum et repositorii resumere et Obsidian nunc iterum incipere?",
        zh: "是否恢复文件和数据库处理，并立即重启 Obsidian？",
    },
    "RedFlag.SelectRemote.Activated": {
        def: "Activated remote configuration: ${name}",
        la: "Configuratio remota activata: ${name}",
        zh: "已激活远程配置：${name}",
    },
    "RedFlag.SelectRemote.ActivationFailed": {
        def: "Failed to activate remote configuration: ${name}",
        la: "Configuratio remota activari non potuit: ${name}",
        zh: "激活远程配置失败：${name}",
    },
    "RedFlag.SelectRemote.Buttons.UseActive": {
        def: "Use active remote",
        la: "Utere remoto activo",
        zh: "使用当前激活的远程",
    },
    "RedFlag.SelectRemote.Cancelled": {
        def: "Remote configuration selection cancelled.",
        la: "Electio configurationis remotae abrogata.",
        zh: "已取消选择远程配置。",
    },
    "RedFlag.SelectRemote.KeepCurrent": {
        def: "Keeping current remote configuration.",
        la: "Configuratio remota praesens retinetur.",
        zh: "保留当前远程配置。",
    },
    "RedFlag.SelectRemote.Message": {
        def: "Multiple remote configurations detected. Please select the remote configuration you want to fetch from.",
        la: "Plures configurationes remotae inventae sunt. Quaeso configurationem remotam elige ex qua arcessere vis.",
        zh: "检测到多个远程配置。请选择要从中获取的远程配置。",
    },
    "RedFlag.SelectRemote.NoneSelected": {
        def: "No remote configuration selected.",
        la: "Nulla configuratio remota electa.",
        zh: "未选择远程配置。",
    },
    "RedFlag.SelectRemote.Title": {
        def: "Select Remote Configuration",
        la: "Elige configurationem remotam",
        zh: "选择远程配置",
    },
    "RedFlag.Suspend.Detected": {
        def: "SCRAM is detected. All operations are suspended.",
        la: "SCRAM animadversum est. Omnes operationes suspensae sunt.",
        zh: "检测到 SCRAM。所有操作已暂停。",
    },
    "RedFlag.Suspend.Suspended": {
        def: "All operations are suspended as per SCRAM.\nLogs will be written to the file. This might be a performance impact.",
        la: "Omnes operationes ex SCRAM suspensae sunt.\nActa in plicam inscribentur. Hoc effectum minuere potest.",
        zh: "根据 SCRAM，所有操作已暂停。\n日志将写入文件，这可能会影响性能。",
    },
    'Reduced sizes: active-size: ${sizeToHumanReadable(\n        getSize(info, "active") - getSize(endInfo, "active")\n      )}, external-size:${sizeToHumanReadable(\n        getSize(info, "external") - getSize(endInfo, "external")\n      )}, file-size: ${sizeToHumanReadable(getSize(info, "file") - getSize(endInfo, "file"))}':
        {
            def: 'Reduced by: active size: ${sizeToHumanReadable(\n        getSize(info, "active") - getSize(endInfo, "active")\n      )}, external size: ${sizeToHumanReadable(\n        getSize(info, "external") - getSize(endInfo, "external")\n      )}, file size: ${sizeToHumanReadable(getSize(info, "file") - getSize(endInfo, "file"))}',
            la: 'Deminutio, magnitudo activa: ${sizeToHumanReadable(\n        getSize(info, "active") - getSize(endInfo, "active")\n      )}, externa: ${sizeToHumanReadable(\n        getSize(info, "external") - getSize(endInfo, "external")\n      )}, plicae: ${sizeToHumanReadable(getSize(info, "file") - getSize(endInfo, "file"))}',
            zh: '减少量：活动大小：${sizeToHumanReadable(\n        getSize(info, "active") - getSize(endInfo, "active")\n      )}，外部大小：${sizeToHumanReadable(\n        getSize(info, "external") - getSize(endInfo, "external")\n      )}，文件大小：${sizeToHumanReadable(getSize(info, "file") - getSize(endInfo, "file"))}',
        },
    "Reducing the frequency with which on-disk changes are reflected into the DB": {
        def: "Reducing the frequency with which on-disk changes are reflected into the DB",
        la: "Frequentiam minuens qua mutationes in disco in repositorium referuntur",
        zh: "降低将磁盘上的更改反映到数据库中的频率",
    },
    Refresh: {
        def: "Refresh",
        la: "Renova",
        zh: "刷新",
    },
    "Refusing to apply a filename case change across differently cased parent directories: ${existDoc.path} -> ${path}":
        {
            def: "Refusing to change the filename case because the parent folders differ in case: ${existDoc.path} -> ${path}",
            la: "Mutatio litterarum maiuscularum vel minuscularum in nomine plicae non applicatur, quia capsae parentes litteris diversis scriptae sunt: ${existDoc.path} -> ${path}",
            zh: "父文件夹的大小写不同，拒绝更改文件名大小写：${existDoc.path} -> ${path}",
        },
    "Refusing to overwrite ${existDoc.path} while applying the distinct path ${path}": {
        def: "Refusing to overwrite ${existDoc.path} while applying the different path ${path}",
        la: "Dum via diversa ${path} applicatur, ${existDoc.path} non superscribitur",
        zh: "应用另一路径 ${path} 时，拒绝覆盖 ${existDoc.path}",
    },
    "Refusing to overwrite the existing database entry while renaming ${oldPath} to ${newPath}": {
        def: "Refusing to overwrite the existing database entry while renaming ${oldPath} to ${newPath}",
        la: "Dum ${oldPath} in ${newPath} renominatur, inscriptio exstans in repositorio non superscribitur",
        zh: "将 ${oldPath} 重命名为 ${newPath} 时，拒绝覆盖数据库中已有的条目",
    },
    Region: {
        def: "Region",
        la: "Regio",
        zh: "区域",
    },
    Reload: {
        def: "Reload",
        la: "Recarga",
        zh: "重新加载",
    },
    Remediation: {
        def: "Remediation",
        la: "Remedium",
        zh: "修复设置",
    },
    "Remediation mode is active, so the detailed fetch flow is used instead of Simple Fetch.": {
        def: "Remediation mode is active, so the detailed fetch is used instead of the simple fetch.",
        la: "Modus remedii activus est; itaque arcessitio accurata pro arcessitione simplici adhibetur.",
        zh: "修正模式已启用，因此改用详细获取，而不是简单获取。",
    },
    "Remediation mode: the files in storage are not stored in the database before fetching.": {
        def: "Remediation mode: files in the vault are not saved to the database before fetching.",
        la: "Modus remedii: plicae tabularii ante arcessitionem in repositorio non servantur.",
        zh: "修复模式：获取前不会把库中的文件存入数据库。",
    },
    "remote -> local: Done": {
        def: "Server → this device: done",
        la: "Ministrator → hoc instrumentum: factum",
        zh: "服务器 → 此设备：完成",
    },
    "Remote configuration '${id}' had a plain-text URI marked as encrypted. The flag has been repaired.": {
        def: "Server configuration '${id}' had a plain-text URI marked as encrypted. The flag has been repaired.",
        la: "Configuratio ministratoris “${id}” URI textus aperti ut cryptatum notatum habebat. Nota correcta est.",
        zh: "服务器配置“${id}”的明文 URI 被错误地标记为已加密，该标记已修正。",
    },
    "Remote server type": {
        def: "Remote server type",
        la: "Genus ministratoris remoti",
        zh: "远程服务器类型",
    },
    "Remote Type": {
        def: "Remote Type",
        la: "Genus remoti",
        zh: "远程类型",
    },
    Rename: {
        def: "Rename",
        la: "Renomina",
        zh: "重命名",
    },
    "Renamed ${oldPath} to ${newPath}, but preserved every conflicted source branch because the displayed source revision is unknown":
        {
            def: "Renamed ${oldPath} to ${newPath}, but kept every conflicted branch of the original because the revision it showed is unknown",
            la: "${oldPath} in ${newPath} renominata est, sed omnes rami fontis in discrepantia servati sunt, quia revisio fontis ostensa ignota est",
            zh: "已将 ${oldPath} 重命名为 ${newPath}，但由于不知道原文件显示的是哪个修订，保留了原文件所有存在冲突的分支",
        },
    Replicating: {
        def: "Replicating",
        la: "Replicatio fit",
        zh: "复制中",
    },
    "Replication activated": {
        def: "Synchronisation started",
        la: "Synchronizatio incepit",
        zh: "同步已开始",
    },
    "Replication callback error": {
        def: "Synchronisation callback error",
        la: "Erratum in functione revocationis synchronizationis",
        zh: "同步回调出错",
    },
    "Replication completed": {
        def: "Synchronisation completed",
        la: "Synchronizatio perfecta",
        zh: "同步完成",
    },
    "Replication denied": {
        def: "Synchronisation was denied",
        la: "Synchronizatio recusata est",
        zh: "同步被拒绝",
    },
    "Replication error": {
        def: "Synchronisation error",
        la: "Erratum synchronizationis",
        zh: "同步出错",
    },
    "Replication has been cancelled. Please try it again.": {
        def: "Synchronisation was cancelled. Try again.",
        la: "Synchronizatio abrogata est. Iterum conare.",
        zh: "同步已取消，请重试。",
    },
    "Replication stopped for busy.": {
        def: "Synchronisation paused because the server is busy.",
        la: "Synchronizatio suspensa est, quia ministrator occupatus est.",
        zh: "服务器繁忙，同步已暂停。",
    },
    "Replication stopped.": {
        def: "Synchronisation stopped.",
        la: "Synchronizatio cessavit.",
        zh: "同步已停止。",
    },
    "Replicator.Dialogue.Locked.Action.Dismiss": {
        def: "Cancel for reconfirmation",
        la: "Abroga ad reconfirmandum",
        zh: "Cancel for reconfirmation",
    },
    "Replicator.Dialogue.Locked.Action.Fetch": {
        def: "Reset Synchronisation on This Device",
        la: "Synchronizationem in hoc instrumento restitue",
        zh: "Reset Synchronisation on This Device",
    },
    "Replicator.Dialogue.Locked.Action.Unlock": {
        def: "Unlock the remote database",
        la: "Resera repositorium remotum",
        zh: "Unlock the remote database",
    },
    "Replicator.Dialogue.Locked.Message": {
        def: "Remote database is locked. This is due to a rebuild on one of the terminals.\nThe device is therefore asked to withhold the connection to avoid database corruption.\n\nThere are three options that we can do:\n\n- Reset Synchronisation on This Device\n  The most preferred and reliable way. This will dispose the local database once, and reset all synchronisation information from the remote database again, In most case, we can perform this safely. However, it takes some time and should be done in stable network.\n- Unlock the remote database\n  This method can only be used if we are already reliably synchronised by other replication methods. This does not simply mean that we have the same files. If you are not sure, you should avoid it.\n- Cancel for reconfirmation\n    This will cancel the operation. And we will asked again on next request.\n",
        la: "Repositorium remotum obseratum est. Hoc fit propter reaedificationem in uno ex terminalibus.\nInstrumentum igitur rogatur ut a conexione abstineat, ne repositorium corrumpatur.\n\nTres optiones habemus:\n\n- Synchronizationem in hoc instrumento restitue\n  Modus maxime praeferendus et fidissimus. Hoc repositorium locale semel abiciet et omnes notitias synchronizationis ex repositorio remoto denuo restituet. Plerumque hoc tuto facere possumus. Tamen aliquantum temporis requirit et in rete stabili faciendum est.\n- Resera repositorium remotum\n  Hic modus adhiberi potest tantum si iam per alios modos replicationis certo synchronizati sumus. Hoc non solum significat nos easdem plicas habere. Si incertus es, eum vitare debes.\n- Abroga ad reconfirmandum\n    Hoc operationem abrogabit. Et proxima petitione iterum rogabimur.\n",
        zh: "Remote database is locked. This is due to a rebuild on one of the terminals.\nThe device is therefore asked to withhold the connection to avoid database corruption.\n\nThere are three options that we can do:\n\n- Reset Synchronisation on This Device\n  The most preferred and reliable way. This will dispose the local database once, and fetch all from the remote database again, In most case, we can perform this safely. However, it takes some time and should be done in stable network.\n- Unlock the remote database\n  This method can only be used if we are already reliably synchronised by other replication methods. This does not simply mean that we have the same files. If you are not sure, you should avoid it.\n- Cancel for reconfirmation\n    This will cancel the operation. And we will asked again on next request.\n",
    },
    "Replicator.Dialogue.Locked.Message.Fetch": {
        def: "Fetch all has been scheduled. Plug-in will be restarted to perform it.",
        la: "Arcessere omnia constitutum est. Additamentum denuo incipiet ut id exsequatur.",
        zh: "Fetch all has been scheduled. Plug-in will be restarted to perform it.",
    },
    "Replicator.Dialogue.Locked.Message.Unlocked": {
        def: "The remote database has been unlocked. Please retry the operation.",
        la: "Repositorium remotum reseratum est. Quaeso operationem iterum conare.",
        zh: "The remote database has been unlocked. Please retry the operation.",
    },
    "Replicator.Dialogue.Locked.Title": {
        def: "Locked",
        la: "Obseratum",
        zh: "Locked",
    },
    "Replicator.Message.Cleaned": {
        def: "Database cleaning up is in process. replication has been cancelled",
        la: "Purgatio repositorii in processu est; replicatio abrogata est",
        zh: "Database cleaning up is in process. replication has been cancelled",
    },
    "Replicator.Message.InitialiseFatalError": {
        def: "No replicator is available, this is the fatal error.",
        la: "Nullus replicator praesto est; hic error fatalis est.",
        zh: "No replicator is available, this is the fatal error.",
    },
    "Replicator.Message.Pending": {
        def: "Some file events are pending. Replication has been cancelled.",
        la: "Quidam eventus plicarum pendent. Replicatio abrogata est.",
        zh: "Some file events are pending. Replication has been cancelled.",
    },
    "Replicator.Message.SomeModuleFailed": {
        def: "Replication has been cancelled by some module failure",
        la: "Replicatio ob defectum alicuius moduli abrogata est",
        zh: "Replication has been cancelled by some module failure",
    },
    "Replicator.Message.VersionUpFlash": {
        def: "Remote synchronisation is paused for compatibility review. Run the 'Review why synchronisation is paused' command for details and available actions.",
        la: "Synchronizatio remota ad compatibilitatem recognoscendam suspensa est. Mandatum 'Review why synchronisation is paused' exsequere ad singula et actiones praesto.",
        zh: "An update has been detected. Please open the Settings dialogue and check the Change Log. Replication has been cancelled.",
    },
    "Requires restart of Obsidian": {
        def: "Requires restart of Obsidian",
        la: "Obsidian denuo incipiendum est",
        zh: "需要重启 Obsidian",
    },
    "Requires restart of Obsidian.": {
        def: "Requires restart of Obsidian.",
        la: "Obsidian denuo incipiendum est.",
        zh: "需要重启 Obsidian ",
    },
    Reset: {
        def: "Reset",
        la: "Restitue",
        zh: "重置",
    },
    "Reset and Resume Synchronisation": {
        def: "Reset and Resume Synchronisation",
        la: "Restitue et resume synchronizationem",
        zh: "重置并恢复同步",
    },
    "Reset notification threshold and check the remote database usage": {
        def: "Reset notification threshold and check the remote database usage",
        la: "Restitue limitem nuntiandi et usum repositorii remoti inspice",
        zh: "重置通知阈值并检查远程数据库使用情况",
    },
    "Reset Synchronisation on This Device": {
        def: "Reset Synchronisation on This Device",
        la: "Restitue synchronizationem in hoc instrumento",
        zh: "重置此设备上的同步",
    },
    "Resolve all conflicted files": {
        def: "Resolve all conflicted files",
        la: "Solve omnes plicas discrepantes",
        zh: "解决所有冲突文件",
    },
    "Resolve if conflicted.": {
        def: "Resolve if conflicted.",
        la: "Solve si discrepat",
        zh: "如有冲突则解决",
    },
    "Resolving conflicts by newer ones": {
        def: "Resolving conflicts with the newer versions",
        la: "Discrepantiae recentioribus versionibus solvuntur",
        zh: "正在用较新的版本解决冲突",
    },
    "Restoring the selected revision failed before Vault reflection completed. Review the file with 'Inspect conflicts and file/database differences' before retrying.":
        {
            def: "Restoring the selected revision failed before it was written to the vault. Check the file before retrying.",
            la: "Restitutio revisionis selectae defecit antequam in tabularium scriberetur. Plicam inspice antequam iterum conaris.",
            zh: "所选修订在写入库之前恢复失败。请先检查该文件，再重试。",
        },
    "Resuming fast database fetch from sequence: ${checkpoint.sequence}": {
        def: "Resuming fast database fetch from sequence ${checkpoint.sequence}",
        la: "Arcessitio celeris repositorii a sequentia ${checkpoint.sequence} resumitur",
        zh: "从序号 ${checkpoint.sequence} 继续快速获取数据库",
    },
    Rev: {
        def: "Rev",
        la: "Rec.",
        zh: "修订",
    },
    "Review why": {
        def: "Review why",
        la: "Inspice causam",
        zh: "查看原因",
    },
    "Review why synchronisation is paused": {
        def: "Review why synchronisation is paused",
        la: "Recognosce cur synchronizatio suspensa sit",
        zh: "查看同步暂停的原因",
    },
    Revoke: {
        def: "Revoke",
        la: "Revoca",
        zh: "撤销",
    },
    "Room ID": {
        def: "Room ID",
        la: "ID conclavis",
        zh: "房间 ID",
    },
    Same: {
        def: "Same",
        la: "Idem",
        zh: "相同",
    },
    "Save settings to a markdown file. You will be notified when new settings arrive. You can set different files by the platform.":
        {
            def: "Save settings to a markdown file. You will be notified when new settings arrive. You can set different files by the platform.",
            la: "Optiones in plicam markdown serva. Certior fies cum novae optiones advenient. Plicas diversas pro suggestu constituere potes.",
            zh: "将设置保存到一个 Markdown 文件中。当新设置到达时,您将收到通知。您可以根据平台设置不同的文件 ",
        },
    "Saving will be performed forcefully after this number of seconds.": {
        def: "Saving will be performed forcefully after this number of seconds.",
        la: "Servatio vi perficietur post hunc numerum secundorum.",
        zh: "在此秒数后将强制执行保存 ",
    },
    "Scan changes": {
        def: "Scan changes",
        la: "Perscrutare mutationes",
        zh: "扫描变更",
    },
    "Scan changes on customization sync": {
        def: "Scan changes on customization sync",
        la: "Perscrutare mutationes in synchronizatione optionum propriarum",
        zh: "在自定义同步时扫描更改",
    },
    "Scan customization automatically": {
        def: "Scan customization automatically",
        la: "Perscrutare optiones proprias automatice",
        zh: "自动扫描自定义设置",
    },
    "Scan customization before replicating.": {
        def: "Scan customization before replicating.",
        la: "Perscrutare optiones proprias ante replicationem.",
        zh: "在复制前扫描自定义设置 ",
    },
    "Scan customization every 1 minute.": {
        def: "Scan customization every 1 minute.",
        la: "Perscrutare optiones proprias singulis minutis.",
        zh: "每1分钟扫描自定义设置 ",
    },
    "Scan customization periodically": {
        def: "Scan customization periodically",
        la: "Perscrutare optiones proprias periodice",
        zh: "定期扫描自定义设置",
    },
    "Scan for hidden files before replication": {
        def: "Scan for hidden files before replication",
        la: "Quaere plicas occultas ante replicationem",
        zh: "复制前扫描隐藏文件",
    },
    "Scan hidden files periodically": {
        def: "Scan hidden files periodically",
        la: "Perscrutare plicas occultas periodice",
        zh: "定期扫描隐藏文件",
    },
    "Scan storage and database again": {
        def: "Scan storage and database again",
        la: "Perlustra iterum repositorium plicarum et repositorium",
        zh: "重新扫描存储与数据库",
    },
    "Searching ${current}/${total}...": {
        def: "Searching ${current}/${total}...",
        la: "Quaeritur ${current}/${total}...",
        zh: "正在搜索 ${current}/${total}...",
    },
    "Searching...": {
        def: "Searching...",
        la: "Quaeritur...",
        zh: "正在搜索...",
    },
    "Seconds, 0 to disable": {
        def: "Seconds, 0 to disable",
        la: "Secunda; 0 ad deactivandum",
        zh: "秒,0为禁用",
    },
    "Seconds. Saving to the local database will be delayed until this value after we stop typing or saving.": {
        def: "Seconds. Saving to the local database will be delayed until this value after we stop typing or saving.",
        la: "Secunda. Servatio in repositorium locale differetur usque ad hoc spatium postquam scribere vel servare desinimus.",
        zh: "秒。在我们停止输入或保存后,保存到本地数据库将延迟此值 ",
    },
    "Seconds. The maximum intentional wait from the first pending update before local database processing becomes due. This does not guarantee when database processing, network delivery, or reflection to another device will complete.":
        {
            def: "Seconds. The maximum intentional wait from the first pending update before local database processing becomes due. This does not guarantee when database processing, network delivery, or reflection to another device will complete.",
            la: "Secundae. Maxima exspectatio a prima mutatione nondum scripta antequam repositorium locale scribatur. Non praestat quando scriptura, transmissio per rete aut adventus in alio instrumento perficiatur.",
            zh: "秒。从第一次未写入的改动算起，最多等多久就写入本地数据库。这不保证写入数据库、网络传输或其他设备收到改动的完成时间。",
        },
    "Seconds. The quiet period after the latest pending update before local database processing becomes due.": {
        def: "Seconds. The quiet period after the latest pending update before local database processing becomes due.",
        la: "Secundae. Otium post ultimam mutationem antequam repositorium locale scribatur.",
        zh: "秒。最后一次改动之后，要停止编辑多久才写入本地数据库。",
    },
    "Secret Key": {
        def: "Secret Key",
        la: "Clavis secreta",
        zh: "私有访问密钥",
    },
    SELECT: {
        def: "SELECT",
        la: "ELIGE",
        zh: "选择",
    },
    "Self-hosted LiveSync cannot be initialised, exiting loading.": {
        def: "Tabularium could not be initialised; loading has stopped.",
        la: "Additamentum Tabularium initiari non potuit; oneratio desiit.",
        zh: "Tabularium 无法初始化，已停止加载。",
    },
    "Self-hosted LiveSync has paused remote synchronisation for compatibility review.": {
        def: "Tabularium has paused remote synchronisation for compatibility review.",
        la: "Tabularium synchronizationem remotam ad compatibilitatem recognoscendam intermisit.",
        zh: "Tabularium 已暂停远程同步，以进行兼容性检查。",
    },
    Send: {
        def: "Send",
        la: "Mitte",
        zh: "发送",
    },
    "Server URI": {
        def: "Server URI",
        la: "URI ministratoris",
        zh: "服务器 URI",
    },
    SESSION: {
        def: "SESSION",
        la: "SESSIO",
        zh: "会话",
    },
    "Should we keep folders that don't have any files inside?": {
        def: "Should we keep folders that don't have any files inside?",
        la: "Visne thecas servari quae nullas plicas continent?",
        zh: "我们是否应该保留内部没有任何文件的文件夹？",
    },
    "Should we only check for conflicts when a file is opened?": {
        def: "Should we only check for conflicts when a file is opened?",
        la: "Visne discrepantias solum inspici cum plica aperitur?",
        zh: "我们是否应该仅在文件打开时检查冲突？",
    },
    "Should we prompt you about conflicting files when a file is opened?": {
        def: "Should we prompt you about conflicting files when a file is opened?",
        la: "Visne te de plicis discrepantibus rogari cum plica aperitur?",
        zh: "当文件打开时,是否提示冲突文件？",
    },
    "Should we prompt you for every single merge, even if we can safely merge automatcially?": {
        def: "Should we prompt you for every single merge, even if we can safely merge automatcially?",
        la: "Visne te de singulis conflationibus rogari, etiam si automatice tuto conflari possunt?",
        zh: "即使我们可以安全地自动合并,是否也应该为每一次合并提示您？",
    },
    Show: {
        def: "Show",
        la: "Monstra",
        zh: "显示",
    },
    "Show history": {
        def: "Show history",
        la: "Monstra historiam",
        zh: "显示历史记录",
    },
    "Show log": {
        def: "Show log",
        la: "Monstra acta",
        zh: "显示日志",
    },
    "Show only notifications": {
        def: "Show only notifications",
        la: "Monstra nuntios tantum",
        zh: "仅显示通知",
    },
    "Show settings as a QR code": {
        def: "Show settings as a QR code",
        la: "Monstra configurationem ut codicem QR",
        zh: "以二维码显示设置",
    },
    "Show status as icons only": {
        def: "Show status as icons only",
        la: "Monstra statum iconibus tantum",
        zh: "仅以图标显示状态",
    },
    "Show status icon instead of file warnings banner": {
        def: "Show status icon instead of file warnings banner",
        la: "Monstra iconem status pro vexillo monitorum plicarum",
        zh: "显示状态图标，而非文件警告横幅",
    },
    "Show status inside the editor": {
        def: "Show status inside the editor",
        la: "Monstra statum intra editorem",
        zh: "在编辑器内显示状态",
    },
    "Show status on the status bar": {
        def: "Show status on the status bar",
        la: "Monstra statum in taenia status",
        zh: "在状态栏上显示状态",
    },
    "Show vault history": {
        def: "Show vault history",
        la: "Monstra historiam tabularii",
        zh: "显示库的历史记录",
    },
    "Show verbose log. Please enable if you report an issue.": {
        def: "Show verbose log. Please enable if you report an issue.",
        la: "Monstra acta prolixa. Quaeso activa si quaestionem refers.",
        zh: "显示详细日志。如果您报告问题,请启用此选项 ",
    },
    "Simple fetch and scan operation completed.": {
        def: "Fetch and scan completed.",
        la: "Arcessitio et perscrutatio perfectae sunt.",
        zh: "获取和扫描已完成。",
    },
    "Since you have chosen to overwrite all local files with remote data, **how would you like to handle local files that are not present in the remote database?**\n\n- **${DELETE_ALL}**: Local-only files and remote-deleted files will be removed.\n  This option will make your local vault exactly the same as the remote database, but please make sure you have a backup if there is any important data in your vault.\n- **${DELETE_NONE}**: All existing local files will be preserved.\n  This option will keep all your local files, but it may cause duplicates if there are files that exist on local but not on remote. You can clean up these duplicates manually after the synchronisation.":
        {
            def: "Since you have chosen to overwrite all local files with remote data, **how would you like to handle local files that are not present in the remote database?**\n\n- **${DELETE_ALL}**: Local-only files and remote-deleted files will be removed.\n  This option will make your local vault exactly the same as the remote database, but please make sure you have a backup if there is any important data in your vault.\n- **${DELETE_NONE}**: All existing local files will be preserved.\n  This option will keep all your local files, but it may cause duplicates if there are files that exist on local but not on remote. You can clean up these duplicates manually after the synchronisation.",
            la: "Quoniam omnes plicas locales datis remotis superscribere elegisti, **quomodo plicas locales tractare vis quae in repositorio remoto non adsunt?**\n\n- **${DELETE_ALL}**: plicae solum locales et plicae remote deletae removebuntur.\n  Haec optio tabularium tuum locale prorsus idem ac repositorium remotum reddet, sed quaeso cura ut exemplar tutelae habeas si qua data gravia in tabulario tuo sunt.\n- **${DELETE_NONE}**: omnes plicae locales exstantes servabuntur.\n  Haec optio omnes plicas tuas locales servabit, sed duplicata efficere potest si plicae localiter sed non remote exstant. Haec duplicata post synchronizationem manu purgare potes.",
            zh: "由于你选择了用远程数据覆盖所有本地文件，**远程数据库中不存在的本地文件应如何处理？**\n\n- **${DELETE_ALL}**：删除仅存在于本地的文件和远程已删除的文件。\n  此选项会让本地笔记库与远程数据库完全一致，但如果笔记库中有重要数据，请确保已做好备份。\n- **${DELETE_NONE}**：保留所有现有的本地文件。\n  此选项会保留所有本地文件，但如果有文件只存在于本地而不在远程，可能会产生重复。同步完成后可以手动清理这些重复文件。",
        },
    "Some files failed to synchronise. What would you like to do?": {
        def: "Some files failed to synchronise. What would you like to do?",
        la: "Quaedam plicae synchronizari non potuerunt. Quid facere vis?",
        zh: "部分文件同步失败。你想怎么做？",
    },
    "Some module has prevented the database from being ready. The database is initialised but not ready for use.": {
        def: "A module prevented the database from becoming ready. The database is initialised but not ready for use.",
        la: "Modulus quidam impedivit ne repositorium paratum fieret. Repositorium initiatum est, sed ad usum nondum paratum.",
        zh: "某个模块阻止了数据库就绪。数据库已初始化，但还不能使用。",
    },
    "Some requested chunks were not found in the remote database.": {
        def: "Some requested data chunks were not found on the server.",
        la: "Quaedam fragmenta petita in ministratore non inventa sunt.",
        zh: "服务器上找不到部分请求的数据块。",
    },
    "Something went wrong during synchronisation. Please check the log!": {
        def: "Something went wrong during synchronisation. Please check the log.",
        la: "Aliquid in synchronizatione erravit. Acta inspice.",
        zh: "同步时出错，请查看日志。",
    },
    "Something went wrong on balancing!": {
        def: "Error while balancing.",
        la: "Error in aequando.",
        zh: "平衡时出错。",
    },
    "Something went wrong on reading ${dispFilename}(${meta._id.substring(0, 8)}) from database:": {
        def: "Error while reading ${dispFilename} (${meta._id.substring(0, 8)}) from the database:",
        la: "Error in ${dispFilename} (${meta._id.substring(0, 8)}) ex repositorio legendo:",
        zh: "从数据库读取 ${dispFilename}（${meta._id.substring(0, 8)}）时出错：",
    },
    "Starts synchronisation when a file is saved.": {
        def: "Starts synchronisation when a file is saved.",
        la: "Synchronizationem incipit cum plica servatur.",
        zh: "当文件保存时启动同步 ",
    },
    Stat: {
        def: "Stat",
        la: "Status",
        zh: "统计",
    },
    Stats: {
        def: "Stats",
        la: "Statistica",
        zh: "统计",
    },
    "Stop reflecting database changes to storage files.": {
        def: "Stop reflecting database changes to storage files.",
        la: "Desine mutationes repositorii in plicas repositorii plicarum referre.",
        zh: "停止将数据库更改反映到存储文件 ",
    },
    "Stop watching for file changes.": {
        def: "Stop watching for file changes.",
        la: "Desine mutationes plicarum observare.",
        zh: "停止监视文件更改 ",
    },
    "STORAGE -> DB : ${file.path} has been skipped due to file size exceeding the limit": {
        def: "STORAGE -> DB: skipped ${file.path} because it exceeds the size limit",
        la: "Plicae -> repositorium: ${file.path} praetermissa est, quia magnitudinem finitam excedit",
        zh: "存储 -> 数据库：${file.path} 超过大小上限，已跳过",
    },
    "STORAGE ? DB : ${file.path} has been skipped due to file size exceeding the limit": {
        def: "STORAGE ? DB: skipped ${file.path} because it exceeds the size limit",
        la: "Plicae ? repositorium: ${file.path} praetermissa est, quia magnitudinem finitam excedit",
        zh: "存储 ? 数据库：${file.path} 超过大小上限，已跳过",
    },
    "STORAGE ? DB : Could not reconcile ${file.path}": {
        def: "STORAGE ? DB: could not reconcile ${file.path}",
        la: "Plicae ? repositorium: ${file.path} conciliari non potuit",
        zh: "存储 ? 数据库：无法协调 ${file.path}",
    },
    "STORAGE <- DB : ${file.path} has been skipped due to file size exceeding the limit": {
        def: "STORAGE <- DB: skipped ${file.path} because it exceeds the size limit",
        la: "Plicae <- repositorium: ${file.path} praetermissa est, quia magnitudinem finitam excedit",
        zh: "存储 <- 数据库：${file.path} 超过大小上限，已跳过",
    },
    "STORAGE <- DB : Cloud not read ${file.path}, possibly deleted": {
        def: "STORAGE <- DB: could not read ${file.path}; it may have been deleted",
        la: "Plicae <- repositorium: ${file.path} legi non potuit; fortasse deleta est",
        zh: "存储 <- 数据库：无法读取 ${file.path}，可能已被删除",
    },
    "Storage kept changing while saving ${path}; a fresh event is required": {
        def: "${path} kept changing in the vault while being saved; a new change event is required",
        la: "${path} dum servatur in tabulario mutari non desiit; novus eventus mutationis requiritur",
        zh: "保存 ${path} 时文件仍在不断变化，需要新的变更事件",
    },
    "Storage operation remains pending after a failure": {
        def: "A storage operation is still pending after a failure.",
        la: "Operatio repositorii post defectum adhuc pendet.",
        zh: "存储操作失败后仍在等待处理。",
    },
    "Suppress notification of hidden files change": {
        def: "Suppress notification of hidden files change",
        la: "Supprime nuntios de mutationibus plicarum occultarum",
        zh: "暂停隐藏文件更改的通知",
    },
    "Suspend database reflecting": {
        def: "Suspend database reflecting",
        la: "Suspende relationem repositorii",
        zh: "暂停数据库反映",
    },
    "Suspend file watching": {
        def: "Suspend file watching",
        la: "Suspende observationem plicarum",
        zh: "暂停文件监视",
    },
    "Suspending reflection: Database and storage changes will not be reflected in each other until completely finished the fetching.":
        {
            def: "Pausing reflection: changes in the database and in the vault will not be applied to each other until fetching has finished.",
            la: "Reflexio suspenditur: mutationes repositorii et tabularii inter se non applicabuntur donec arcessitio perfecta sit.",
            zh: "暂停相互应用：获取完成前，数据库与库中文件的更改不会互相应用。",
        },
    Sync: {
        def: "Sync",
        la: "Synchroniza",
        zh: "同步",
    },
    SYNC: {
        def: "SYNC",
        la: "SYNCHRONIZA",
        zh: "同步",
    },
    "Sync after merging file": {
        def: "Sync after merging file",
        la: "Synchroniza post plicam conflatam",
        zh: "合并文件后同步",
    },
    "Sync automatically after merging files": {
        def: "Sync automatically after merging files",
        la: "Synchroniza automatice post plicas conflatas",
        zh: "合并文件后自动同步",
    },
    "Sync Mode": {
        def: "Sync Mode",
        la: "Modus synchronizationis",
        zh: "同步模式",
    },
    "Sync on Editor Save": {
        def: "Sync on Editor Save",
        la: "Synchroniza cum editor servat",
        zh: "编辑器保存时同步",
    },
    "Sync on File Open": {
        def: "Sync on File Open",
        la: "Synchroniza cum plica aperitur",
        zh: "打开文件时同步",
    },
    "Sync on Save": {
        def: "Sync on Save",
        la: "Synchroniza cum servatur",
        zh: "保存时同步",
    },
    "Sync on Startup": {
        def: "Sync on Startup",
        la: "Synchroniza in initio",
        zh: "启动时同步",
    },
    "Synchronisation completed: ${processedCount} files processed (${completedCount} completed, ${skippedCount} skipped, ${failedCount} failed)":
        {
            def: "Synchronisation completed: ${processedCount} files processed (${completedCount} completed, ${skippedCount} skipped, ${failedCount} failed)",
            la: "Synchronizatio perfecta: ${processedCount} plicae tractatae (${completedCount} perfectae, ${skippedCount} omissae, ${failedCount} errores)",
            zh: "同步完成：处理了 ${processedCount} 个文件（完成 ${completedCount}，跳过 ${skippedCount}，出错 ${failedCount}）",
        },
    "Synchronisation Issues Detected": {
        def: "Synchronisation Issues Detected",
        la: "Difficultates synchronizationis detectae",
        zh: "检测到同步问题",
    },
    "tabularium.confirm.cancel": {
        def: "Cancel",
        la: "Abrogare",
        zh: "取消",
    },
    "tabularium.confirm.typeName": {
        def: "Type the vault name ${name} to confirm",
        la: "Nomen tabularii ${name} scribe ut confirmes",
        zh: "输入笔记库名称 ${name} 以确认",
    },
    "tabularium.conflict.base": {
        def: "This version",
        la: "Haec versio",
        zh: "这个版本",
    },
    "tabularium.conflict.conflicted": {
        def: "The other version",
        la: "Altera versio",
        zh: "另一个版本",
    },
    "tabularium.conflict.databaseRevision": {
        def: "Synchronised copy",
        la: "Exemplar synchronizatum",
        zh: "同步副本",
    },
    "tabularium.conflict.deleted": {
        def: "deleted",
        la: "deleta",
        zh: "已删除",
    },
    "tabularium.conflict.later": {
        def: "Decide later",
        la: "Postea statuere",
        zh: "稍后处理",
    },
    "tabularium.conflict.local": {
        def: "This device",
        la: "Hoc instrumentum",
        zh: "这台设备",
    },
    "tabularium.conflict.next": {
        def: "Next difference",
        la: "Differentia sequens",
        zh: "下一处差异",
    },
    "tabularium.conflict.pick": {
        def: "Choose a version",
        la: "Versionem elige",
        zh: "选择一个版本",
    },
    "tabularium.conflict.previous": {
        def: "Previous difference",
        la: "Differentia prior",
        zh: "上一处差异",
    },
    "tabularium.conflict.remote": {
        def: "Other device",
        la: "Aliud instrumentum",
        zh: "其他设备",
    },
    "tabularium.conflict.title": {
        def: "Conflicting changes",
        la: "Mutationes inter se pugnant",
        zh: "修改有冲突",
    },
    "tabularium.conflict.tooLarge": {
        def: "The differences are too large to show.",
        la: "Differentiae nimis magnae sunt ut ostendantur.",
        zh: "差异太大，无法显示。",
    },
    "tabularium.conflict.vaultAndDatabase": {
        def: "File and synchronised copy",
        la: "Plica et exemplar synchronizatum",
        zh: "文件与同步副本",
    },
    "tabularium.conflict.vaultFile": {
        def: "File in the vault",
        la: "Plica in tabulario",
        zh: "库中的文件",
    },
    "tabularium.editor.bold": {
        def: "Bold",
        la: "Crassum",
        zh: "粗体",
    },
    "tabularium.editor.bullet": {
        def: "Bulleted list",
        la: "Index punctatus",
        zh: "无序列表",
    },
    "tabularium.editor.clear": {
        def: "Clear formatting",
        la: "Formam remove",
        zh: "清除格式",
    },
    "tabularium.editor.code": {
        def: "Inline code",
        la: "Codex in linea",
        zh: "行内代码",
    },
    "tabularium.editor.format": {
        def: "Format",
        la: "Forma",
        zh: "格式",
    },
    "tabularium.editor.h1": {
        def: "Heading 1",
        la: "Titulus I",
        zh: "一级标题",
    },
    "tabularium.editor.h2": {
        def: "Heading 2",
        la: "Titulus II",
        zh: "二级标题",
    },
    "tabularium.editor.h3": {
        def: "Heading 3",
        la: "Titulus III",
        zh: "三级标题",
    },
    "tabularium.editor.h4": {
        def: "Heading 4",
        la: "Titulus IV",
        zh: "四级标题",
    },
    "tabularium.editor.h5": {
        def: "Heading 5",
        la: "Titulus V",
        zh: "五级标题",
    },
    "tabularium.editor.h6": {
        def: "Heading 6",
        la: "Titulus VI",
        zh: "六级标题",
    },
    "tabularium.editor.heading": {
        def: "Heading",
        la: "Titulus",
        zh: "标题",
    },
    "tabularium.editor.highlight": {
        def: "Highlight",
        la: "Illustratio",
        zh: "高亮",
    },
    "tabularium.editor.insert": {
        def: "Insert",
        la: "Insere",
        zh: "插入",
    },
    "tabularium.editor.insert.callout": {
        def: "Callout",
        la: "Monitum",
        zh: "提示块",
    },
    "tabularium.editor.insert.code": {
        def: "Code block",
        la: "Segmentum codicis",
        zh: "代码块",
    },
    "tabularium.editor.insert.divider": {
        def: "Divider",
        la: "Linea divisoria",
        zh: "分隔线",
    },
    "tabularium.editor.insert.flowchart": {
        def: "Flowchart",
        la: "Diagramma fluxus",
        zh: "流程图",
    },
    "tabularium.editor.insert.gantt": {
        def: "Gantt chart",
        la: "Diagramma Gantt",
        zh: "甘特图",
    },
    "tabularium.editor.insert.mathBlock": {
        def: "Formula block",
        la: "Formula separata",
        zh: "公式块",
    },
    "tabularium.editor.insert.mathInline": {
        def: "Inline formula",
        la: "Formula in linea",
        zh: "行内公式",
    },
    "tabularium.editor.insert.mindmap": {
        def: "Mind map",
        la: "Mappa mentis",
        zh: "思维导图",
    },
    "tabularium.editor.insert.sequence": {
        def: "Sequence diagram",
        la: "Diagramma seriei",
        zh: "时序图",
    },
    "tabularium.editor.insert.table": {
        def: "Table",
        la: "Tabula",
        zh: "表格",
    },
    "tabularium.editor.italic": {
        def: "Italic",
        la: "Obliquum",
        zh: "斜体",
    },
    "tabularium.editor.link": {
        def: "Link",
        la: "Nexus",
        zh: "链接",
    },
    "tabularium.editor.linkText": {
        def: "link",
        la: "nexus",
        zh: "链接",
    },
    "tabularium.editor.numbered": {
        def: "Numbered list",
        la: "Index numeratus",
        zh: "有序列表",
    },
    "tabularium.editor.quote": {
        def: "Quote",
        la: "Citatio",
        zh: "引用",
    },
    "tabularium.editor.strike": {
        def: "Strikethrough",
        la: "Linea transversa",
        zh: "删除线",
    },
    "tabularium.editor.task": {
        def: "Task list",
        la: "Index operum",
        zh: "任务列表",
    },
    "tabularium.editor.word.callout": {
        def: "Note",
        la: "Nota",
        zh: "提示",
    },
    "tabularium.editor.word.cell": {
        def: "Cell",
        la: "Cella",
        zh: "内容",
    },
    "tabularium.editor.word.end": {
        def: "End",
        la: "Finis",
        zh: "结束",
    },
    "tabularium.editor.word.heading": {
        def: "Heading",
        la: "Titulus",
        zh: "标题",
    },
    "tabularium.editor.word.idea": {
        def: "Idea",
        la: "Notio",
        zh: "想法",
    },
    "tabularium.editor.word.start": {
        def: "Start",
        la: "Initium",
        zh: "开始",
    },
    "tabularium.editor.word.step": {
        def: "Step",
        la: "Gradus",
        zh: "步骤",
    },
    "tabularium.editor.word.task": {
        def: "Task",
        la: "Opus",
        zh: "任务",
    },
    "tabularium.editor.word.topic": {
        def: "Topic",
        la: "Argumentum",
        zh: "主题",
    },
    "tabularium.help.connect.body": {
        def: "Open Connection and sign in with your account on the Tabularium server. Choose an existing vault or create a new one, name this device, and enter the vault's passphrase.\n\nAn existing vault is fetched to this device first; a new vault is filled from this device's files. To use another vault, choose Sign in again or change vault. Disconnect forgets the connection on this device only; the device stays listed on the server until it is removed there.\n\nDevice credentials last 30 days and renew themselves while the device is used.",
        la: "Aperi Conexionem et ratione tua in ministratore Tabularium intra. Tabularium exstans elige vel novum crea, instrumento nomen da et tesseram arcanam tabularii scribe.\n\nTabularium exstans primum ad hoc instrumentum arcessitur; novum ex plicis huius instrumenti impletur. Ut aliud tabularium adhibeas, 'Iterum intrare vel tabularium mutare' elige. Disiungere conexionem in hoc tantum instrumento obliviscitur.\n\nTesserae instrumenti triginta dies valent et dum adhibetur sponte renovantur.",
        zh: "打开「连接」，用 Tabularium 服务器上的账户登录。选择已有的笔记库或新建一个，填写设备名和笔记库的密码短语。\n\n已有的笔记库会先下载到这台设备；新建的笔记库由这台设备的文件填充。换用其他笔记库时点「重新登录或换笔记库」。「断开」只让这台设备忘记连接，服务器上的设备记录要在网页上删除。\n\n设备凭据有效期 30 天，设备在使用时会自动续期。",
    },
    "tabularium.help.connect.title": {
        def: "Connecting and changing vaults",
        la: "Coniungere et tabularium mutare",
        zh: "连接与更换笔记库",
    },
    "tabularium.help.errors.body": {
        def: "Credentials no longer valid: the device was removed on the server or its credentials expired. Sign in again.\n\nEncryption settings refused: this device's settings differ from the vault's. Disconnect and connect again.\n\nA rebuild is in progress: wait until the owner ends it on the web.\n\nA note does not synchronise: check the size limit and the excluded files under Sync, and look in the log.\n\nThe first synchronisation of a large vault takes a while; keep Obsidian open until the status shows Up to date.",
        la: "Tesserae non iam valent: instrumentum in ministratore remotum est vel tesserae exspiraverunt. Iterum intra.\n\nOptiones ciphrationis recusatae: optiones huius instrumenti a tabulario discrepant. Disiunge et iterum coniunge.\n\nReaedificatio agitur: exspecta donec dominus eam finiat.\n\nCommentarius non synchronizatur: modum magnitudinis et plicas exclusas in Synchronizatione inspice, et acta lege.\n\nPrima synchronizatio magni tabularii tempus requirit; Obsidian apertum tene donec 'Synchronizatum' ostendatur.",
        zh: "凭据失效：设备已在服务器上删除，或凭据过期。重新登录即可。\n\n加密设置被拒：这台设备的设置与笔记库不一致。断开后重新连接。\n\n正在重建：等所有者在网页上结束重建。\n\n某篇笔记不同步：检查「同步」中的大小上限和排除的文件，并查看日志。\n\n大的笔记库首次同步需要一段时间，保持 Obsidian 打开，直到状态显示「已同步」。",
    },
    "tabularium.help.errors.title": {
        def: "Common problems",
        la: "Difficultates frequentes",
        zh: "常见问题",
    },
    "tabularium.help.migrate.body": {
        def: "Tabularium can run beside the plug-in \"self-hosted-livesync\" in the same vault: each synchronises with its own server, and neither uses the other's local database, settings or flag files. To move your notes, connect to the vault on the Tabularium server that already holds them, so this device fetches it; then turn the old plug-in off, or keep it to synchronise with another server.\n\nIf the old plug-in also synchronises hidden files, exclude .obsidian/plugins/tabularium/ there: it holds this device's credentials.",
        la: 'Tabularium cum additamento "self-hosted-livesync" in eodem tabulario simul currere potest: utrumque cum suo ministratore synchronizat, neutrum repositorio locali, optionibus aut fasciculis signorum alterius utitur. Ut commentarios transferas, tabularium in ministratore Tabularii coniunge quod eos iam continet, ut hoc instrumentum id arcessat; deinde additamentum vetus exstingue, aut retine ut cum alio ministratore synchronizet.\n\nSi additamentum vetus etiam fasciculos occultos synchronizat, ibi .obsidian/plugins/tabularium/ exclude: ibi sunt credentialia huius instrumenti.',
        zh: "Tabularium 可以与插件「self-hosted-livesync」在同一个库中同时运行：两者各自同步到自己的服务器，互不使用对方的本地数据库、设置和标记文件。要把笔记迁到 Tabularium，连接 Tabularium 服务器上已经存有这些笔记的笔记库，这台设备会从服务器获取；之后可以关闭旧插件，也可以保留它同步到别的服务器。\n\n旧插件同时同步隐藏文件时，在它的设置中排除 .obsidian/plugins/tabularium/：那里存着这台设备的凭据。",
    },
    "tabularium.help.migrate.title": {
        def: "Moving from the old plug-in",
        la: "Ab additamento vetere migrare",
        zh: "从旧插件迁移",
    },
    "tabularium.help.passphrase.body": {
        def: "Notes are encrypted on each device with the vault's passphrase before they are sent; the server cannot read them. Every device of a vault uses the same passphrase.\n\nThe passphrase cannot be recovered. If it is lost, the notes on the server cannot be decrypted; devices that still have the files can create a new vault from them.",
        la: "Commentarii in quoque instrumento tessera arcana tabularii ciphrantur antequam mittantur; ministrator eos legere non potest. Omnia instrumenta eiusdem tabularii eadem tessera arcana utuntur.\n\nTessera arcana recuperari non potest. Si amittitur, commentarii in ministratore deciphrari non possunt; instrumenta quae plicas habent novum tabularium ex eis creare possunt.",
        zh: "笔记在每台设备上用笔记库的密码短语加密后才发送，服务器无法读取。同一个笔记库的所有设备使用同一个密码短语。\n\n密码短语无法找回。丢失后服务器上的笔记无法解密；仍有文件的设备可以用这些文件新建笔记库。",
    },
    "tabularium.help.passphrase.title": {
        def: "The vault passphrase",
        la: "Tessera arcana tabularii",
        zh: "笔记库的密码短语",
    },
    "tabularium.help.rebuild.body": {
        def: "A rebuild replaces the vault on the server with one device's files, for example to clean up old data. The owner authorises the device on the web (Account settings, Vaults and devices, Rebuild vault), then runs Overwrite the server with this device in Maintenance on that device.\n\nAfterwards the vault is locked. Each other device shows Vault locked and must fetch from the server. When all of them have fetched, unlock the vault here or on the web.",
        la: "Reaedificatio tabularium in ministratore plicis unius instrumenti substituit, exempli gratia ut vetera data purgentur. Dominus instrumentum in pagina interretiali permittit, deinde in eo 'Ministratorem ex hoc instrumento rescribere' in Cura agit.\n\nPostea tabularium clauditur. Cetera instrumenta 'Tabularium clausum' ostendunt et iterum arcessere debent. Cum omnia arcessiverint, hic vel in pagina interretiali resera.",
        zh: "重建用一台设备的文件替换服务器上的笔记库，例如清理旧数据。所有者先在网页（账户设置 → 笔记库与设备 → 重建笔记库）授权设备，再在那台设备的「维护」中执行「用这台设备覆盖服务器」。\n\n之后笔记库会被锁定。其他设备会显示「笔记库已锁定」，需要从服务器重新获取。都获取后，在这里或网页上解除锁定。",
    },
    "tabularium.help.rebuild.title": {
        def: "Rebuilding and unlocking",
        la: "Reaedificare et reserare",
        zh: "重建与解除锁定",
    },
    "tabularium.help.status.body": {
        def: "The status bar shows the connection and counters. Up to date means nothing is waiting. Changes waiting counts files that have not been sent yet; they are sent with the next synchronisation.\n\nWhen the device is offline, changes are kept and sent once it is back online. A failed synchronisation is explained in the log (Maintenance, Log).",
        la: "Vectigal status conexionem et numeros ostendit. 'Synchronizatum' significat nihil exspectare. 'Mutationes exspectant' numerat plicas nondum missas, quae proxima synchronizatione mittuntur.\n\nSine rete mutationes servantur et postea mittuntur. Causa defectus in actis scribitur (Cura, Acta).",
        zh: "状态栏显示连接状态和计数。「已同步」表示没有待处理的修改；「待处理」是还没发送的文件数，会在下次同步时发送。\n\n离线时修改会保留，恢复联网后发送。同步失败的原因记录在日志中（维护 → 日志）。",
    },
    "tabularium.help.status.title": {
        def: "What the sync status means",
        la: "Quid status synchronizationis significet",
        zh: "同步状态的含义",
    },
    "tabularium.history.binary": {
        def: "Binary file",
        la: "Plica binaria",
        zh: "二进制文件",
    },
    "tabularium.history.deleted": {
        def: "(The file was deleted in this version)",
        la: "(Hac versione plica deleta est)",
        zh: "（这个版本中文件已被删除）",
    },
    "tabularium.history.diffOnly": {
        def: "Differences only",
        la: "Differentiae tantum",
        zh: "只看差异",
    },
    "tabularium.history.matches": {
        def: "${current}/${total} matches",
        la: "${current}/${total} congruentiae",
        zh: "第 ${current}/${total} 处匹配",
    },
    "tabularium.history.next": {
        def: "Next",
        la: "Sequens",
        zh: "下一处",
    },
    "tabularium.history.previous": {
        def: "Previous",
        la: "Prior",
        zh: "上一处",
    },
    "tabularium.history.revision": {
        def: "Version ${current}/${total}",
        la: "Versio ${current}/${total}",
        zh: "第 ${current}/${total} 版",
    },
    "tabularium.history.revisions": {
        def: "${file} / ${count} revisions",
        la: "${file} / ${count} versiones",
        zh: "${file} / ${count} 个版本",
    },
    "tabularium.history.search": {
        def: "Search the last 100 versions",
        la: "In centum ultimis versionibus quaerere",
        zh: "在最近 100 个版本中搜索",
    },
    "tabularium.history.unreadable": {
        def: "This version could not be read",
        la: "Haec versio legi non potuit",
        zh: "无法读取这个版本",
    },
    "tabularium.kindle.contents": {
        def: "Contents",
        la: "Index rerum",
        zh: "目录",
    },
    "tabularium.kindle.fileMissing": {
        def: "File not found: ${path}",
        la: "Plica non inventa: ${path}",
        zh: "找不到文件：${path}",
    },
    "tabularium.kindle.missingImage": {
        def: "[Image: ${name}]",
        la: "[Imago: ${name}]",
        zh: "[图片：${name}]",
    },
    "tabularium.kindle.noNotes": {
        def: "There are no notes to send.",
        la: "Nulli commentarii mittendi sunt.",
        zh: "没有可发送的笔记。",
    },
    "tabularium.kindle.send": {
        def: "Send to Kindle",
        la: "In Kindle mitte",
        zh: "发送到 Kindle",
    },
    "tabularium.kindle.sendCurrent": {
        def: "Send current note to Kindle",
        la: "Mitte commentarium praesentem in Kindle",
        zh: "发送当前笔记到 Kindle",
    },
    "tabularium.kindle.sendFailed": {
        def: "Sending ${title} to Kindle failed: ${error}",
        la: "Missio ${title} in Kindle defecit: ${error}",
        zh: "发送《${title}》到 Kindle 失败：${error}",
    },
    "tabularium.kindle.sendingTo": {
        def: "Sending to ${address}; ${remaining} sends left today.",
        la: "Mittitur ad ${address}; hodie ${remaining} missiones restant.",
        zh: "发送到 ${address}，今天还可发送 ${remaining} 次。",
    },
    "tabularium.kindle.sendItems": {
        def: "Send ${count} items to Kindle",
        la: "Mitte ${count} res in Kindle",
        zh: "发送 ${count} 项到 Kindle",
    },
    "tabularium.kindle.sent": {
        def: "Sent ${title} to Kindle (${size} KB).",
        la: "${title} in Kindle missum (${size} KB).",
        zh: "已发送《${title}》到 Kindle（${size} KB）。",
    },
    "tabularium.kindle.serverStatus": {
        def: "Server status",
        la: "Status ministratoris",
        zh: "服务器状态",
    },
    "tabularium.kindle.settingDesc": {
        def: "View the Kindle delivery status. Right-click notes or folders in the file list (several can be selected) to send.",
        la: "Statum traditionis Kindle inspice. Commentarios vel capsas in indice plicarum dextro puncto preme (plures eligi possunt) ut mittas.",
        zh: "查看 Kindle 发送状态；在文件列表中右键笔记或文件夹（可多选）发送。",
    },
    "tabularium.kindle.signInFirst": {
        def: "Sign in to a Tabularium server first.",
        la: "Primum in ministratorem Tabularium inire.",
        zh: "请先登录 Tabularium 服务器。",
    },
    "tabularium.kindle.status": {
        def: "Kindle delivery status",
        la: "Status traditionis Kindle",
        zh: "Kindle 发送状态",
    },
    "tabularium.kindle.statusFailed": {
        def: "Reading the status failed (HTTP ${status}).",
        la: "Lectio status defecit (HTTP ${status}).",
        zh: "读取状态失败（HTTP ${status}）。",
    },
    "tabularium.links.check": {
        def: "Check broken links",
        la: "Nexus fractos inspicere",
        zh: "检查断链",
    },
    "tabularium.links.done": {
        def: "${fixed} links repaired.",
        la: "${fixed} nexus refecti.",
        zh: "已修复 ${fixed} 处链接。",
    },
    "tabularium.links.doneSkipped": {
        def: "${fixed} links repaired; ${skipped} skipped because the note changed meanwhile.",
        la: "${fixed} nexus refecti; ${skipped} praetermissi quia commentarius interea mutatus est.",
        zh: "已修复 ${fixed} 处链接；${skipped} 处因笔记期间被修改而跳过。",
    },
    "tabularium.links.leave": {
        def: "Leave as it is",
        la: "Relinquere",
        zh: "不修改",
    },
    "tabularium.links.noCandidate": {
        def: "No file of this name in the vault; repair it by hand.",
        la: "Nulla plica huius nominis in tabulario; manu refice.",
        zh: "笔记库中没有同名文件，请手动修改。",
    },
    "tabularium.links.none": {
        def: "No broken links in this vault.",
        la: "Nulli nexus fracti in hoc tabulario.",
        zh: "这个笔记库中没有断链。",
    },
    "tabularium.links.repair": {
        def: "Repair ${count} selected",
        la: "${count} electos reficere",
        zh: "修复所选的 ${count} 处",
    },
    "tabularium.links.title": {
        def: "${count} broken links",
        la: "${count} nexus fracti",
        zh: "${count} 处断链",
    },
    "tabularium.migration.done": {
        def: "Tabularium's local data now has names of its own. Synchronisation continues as before.",
        la: "Data localia Tabularii nunc nomina propria habent. Synchronizatio ut antea pergit.",
        zh: "Tabularium 的本机数据已换到自己的名字下，同步照常进行。",
    },
    "tabularium.migration.fetching": {
        def: "Tabularium now keeps its local data under names of its own, apart from other sync plug-ins. Fetching this vault from the server once; newer files win and files only on this device are kept.",
        la: "Tabularium nunc data sua localia sub nominibus propriis servat, ab aliis additamentis synchronizationis separata. Hoc tabularium semel a servitore repetitur: recentiora servantur, et quae in hoc solo instrumento sunt manent.",
        zh: "Tabularium 现在把本机数据放在自己的名字下，与其他同步插件分开。正在从服务器取回一次这个笔记库：较新的文件保留，只在本机的文件也保留。",
    },
    "tabularium.migration.waiting": {
        def: "Tabularium has not finished moving its local data to names of its own: the server cannot be reached (${reason}). Nothing synchronises until it can; the fetch starts by itself once the device is back online, or at the next start.",
        la: "Tabularium data sua localia nondum ad nomina propria transtulit: servitor attingi non potest (${reason}). Donec potest, nihil synchronizatur; repetitio sponte incipit cum instrumentum rursus conexum est, aut proximo initio.",
        zh: "Tabularium 还没有把本机数据换到自己的名字下：无法连接服务器（${reason}）。在此之前不同步；设备恢复联网后或下次启动时会自动取回。",
    },
    "tabularium.release.0.12.0": {
        def: "Tabularium names throughout the plug-in; large vaults synchronise reliably; misleading version notices removed.",
        la: "Nomina Tabularium ubique in additamento; magna tabularia certius synchronizantur; monita versionum fallacia remota.",
        zh: "插件中全部改用 Tabularium 的名称；大笔记库同步更可靠；去掉误导性的版本提示。",
    },
    "tabularium.release.0.13.0": {
        def: "One web application: home, web notes, Tabularius and administration.",
        la: "Una applicatio interretialis: domus, commentarii interretiales, Tabularius, administratio.",
        zh: "统一的网页应用：首页、云笔记、书记员与管理。",
    },
    "tabularium.release.0.14.0": {
        def: "Share a note or folder as an encrypted link from the file menu.",
        la: "Commentarium vel capsam ut nexum ciphratum ex indice plicarum communica.",
        zh: "在文件菜单中把笔记或文件夹分享为加密链接。",
    },
    "tabularium.release.0.15.0": {
        def: "Tabularius, the AI clerk, is set up on the web; web notes read like Obsidian.",
        la: "Tabularius, scriba artificialis, in pagina interretiali constituitur; commentarii interretiales ut in Obsidian leguntur.",
        zh: "书记员（Tabularius）在网页上设置；云笔记的阅读排版向 Obsidian 看齐。",
    },
    "tabularium.release.0.16.0": {
        def: "The server's settings, including mail for Send to Kindle, are changed on the web.",
        la: "Optiones ministratoris, etiam epistulae ad Kindle, in pagina interretiali mutantur.",
        zh: "服务器设置（包括发送到 Kindle 的发信）改在网页上修改。",
    },
    "tabularium.release.0.17.0": {
        def: "Tabularius answers with recipes: a model with its parameters and a prompt, set up by an administrator; conversations can adjust them.",
        la: "Tabularius per formulas respondet: exemplar cum parametris et praecepto ab administratore constitutum; colloquia ea aptare possunt.",
        zh: "书记员按配方回答：管理员设定的模型、参数与补充提示词组合，对话中可以微调。",
    },
    "tabularium.release.0.18.0": {
        def: "New settings page arranged by use: connection, sync, file sorting, Send to Kindle, appearance, maintenance and help.\nBuilt-in help and version history in three languages.\nConfirmations say what happens and what it means for other devices.\nUpstream entries that do not apply to a Tabularium server are gone: remote configuration, setup URIs and QR codes, onboarding, hidden-file and customisation sync, P2P.",
        la: "Nova pagina optionum ex usu disposita: conexio, synchronizatio, ordo plicarum, ad Kindle mittere, species, cura, auxilium.\nAuxilium et historia versionum tribus linguis.\nConfirmationes dicunt quid fiat et quid ceteris instrumentis significet.\nAditus originales qui ad ministratorem Tabularium non pertinent remoti sunt: configuratio remota, URI et codices QR, introductio, synchronizatio plicarum occultarum et additamentorum, P2P.",
        zh: "新的设置页按用途分为连接、同步、文件排序、发送到 Kindle、外观、维护和帮助。\n内置三语帮助与版本历史。\n确认对话框写明会发生什么、对其他设备的影响。\n去掉了不适用于 Tabularium 服务器的原版入口：远程配置、Setup URI 与二维码、引导向导、隐藏文件与自定义同步、P2P。",
    },
    "tabularium.release.0.18.1": {
        def: "One Latin vocabulary for the plug-in and the web pages.",
        la: "Unum vocabularium Latinum in additamento et paginis interretialibus.",
        zh: "插件与网页的拉丁语统一用词。",
    },
    "tabularium.release.0.18.2": {
        def: "Tabularius answers a new conversation with the recipe chosen before its first message.",
        la: "Tabularius novo colloquio formula ante primum nuntium electa respondet.",
        zh: "书记员的新对话按开始前选的配方回答。",
    },
    "tabularium.release.0.19.0": {
        def: '"Sync" in the file menu above "Sorting": sync now, and a note\'s version history; the setting texts and the history window that were still in English are translated. The server gains scheduled backups and a round of security fixes.',
        la: "In menu plicae supra «Ordo» nunc est «Synchronizatio»: synchroniza nunc et historia versionum commentarii; textus optionum et fenestra historiae adhuc Anglice scripti conversi sunt. Ministrator copias tutas statutis horis facit, et aliquot vitia securitatis emendata sunt.",
        zh: "文件右键菜单在「排序」上方新增「同步」：立即同步、笔记的历史版本；补齐了仍是英文的设置说明和历史版本窗口。服务器新增定时备份，并修复了一批安全问题。",
    },
    "tabularium.release.0.20.0": {
        def: "Tabularius answers read like notes (tables, code, Mermaid diagrams) and take attachments: pictures, text files and PDFs; web search is switched on per conversation. Web notes draws Mermaid diagrams, keeps the vault open when you come back from a citation, and opens linked notes at the top. Shared pages follow the sharer's colours.",
        la: "Responsa Tabularii ut commentarii ostenduntur (tabulae, codex, diagrammata Mermaid) et plicas accipiunt: imagines, plicas textus et PDF; quaestio in interrete per colloquium accenditur. Commentarii in interrete diagrammata Mermaid pingunt, tabularium apertum servant cum a citatione reverteris, et commentarios coniunctos ab initio aperiunt. Paginae communicatae colores communicantis sequuntur.",
        zh: "书记员的回答按笔记的样式显示（表格、代码、Mermaid 图），并可添加附件：图片、文本文件和 PDF；联网搜索按对话开启。云笔记画出 Mermaid 图，从引用回来时笔记库保持打开，打开链接的笔记从开头显示。分享页使用分享者的配色。",
    },
    "tabularium.release.0.21.0": {
        def: "Check broken links (Maintenance → Links, or the command palette) lists links that reach no file and repairs them with the files of the same name; automatic repair can be turned on for one device. Renames in web notes take links along. A share is refreshed only by the device that last saved it, follows renames and is withdrawn when its note is deleted.",
        la: "«Nexus fractos inspicere» (Cura → Nexus, aut index iussorum) nexus enumerat qui ad nullam plicam ducunt et eos plicis eiusdem nominis reficit; refectio sponte in uno instrumento accendi potest. Mutationes nominum in commentariis interretis nexus secum ferunt. Communicatio tantum ab instrumento quod eam ultimum servavit renovatur, nomina mutata sequitur et revocatur cum commentarius deletur.",
        zh: "「检查断链」（维护 → 链接，或命令面板）列出指向不存在文件的链接，并用同名文件修复；可以在一台设备上打开自动修复。云笔记改名时链接一起更新。分享只由最后保存它的设备更新，跟随改名，笔记删除后自动撤回。",
    },
    "tabularium.release.0.22.0": {
        def: "A quieter web interface with depth: the content floats as a sheet beside the sidebar, states are dots, actions are icons with their names in tooltips, large headings are set in a serif. Clerk conversations can be renamed, grouped into projects and archived from each conversation's menu. Web notes show the sync state beside the vault name and can fold the file tree away. Share pages draw Mermaid diagrams; code blocks are highlighted in about sixty languages.",
        la: "Facies interretialis quietior et profundior: contentum ut charta iuxta latus fluitat, status punctis, actiones iconibus cum nominibus in titulis, tituli magni litteris serifatis. Colloquia Tabularii renominari, in incepta disponi et in archivum reponi possunt ex indice cuiusque colloquii. Commentarii interretis statum synchronizationis iuxta nomen arcae ostendunt et indicem plicarum condere possunt. Paginae communicatae diagrammata Mermaid pingunt; codicis segmenta circiter sexaginta linguis colorantur.",
        zh: "网页界面更安静、有层次：内容区像一张纸浮在侧栏旁，状态用圆点，操作用图标、名称在悬浮提示里，大标题用衬线字体。书记员的对话可以在每个对话的菜单里重命名、归入项目、归档。云笔记的同步状态显示在笔记库名旁，文件树可以收起。分享页画出 Mermaid 图；代码块支持约六十种语言的着色。",
    },
    "tabularium.release.0.23.0": {
        def: "Selecting text in a note shows a format toolbar, and right-click offers an Insert submenu (tables, code blocks, Mermaid flowcharts, sequence diagrams, mind maps, Gantt charts, formulas, callouts, dividers); each is also a command. Web notes use the same actions and now edit in source, live render or split view, read rendered or as source, and draw $formulas$. Scroll bars are thin throughout the web pages.",
        la: "Textu in commentario selecto instrumenta formae apparent, et dextro clic submenu «Insere» praebet (tabulas, segmenta codicis, diagrammata Mermaid fluxus, seriei, mappas mentis, Gantt, formulas, monita, lineas divisorias); singula etiam iussa sunt. Commentarii interretis eisdem actionibus utuntur, et nunc in fonte, redditione viva aut conspectu diviso scribuntur, redditi aut ut fons leguntur, et $formulas$ pingunt. Virgae volvendi in paginis interretis tenues sunt.",
        zh: "在笔记中选中文字时浮出格式工具条，右键菜单有「插入」子菜单（表格、代码块、Mermaid 流程图、时序图、思维导图、甘特图、公式、提示块、分隔线），每一项也是命令。云笔记用同样的操作，并且可以用源码、即时渲染或分屏编辑，用渲染或源码阅读，显示 $公式$。网页里的滚动条都改为细条。",
    },
    "tabularium.release.0.23.1": {
        def: "Password managers no longer put their autofill button on the web pages' ordinary fields (the clerk's message box, searches, settings); sign-in and password fields work with them as before.",
        la: "Custodes tesserarum (ut Bitwarden) iam non in campis communibus paginarum interretis (capsa nuntii Tabularii, quaestiones, optiones) bullam suam implendi ponunt; campi ingressus et tesserae ut antea cum eis operantur.",
        zh: "密码管理器（如 Bitwarden）不再在网页的普通输入框（书记员输入框、查找框、各项设置）上出现自动填充按钮；登录与修改密码的输入框照常可以自动填充。",
    },
    "tabularium.release.0.24.0": {
        def: "Tabularius can use Gemini, DeepSeek and a local Ollama as model providers. Each account can keep several colour schemes of its own; the page tint now shades every layer evenly. Web notes greet with the notes changed last when none is open; proposals from the clerk show under its answer; password managers leave passphrases and keys alone.",
        la: "Tabularius Gemini, DeepSeek et Ollama localem ut praebitores exemplarium adhibere potest. Quisque usus plures rationes colorum suas servare potest; tinctura paginae omnes gradus aequaliter colorat. Commentarii interretis, nullo aperto, salutant et commentarios nuper mutatos ostendunt; propositiones scribae sub responso apparent; custodes tesserarum sententias arcanas et claves relinquunt.",
        zh: "Tabularius 可以使用 Gemini、DeepSeek 和本机的 Ollama 作为模型提供商。每个账户可以保存多套自己的配色方案；页面浓淡均匀地作用于各层。云笔记没有打开笔记时显示欢迎页和最近修改的笔记；书记员的提案显示在回答下方；密码管理器不再干扰密码短语和密钥输入框。",
    },
    "tabularium.release.0.24.1": {
        def: "The name on the sign-in page is readable with a dark sidebar scheme.",
        la: "Nomen in pagina ingressus legi potest cum ratione lateris obscuri.",
        zh: "使用深色侧栏的配色时，登录页上的名称不再看不清。",
    },
    "tabularium.release.0.24.2": {
        def: "Passphrases and keys typed on the web pages are shown as dots again (0.24.0 and 0.24.1 showed them as text). Restoring a scheduled backup works with the deployment's own Compose files.",
        la: "Sententiae arcanae et claves in paginis interretis rursus ut puncta apparent (0.24.0 et 0.24.1 eas ut textum ostendebant). Restitutio exemplorum statutorum cum ipsis Compose deploymentis plicis nunc operatur.",
        zh: "网页上输入的密码短语与密钥重新显示为圆点（0.24.0 和 0.24.1 显示为明文）。用部署本身的 Compose 文件恢复定时备份现在可以正常工作。",
    },
    "tabularium.release.0.24.3": {
        def: "Tabularius never fetches a web page from a host registered as forbidden among the SSH hosts, in any permission mode, including after a redirect.",
        la: "Tabularius paginam ab hospite inter hospites SSH ut vetito inscripto numquam petit, in nullo gradu potestatis, ne post redirectionem quidem.",
        zh: "SSH 主机中登记为禁止的主机，Tabularius 在任何档位都不会抓取指向它的网页（跳转之后也一样）。",
    },
    "tabularium.release.0.24.4": {
        def: "Each web page Tabularius fetches through the server opens its own connection, so a connection left open by an earlier fetch can no longer skip the address check of the permission mode or the forbidden hosts.",
        la: "Quaeque pagina quam Tabularius per ministratorem petit suum nexum aperit, ne nexus a priore petitione relictus examen inscriptionis gradus potestatis aut hospitum vetitorum praetereat.",
        zh: "Tabularius 经服务器抓取网页时每次新建连接，之前抓取留下的连接不能再跳过权限档位和禁止主机的地址检查。",
    },
    "tabularium.release.0.24.5": {
        def: "Code for upstream features that Tabularium had already switched off (peer-to-peer sync, the set-up wizard, Setup URIs and QR codes, hidden-file and customisation sync) is removed from the plug-in, along with about a thousand unused messages. A device whose settings still turn those features on keeps them off. The 0.20.0 entry of this history shows its text again.",
        la: "Codex functionum superiorum quae Tabularium iam exstinxerat (synchronizatio inter pares, ductor instituendi, Setup URI et codices QR, synchronizatio fasciculorum occultorum et accommodationum) ex additamento tollitur, una cum mille fere nuntiis non adhibitis. Instrumentum cuius optiones has functiones adhuc accendunt eas exstinctas servat. Pars 0.20.0 huius historiae textum suum iterum ostendit.",
        zh: "插件删除了 Tabularium 早已停用的上游功能代码（P2P 同步、引导向导、Setup URI 与二维码、隐藏文件与自定义同步），以及约一千条不再使用的词条。设置中仍开着这些功能的设备，它们保持关闭。本历史中 0.20.0 一条重新显示说明文字。",
    },
    "tabularium.release.0.25.0": {
        def: "The plug-in is about a fifth smaller. Its sync core is now part of Tabularium and keeps only the connection to the Tabularium server; the code for object storage and peer-to-peer sync is gone. A device whose settings still name object storage or peer-to-peer does not try to use them and connects through Tabularium as usual.",
        la: "Additamentum fere quinta parte minus est. Nucleus synchronizationis nunc pars Tabularii est et solum nexum cum ministratore Tabularii servat; codex repositorii obiectorum et synchronizationis inter pares sublatus est. Instrumentum cuius optiones adhuc repositorium obiectorum aut synchronizationem inter pares nominant eis non utitur et per Tabularium ut solet conectit.",
        zh: "插件小了约五分之一。同步核心并入 Tabularium，只保留与 Tabularium 服务器的连接，对象存储和 P2P 同步的代码已删除。设置里仍写着对象存储或 P2P 的设备不会去使用它们，照常通过 Tabularium 连接。",
    },
    "tabularium.release.0.3.0": {
        def: "Connect with a Tabularium login; Send to Kindle; web notes; credentials renew themselves.",
        la: "Conexio per rationem Tabularium; ad Kindle mittere; commentarii interretiales; tesserae sponte renovantur.",
        zh: "用 Tabularium 账户登录连接；发送到 Kindle；云笔记；凭据自动续期。",
    },
    "tabularium.release.0.4.0": {
        def: "Interface in English, Chinese and Latin; web notes can be edited.",
        la: "Interfacies Anglice, Sinice et Latine; commentarii interretiales emendari possunt.",
        zh: "界面支持英文、中文和拉丁语；云笔记可以编辑。",
    },
    "tabularium.release.0.5.0": {
        def: "Tabularius, the AI clerk, answers questions about a vault and proposes changes (0.5 to 0.11).",
        la: "Tabularius, scriba artificialis, de tabulario respondet et mutationes proponit (0.5 ad 0.11).",
        zh: "书记员（Tabularius）回答关于笔记库的问题并提出修改（0.5 至 0.11）。",
    },
    "tabularium.server.address": {
        def: "Server address",
        la: "Inscriptio ministratoris",
        zh: "服务器地址",
    },
    "tabularium.server.addressScheme": {
        def: "The server address must start with https:// or http://.",
        la: "Inscriptio ministratoris incipere debet ab https:// vel http://.",
        zh: "服务器地址须以 https:// 或 http:// 开头。",
    },
    "tabularium.server.command": {
        def: "Server connection",
        la: "Conexio ministratoris",
        zh: "服务器连接",
    },
    "tabularium.server.confirmPassphrase": {
        def: "Confirm E2EE passphrase",
        la: "Confirma tesseram arcanam E2EE",
        zh: "确认 E2EE 密码短语",
    },
    "tabularium.server.confirmPassword": {
        def: "Confirm new password",
        la: "Confirma tesseram novam",
        zh: "确认新密码",
    },
    "tabularium.server.connect": {
        def: "Connect",
        la: "Conecte",
        zh: "连接",
    },
    "tabularium.server.connectedTo": {
        def: "Connected to ${vault}",
        la: "Conexum ad ${vault}",
        zh: "已连接：${vault}",
    },
    "tabularium.server.credentialsInvalid": {
        def: "The Tabularium device credentials are no longer valid. Sign in again in Server connection.",
        la: "Testimonia instrumenti Tabularium non iam valida sunt. Iterum inire in “Conexio ministratoris”.",
        zh: "Tabularium 设备凭据已失效，请在「服务器连接」中重新登录。",
    },
    "tabularium.server.device": {
        def: "This device",
        la: "Hoc instrumentum",
        zh: "本设备",
    },
    "tabularium.server.deviceExpiry": {
        def: "${device}, credentials valid until ${date}",
        la: "${device}, testimonia valida usque ad ${date}",
        zh: "${device}，凭据有效期至 ${date}",
    },
    "tabularium.server.deviceName": {
        def: "Device name",
        la: "Nomen instrumenti",
        zh: "设备名称",
    },
    "tabularium.server.disconnect": {
        def: "Disconnect",
        la: "Disiunge",
        zh: "断开连接",
    },
    "tabularium.server.disconnected": {
        def: "Disconnected from the Tabularium server.",
        la: "A ministratore Tabularium disiunctum.",
        zh: "已断开 Tabularium 服务器。",
    },
    "tabularium.server.disconnectHint": {
        def: "Disconnecting only clears this device's connection settings; notes are kept. Revoke the device credentials in the console.",
        la: "Disiunctio tantum optiones conexionis huius instrumenti delet; commentarii retinentur. Testimonia instrumenti in consola revoca.",
        zh: "断开只清除本机的连接设置，笔记保留。服务器上的设备凭据请在控制台撤销。",
    },
    "tabularium.server.enforced": {
        def: "Tabularium requires end-to-end encryption and path obfuscation; those settings have been restored.",
        la: "Tabularium cryptationem ab extremo ad extremum et obscurationem viarum requirit; hae optiones restitutae sunt.",
        zh: "Tabularium 要求保持端到端加密和路径混淆，相关设置已恢复。",
    },
    "tabularium.server.firstLogin": {
        def: "The first sign-in requires a new password of at least 12 characters.",
        la: "Primus ingressus novam tesseram saltem 12 characterum requirit.",
        zh: "首次登录需要设置新的登录密码（至少 12 个字符）。",
    },
    "tabularium.server.invalidAddress": {
        def: "The server address is not valid.",
        la: "Inscriptio ministratoris non valida est.",
        zh: "服务器地址无效。",
    },
    "tabularium.server.newPassword": {
        def: "New password",
        la: "Tessera nova",
        zh: "新密码",
    },
    "tabularium.server.newVault": {
        def: "New vault",
        la: "Novum tabularium",
        zh: "新建笔记库",
    },
    "tabularium.server.newVaultName": {
        def: "New vault name",
        la: "Nomen novi tabularii",
        zh: "新笔记库名称",
    },
    "tabularium.server.notConnected": {
        def: "Sign in to a server to start synchronising.",
        la: "In ministratorem inire ut synchronizare incipias.",
        zh: "登录服务器以开始同步。",
    },
    "tabularium.server.notConnectedNotice": {
        def: "Tabularium is not connected to a server.",
        la: "Tabularium cum nullo ministratore conexum est.",
        zh: "Tabularium 未连接服务器。",
    },
    "tabularium.server.open": {
        def: "Open",
        la: "Aperi",
        zh: "打开",
    },
    "tabularium.server.openConnection": {
        def: "Open server connection",
        la: "Aperi conexionem ministratoris",
        zh: "打开服务器连接",
    },
    "tabularium.server.passphrase": {
        def: "E2EE passphrase",
        la: "Tessera arcana E2EE",
        zh: "E2EE 密码短语",
    },
    "tabularium.server.passphraseExisting": {
        def: "Enter the passphrase this vault uses on your other devices.",
        la: "Inscribe tesseram arcanam qua hoc tabularium in aliis instrumentis tuis utitur.",
        zh: "输入这个笔记库在其他设备上使用的 E2EE 密码短语。",
    },
    "tabularium.server.passphraseNew": {
        def: "Notes are encrypted on this device before upload; the server cannot read them. A lost passphrase cannot be recovered.",
        la: "Commentarii in hoc instrumento ante missionem sursum cryptantur; ministrator eos legere non potest. Tessera arcana amissa recuperari non potest.",
        zh: "笔记在本机加密后上传，服务器无法读取。密码短语遗失后无法找回笔记。",
    },
    "tabularium.server.passphraseRequired": {
        def: "An E2EE passphrase is required.",
        la: "Tessera arcana E2EE requiritur.",
        zh: "需要设置 E2EE 密码短语。",
    },
    "tabularium.server.passphrasesDiffer": {
        def: "The two passphrases do not match.",
        la: "Duae tesserae arcanae non congruunt.",
        zh: "两次输入的密码短语不一致。",
    },
    "tabularium.server.password": {
        def: "Password",
        la: "Tessera",
        zh: "登录密码",
    },
    "tabularium.server.passwordsDiffer": {
        def: "The two passwords do not match.",
        la: "Duae tesserae non congruunt.",
        zh: "两次输入的密码不一致。",
    },
    "tabularium.server.renewFailed": {
        def: "Renewing Tabularium credentials failed: ${error}",
        la: "Renovatio testimoniorum Tabularium defecit: ${error}",
        zh: "Tabularium 凭据续期失败：${error}",
    },
    "tabularium.server.resetFailed": {
        def: "The local database could not be reset; nothing was uploaded.",
        la: "Repositorium locale renovari non potuit; nihil sursum missum est.",
        zh: "无法重置本地数据库，没有上传任何内容。",
    },
    "tabularium.server.saveAndContinue": {
        def: "Save and continue",
        la: "Serva et perge",
        zh: "保存并继续",
    },
    "tabularium.server.server": {
        def: "Server",
        la: "Ministrator",
        zh: "服务器",
    },
    "tabularium.server.settingDesc": {
        def: "Sign in to a server, view the connection or disconnect.",
        la: "In ministratorem inire, conexionem inspice vel disiunge.",
        zh: "登录服务器、查看连接状态或断开连接。",
    },
    "tabularium.server.signIn": {
        def: "Sign in",
        la: "Inire",
        zh: "登录",
    },
    "tabularium.server.signInAgain": {
        def: "Sign in again",
        la: "Iterum inire",
        zh: "重新登录",
    },
    "tabularium.server.title": {
        def: "Tabularium server",
        la: "Ministrator Tabularium",
        zh: "Tabularium 服务器",
    },
    "tabularium.server.unreachable": {
        def: "Cannot reach the server. Check the address and the network.",
        la: "Ministrator attingi non potest. Inscriptionem et rete inspice.",
        zh: "无法连接服务器，请检查地址和网络。",
    },
    "tabularium.server.username": {
        def: "Username",
        la: "Nomen usoris",
        zh: "用户名",
    },
    "tabularium.server.vault": {
        def: "Vault",
        la: "Tabularium",
        zh: "笔记库",
    },
    "tabularium.server.vaultMissing": {
        def: "The vault does not exist.",
        la: "Tabularium non exstat.",
        zh: "笔记库不存在。",
    },
    "tabularium.serverError.Change initial password first": {
        def: "The initial password must be changed first.",
        la: "Tessera initialis primum mutanda est.",
        zh: "需要先修改初始密码。",
    },
    "tabularium.serverError.Daily Kindle delivery limit reached": {
        def: "Today's sends are used up.",
        la: "Missiones hodiernae consumptae sunt.",
        zh: "今天的发送次数已用完。",
    },
    "tabularium.serverError.Invalid current password": {
        def: "The current password is incorrect.",
        la: "Tessera praesens non recta est.",
        zh: "当前密码不正确。",
    },
    "tabularium.serverError.Invalid password": {
        def: "The new password needs at least 12 characters.",
        la: "Tessera nova saltem 12 characteres requirit.",
        zh: "新密码至少需要 12 个字符。",
    },
    "tabularium.serverError.Invalid username or password": {
        def: "The username or password is incorrect.",
        la: "Nomen usoris vel tessera non rectum est.",
        zh: "用户名或密码不正确。",
    },
    "tabularium.serverError.Kindle address not set": {
        def: "Enter your Kindle address on the Kindle page of the server console first.",
        la: "Primum inscriptionem Kindle tuam in pagina Kindle consolae ministratoris inscribe.",
        zh: "请先在服务器控制台的 Kindle 页面填写 Kindle 地址。",
    },
    "tabularium.serverError.Mail delivery is not configured": {
        def: "Kindle delivery is not set up on the server.",
        la: "Missio ad Kindle in ministratore nondum parata est.",
        zh: "服务器尚未配置推送。",
    },
    "tabularium.serverError.Request body too large": {
        def: "The book exceeds 50 MB. Send it in parts.",
        la: "Liber 50 MB excedit. Eum per partes mitte.",
        zh: "电子书超过 50 MB，请分开发送。",
    },
    "tabularium.serverError.Too many requests": {
        def: "Too many attempts. Try again later.",
        la: "Nimis multi conatus. Postea iterum conare.",
        zh: "尝试次数过多，请稍后再试。",
    },
    "tabularium.serverError.Vault is not ready": {
        def: "The vault is not ready yet. Retry provisioning in the server console.",
        la: "Tabularium nondum paratum est. Praeparationem in consola ministratoris iterum conare.",
        zh: "笔记库尚未创建完成，请在服务器控制台重试建库。",
    },
    "tabularium.settings.about": {
        def: "About",
        la: "De additamento",
        zh: "关于",
    },
    "tabularium.settings.aboutDesc": {
        def: 'Plug-in for a self-hosted Tabularium server, based on "self-hosted-livesync" by vorotamoroz (MIT licence).',
        la: 'Additamentum ministratoris Tabularium proprii, in "self-hosted-livesync" a vorotamoroz fundatum (licentia MIT).',
        zh: "自托管 Tabularium 服务器的插件，基于 vorotamoroz 的「self-hosted-livesync」（MIT 许可）。",
    },
    "tabularium.settings.advanced": {
        def: "Advanced",
        la: "Provecta",
        zh: "高级",
    },
    "tabularium.settings.advancedConflicts": {
        def: "Conflicts",
        la: "Discrepantiae",
        zh: "冲突",
    },
    "tabularium.settings.advancedDesc": {
        def: "Rarely needed. Change them only when the help or a diagnosis points to them.",
        la: "Raro necessaria. Muta tantum si auxilium vel diagnosis ea indicat.",
        zh: "很少需要。只在帮助或诊断提到时修改。",
    },
    "tabularium.settings.advancedFiles": {
        def: "Files",
        la: "Plicae",
        zh: "文件",
    },
    "tabularium.settings.advancedLog": {
        def: "Log",
        la: "Acta",
        zh: "日志",
    },
    "tabularium.settings.advancedSync": {
        def: "Synchronisation",
        la: "Synchronizatio",
        zh: "同步",
    },
    "tabularium.settings.advancedTransfer": {
        def: "Transfer",
        la: "Translatio",
        zh: "传输",
    },
    "tabularium.settings.appearance": {
        def: "Appearance",
        la: "Species",
        zh: "外观",
    },
    "tabularium.settings.autoLinks": {
        def: "Repair broken links automatically",
        la: "Nexus fractos sponte reficere",
        zh: "自动修复断链",
    },
    "tabularium.settings.autoLinksDesc": {
        def: "On this device only. About 10 seconds after changes arrive, links with exactly one file of the same name are repaired and logged; the others wait for Check broken links. Turn it on on one device that is usually running: two devices repairing the same notes can conflict.",
        la: "Tantum in hoc instrumento. Circiter 10 secundis post mutationes nexus cum una sola plica eiusdem nominis reficiuntur et in diario notantur; ceteri «Nexus fractos inspicere» exspectant. In uno instrumento plerumque currente accende: duo instrumenta eosdem commentarios reficientia confligere possunt.",
        zh: "只对这台设备生效。改动到达约 10 秒后，只有一个同名文件的断链会自动修复并写入日志，其余留给「检查断链」。请只在一台常开的设备上打开：两台设备同时修复同一篇笔记可能产生冲突。",
    },
    "tabularium.settings.broken": {
        def: "Find incomplete files",
        la: "Plicas imperfectas quaerere",
        zh: "查找不完整的文件",
    },
    "tabularium.settings.brokenDesc": {
        def: "Looks for notes whose data did not arrive completely and restores them from this device or the server.",
        la: "Commentarios quorum data non integra advenerunt quaerit et ex hoc instrumento vel ministratore restituit.",
        zh: "查找数据没有完整收到的笔记，从本机或服务器恢复。",
    },
    "tabularium.settings.changelog": {
        def: "Version history",
        la: "Historia versionum",
        zh: "版本历史",
    },
    "tabularium.settings.changeVault": {
        def: "Sign in again or change vault",
        la: "Iterum intrare vel tabularium mutare",
        zh: "重新登录或换笔记库",
    },
    "tabularium.settings.checkLinks": {
        def: "Check broken links",
        la: "Nexus fractos inspicere",
        zh: "检查断链",
    },
    "tabularium.settings.checkLinksDesc": {
        def: "Lists the links that reach no file, for example after a note was moved in a file manager or on another device, and offers the files of the same name as targets.",
        la: "Nexus enumerat qui ad nullam plicam ducunt (exempli gratia postquam commentarius in administratore plicarum aut in alio instrumento motus est), et plicas eiusdem nominis ut fines offert.",
        zh: "列出指向不存在文件的链接（例如笔记在文件管理器或另一台设备上被移动之后），并给出同名文件作为修复目标。",
    },
    "tabularium.settings.conflicts": {
        def: "Conflicts",
        la: "Discrepantiae",
        zh: "冲突",
    },
    "tabularium.settings.connection": {
        def: "Connection",
        la: "Conexio",
        zh: "连接",
    },
    "tabularium.settings.copy": {
        def: "Copy",
        la: "Exscribere",
        zh: "复制",
    },
    "tabularium.settings.diagnosis": {
        def: "Diagnosis",
        la: "Diagnosis",
        zh: "诊断",
    },
    "tabularium.settings.disconnectTitle": {
        def: "Disconnect this device?",
        la: "Hoc instrumentum disiungere?",
        zh: "断开这台设备？",
    },
    "tabularium.settings.doctor": {
        def: "Check settings",
        la: "Optiones inspicere",
        zh: "检查设置",
    },
    "tabularium.settings.doctorDesc": {
        def: "Looks for settings known to cause problems and offers to correct them.",
        la: "Optiones quae vitia afferre solent quaerit et emendationem offert.",
        zh: "查找已知会导致问题的设置，并提供修正。",
    },
    "tabularium.settings.editor": {
        def: "Editor",
        la: "Scriptor",
        zh: "编辑器",
    },
    "tabularium.settings.fetch": {
        def: "Fetch from the server",
        la: "A ministratore iterum arcessere",
        zh: "从服务器重新获取",
    },
    "tabularium.settings.fetch.newer-cleanup": {
        def: "Newer version wins; remove what was deleted on the server",
        la: "Recentior vincit; quae in ministratore deleta sunt hic quoque delentur",
        zh: "较新的版本优先，服务器上删除的本机也删除",
    },
    "tabularium.settings.fetch.newer-cleanupDesc": {
        def: "Each note keeps whichever copy was changed last. Notes deleted on the server are deleted here too.",
        la: "Quisque commentarius exemplar novissime mutatum servat. Commentarii in ministratore deleti hic quoque delentur.",
        zh: "每篇笔记保留最后修改的那份。服务器上已删除的笔记在本机也删除。",
    },
    "tabularium.settings.fetch.newer-keep": {
        def: "Newer version wins; keep all files here",
        la: "Recentior vincit; omnes plicae hic servantur",
        zh: "较新的版本优先，本机文件全部保留",
    },
    "tabularium.settings.fetch.newer-keepDesc": {
        def: "Each note keeps whichever copy was changed last. Nothing on this device is deleted, so notes deleted on the server come back and are synchronised again.",
        la: "Quisque commentarius exemplar novissime mutatum servat. Nihil hic deletur, itaque commentarii in ministratore deleti redeunt et iterum synchronizantur.",
        zh: "每篇笔记保留最后修改的那份。本机不删除任何文件，因此服务器上已删除的笔记会重新出现并再次同步。",
    },
    "tabularium.settings.fetch.remote-delete": {
        def: "The server wins; delete files only here",
        la: "Ministrator vincit; plicae tantum hic delentur",
        zh: "以服务器为准，删除只在本机的文件",
    },
    "tabularium.settings.fetch.remote-deleteDesc": {
        def: "This vault becomes exactly what the server has. Files that exist only on this device are deleted.",
        la: "Hoc tabularium fit idem atque in ministratore. Plicae tantum hic exstantes delentur.",
        zh: "这个库变得与服务器完全一致。只在本机的文件会被删除。",
    },
    "tabularium.settings.fetch.remote-keep": {
        def: "The server wins; keep files only here",
        la: "Ministrator vincit; plicae tantum hic servantur",
        zh: "以服务器为准，保留只在本机的文件",
    },
    "tabularium.settings.fetch.remote-keepDesc": {
        def: "Notes on the server replace the copies here. Files already on this device are all kept, which can leave duplicates to tidy up.",
        la: "Commentarii ministratoris exemplaria hic substituunt. Plicae hic exstantes omnes servantur, quod duplicata relinquere potest.",
        zh: "服务器上的笔记覆盖本机的副本。本机已有的文件全部保留，可能留下需要整理的重复文件。",
    },
    "tabularium.settings.fetchAction": {
        def: "Fetch and restart",
        la: "Arcessere et iterum incipere",
        zh: "重新获取并重启",
    },
    "tabularium.settings.fetchBody": {
        def: "The plug-in restarts, discards this device's local database and fetches the vault from the server. Choose how the notes on this device are reconciled with the server's.",
        la: "Additamentum iterum incipit, repositorium locale abicit et tabularium a ministratore arcessit. Elige quomodo commentarii huius instrumenti cum commentariis ministratoris concilientur.",
        zh: "插件会重启，丢弃这台设备的本地数据库，再从服务器获取笔记库。请选择本机笔记与服务器上的笔记如何对齐。",
    },
    "tabularium.settings.fetchDesc": {
        def: "Rebuilds this device's local database from the server. Use it after a rebuild on the server or when this device is out of step.",
        la: "Repositorium locale ex ministratore reaedificat. Post reaedificationem in ministratore vel si hoc instrumentum discrepat utere.",
        zh: "用服务器上的数据重建这台设备的本地数据库。服务器重建后，或这台设备同步异常时使用。",
    },
    "tabularium.settings.fetchImpact": {
        def: "Other devices are affected only when notes kept on this device are synchronised to the server again.",
        la: "Cetera instrumenta tantum afficiuntur si commentarii hic servati iterum ad ministratorem synchronizantur.",
        zh: "只有本机保留的笔记被再次同步到服务器时，才会影响其他设备。",
    },
    "tabularium.settings.fetchTitle": {
        def: "Fetch everything from the server?",
        la: "Omnia a ministratore arcessere?",
        zh: "从服务器重新获取全部？",
    },
    "tabularium.settings.formatToolbar": {
        def: "Format toolbar",
        la: "Instrumenta formae",
        zh: "格式工具条",
    },
    "tabularium.settings.formatToolbarDesc": {
        def: "Shows the format buttons of web notes over selected text on this device. The Insert submenu (right-click) and the commands stay available.",
        la: "In hoc instrumento, textu selecto, eadem instrumenta formae ac in commentariis interretis ostendit. Submenu «Insere» (dextro clic) et iussa manent.",
        zh: "在这台设备上，选中文字时显示与云笔记相同的格式按钮。右键的「插入」子菜单和命令面板中的命令不受影响。",
    },
    "tabularium.settings.help": {
        def: "Help",
        la: "Auxilium",
        zh: "帮助",
    },
    "tabularium.settings.kindle": {
        def: "Send to Kindle",
        la: "Ad Kindle mittere",
        zh: "发送到 Kindle",
    },
    "tabularium.settings.language": {
        def: "Language",
        la: "Lingua",
        zh: "语言",
    },
    "tabularium.settings.links": {
        def: "Links",
        la: "Nexus",
        zh: "链接",
    },
    "tabularium.settings.livePaused": {
        def: "Live sync is paused",
        la: "Synchronizatio viva suspensa est",
        zh: "实时同步已暂停",
    },
    "tabularium.settings.livePausedDesc": {
        def: "Changes stay on this device until you resume live sync or choose Sync now in the Sync menu. Resuming restores the synchronisation settings from before the pause.",
        la: "Mutationes in hoc instrumento manent donec synchronizationem vivam resumis aut «Synchroniza nunc» in indice «Synchronizatio» eligis. Resumpta synchronizatione, optiones synchronizationis ut ante suspensionem restituuntur.",
        zh: "修改先留在这台设备上，直到恢复实时同步，或在「同步」菜单中选择「立即同步」。恢复后，同步设置回到暂停之前的样子。",
    },
    "tabularium.settings.locked": {
        def: "Vault locked",
        la: "Tabularium clausum",
        zh: "笔记库已锁定",
    },
    "tabularium.settings.lockedAccepted": {
        def: "The vault was rebuilt on the server and this device has fetched it. Unlock it once every other device has fetched it too.",
        la: "Tabularium reaedificatum est et hoc instrumentum id arcessivit. Resera cum cetera quoque arcessiverint.",
        zh: "服务器上的笔记库已重建，这台设备已重新获取。其他设备也都重新获取后再解除锁定。",
    },
    "tabularium.settings.lockedNotAccepted": {
        def: "The vault was rebuilt on the server. This device must fetch it again before it can synchronise; then the vault can be unlocked.",
        la: "Tabularium in ministratore reaedificatum est. Hoc instrumentum id iterum arcessere debet antequam synchronizet; deinde reserari potest.",
        zh: "服务器上的笔记库已重建。这台设备需要先从服务器重新获取，之后才能同步；之后可以解除锁定。",
    },
    "tabularium.settings.log": {
        def: "Log",
        la: "Acta",
        zh: "日志",
    },
    "tabularium.settings.logDesc": {
        def: "What the plug-in did recently.",
        la: "Quae additamentum nuper egit.",
        zh: "插件最近做了什么。",
    },
    "tabularium.settings.maintenance": {
        def: "Maintenance",
        la: "Cura",
        zh: "维护",
    },
    "tabularium.settings.mode": {
        def: "Sync mode",
        la: "Modus synchronizationis",
        zh: "同步方式",
    },
    "tabularium.settings.modeDesc": {
        def: "Live: changes are sent and received as they happen. Periodic: every few seconds as set below. On events: when Obsidian starts, a file is saved or opened.",
        la: "Statim: mutationes simul mittuntur et accipiuntur. Per intervalla: quot secundis infra statuitur. Per eventus: cum Obsidian incipit vel plica servatur aut aperitur.",
        zh: "实时：修改随时收发。定时：按下面设置的间隔。按事件：在 Obsidian 启动、保存或打开文件时。",
    },
    "tabularium.settings.modeEvents": {
        def: "On events",
        la: "Per eventus",
        zh: "按事件",
    },
    "tabularium.settings.modeLive": {
        def: "Live",
        la: "Statim",
        zh: "实时",
    },
    "tabularium.settings.modePeriodic": {
        def: "Periodic",
        la: "Per intervalla",
        zh: "定时",
    },
    "tabularium.settings.needsConnection": {
        def: "Connect to a Tabularium server first.",
        la: "Primum cum ministratore Tabularium coniunge.",
        zh: "请先连接 Tabularium 服务器。",
    },
    "tabularium.settings.networkBanner": {
        def: "Show a banner",
        la: "Vexillum ostendere",
        zh: "显示横幅",
    },
    "tabularium.settings.networkHidden": {
        def: "Show nothing",
        la: "Nihil ostendere",
        zh: "不显示",
    },
    "tabularium.settings.networkIcon": {
        def: "Show an icon",
        la: "Iconem tantum ostendere",
        zh: "只显示图标",
    },
    "tabularium.settings.networkWarning": {
        def: "When offline",
        la: "Sine rete",
        zh: "离线时",
    },
    "tabularium.settings.notConnectedDesc": {
        def: "Sign in to a Tabularium server and choose a vault to synchronise this one with.",
        la: "In ministratorem Tabularium intra et tabularium elige quocum hoc synchronizetur.",
        zh: "登录 Tabularium 服务器并选择要与这个库同步的笔记库。",
    },
    "tabularium.settings.open": {
        def: "Open",
        la: "Aperire",
        zh: "打开",
    },
    "tabularium.settings.overwrite": {
        def: "Overwrite the server with this device",
        la: "Ministratorem ex hoc instrumento rescribere",
        zh: "用这台设备覆盖服务器",
    },
    "tabularium.settings.overwriteAction": {
        def: "Overwrite and restart",
        la: "Rescribere et iterum incipere",
        zh: "覆盖并重启",
    },
    "tabularium.settings.overwriteBody": {
        def: "The plug-in restarts and uploads this device's files as a new database for the vault. The server keeps the previous database, and the owner can switch back to it on the web.\n\nWithout the owner's authorisation for this device the server refuses, and nothing changes.",
        la: "Additamentum iterum incipit et plicas huius instrumenti ut novum repositorium tabularii mittit. Ministrator prius repositorium servat, ad quod dominus redire potest.\n\nSine permissu domini ministrator recusat neque quicquam mutatur.",
        zh: "插件会重启，把这台设备的文件上传为笔记库的新数据库。服务器保留原来的数据库，所有者可以在网页上切回。\n\n这台设备没有得到所有者授权时，服务器会拒绝，不会有任何改变。",
    },
    "tabularium.settings.overwriteDesc": {
        def: "Replaces the vault on the server with this device's files. The vault's owner must first authorise this device under Account settings, Vaults and devices, Rebuild vault, on the web.",
        la: "Tabularium in ministratore plicis huius instrumenti substituit. Dominus prius hoc instrumentum in pagina interretiali permittere debet: Optiones rationis, Tabularia et instrumenta, Tabularium reaedificare.",
        zh: "用这台设备的文件替换服务器上的笔记库。需要笔记库所有者先在网页「账户设置 → 笔记库与设备 → 重建笔记库」中授权这台设备。",
    },
    "tabularium.settings.overwriteImpact": {
        def: "The vault is locked afterwards: every other device must fetch it from the server again, and changes on them that were not synchronised are lost.",
        la: "Postea tabularium clauditur: cetera instrumenta id iterum arcessere debent, et mutationes non synchronizatae amittuntur.",
        zh: "之后笔记库会被锁定：其他每台设备都要从服务器重新获取，它们上面未同步的修改会丢失。",
    },
    "tabularium.settings.overwriteTitle": {
        def: "Overwrite the vault on the server?",
        la: "Tabularium in ministratore rescribere?",
        zh: "覆盖服务器上的笔记库？",
    },
    "tabularium.settings.pending": {
        def: "${count} changes waiting",
        la: "${count} mutationes exspectant",
        zh: "${count} 项待处理",
    },
    "tabularium.settings.recovery": {
        def: "Recovery",
        la: "Restitutio",
        zh: "恢复",
    },
    "tabularium.settings.report": {
        def: "Diagnostic report",
        la: "Relatio diagnostica",
        zh: "诊断报告",
    },
    "tabularium.settings.reportDesc": {
        def: "Settings, versions and the recent log for asking for help. Passwords, the passphrase and the server address are left out.",
        la: "Optiones, versiones et acta recentia ad auxilium petendum. Tesserae, tessera arcana et inscriptio ministratoris omittuntur.",
        zh: "用于求助的设置、版本与最近日志。不含密码、密码短语和服务器地址。",
    },
    "tabularium.settings.resetLocal": {
        def: "Delete the local database",
        la: "Basim localem delere",
        zh: "删除本地数据库",
    },
    "tabularium.settings.resetLocalAction": {
        def: "Delete",
        la: "Delere",
        zh: "删除",
    },
    "tabularium.settings.resetLocalBody": {
        def: "The notes in this vault are not deleted. Until you fetch from the server, this device does not synchronise.",
        la: "Commentarii huius tabularii non delentur. Donec a ministratore arcessas, hoc instrumentum non synchronizat.",
        zh: "这个库中的笔记不会被删除。从服务器重新获取之前，这台设备不会同步。",
    },
    "tabularium.settings.resetLocalDesc": {
        def: "Deletes this device's copy of the synchronisation data. The notes themselves stay; fetch from the server afterwards.",
        la: "Exemplar datorum synchronizationis in hoc instrumento delet; commentarii ipsi manent; postea a ministratore arcesse.",
        zh: "删除这台设备上的同步数据副本，笔记文件本身保留；之后从服务器重新获取。",
    },
    "tabularium.settings.resetLocalTitle": {
        def: "Delete the local database?",
        la: "Basim localem delere?",
        zh: "删除本地数据库？",
    },
    "tabularium.settings.resolveAll": {
        def: "Resolve all conflicts with the newer version",
        la: "Omnes discrepantias recentiore versione solvere",
        zh: "所有冲突都保留较新的版本",
    },
    "tabularium.settings.resolveAllDesc": {
        def: "For every note with a conflict, keeps the most recently modified version.",
        la: "In omni commentario discrepantiam habente versionem recentissimam servat.",
        zh: "对每篇有冲突的笔记，保留最后修改的版本。",
    },
    "tabularium.settings.resolveAllImpact": {
        def: "The older version of every conflicting note is discarded on all devices; this cannot be undone here.",
        la: "Versio vetustior cuiusque commentarii discrepantis in omnibus instrumentis abicitur; hic revocari non potest.",
        zh: "每篇冲突笔记的较旧版本都会被丢弃，所有设备都一样，这里无法撤销。",
    },
    "tabularium.settings.run": {
        def: "Run",
        la: "Agere",
        zh: "运行",
    },
    "tabularium.settings.sorting": {
        def: "File sorting",
        la: "Ordo plicarum",
        zh: "文件排序",
    },
    "tabularium.settings.state.error": {
        def: "Synchronisation failed; see the log",
        la: "Synchronizatio defecit; vide acta",
        zh: "同步出错，请查看日志",
    },
    "tabularium.settings.state.idle": {
        def: "Up to date",
        la: "Synchronizatum",
        zh: "已同步",
    },
    "tabularium.settings.state.live": {
        def: "Connected, changes sync as they happen",
        la: "Conexum; mutationes statim synchronizantur",
        zh: "已连接，修改即时同步",
    },
    "tabularium.settings.state.stopped": {
        def: "Not synchronising",
        la: "Non synchronizatur",
        zh: "未在同步",
    },
    "tabularium.settings.state.syncing": {
        def: "Synchronising",
        la: "Synchronizatur",
        zh: "正在同步",
    },
    "tabularium.settings.status": {
        def: "Status",
        la: "Status",
        zh: "同步状态",
    },
    "tabularium.settings.suspend": {
        def: "Restart with sync paused",
        la: "Synchronizatione suspensa iterum incipere",
        zh: "暂停同步并重启",
    },
    "tabularium.settings.suspendAction": {
        def: "Pause and restart",
        la: "Suspendere et iterum incipere",
        zh: "暂停并重启",
    },
    "tabularium.settings.suspendDesc": {
        def: "Restarts the plug-in with all synchronisation and file watching paused, for when something keeps going wrong. Resume with the command Toggle All Sync.",
        la: "Additamentum iterum incipit omni synchronizatione et observatione plicarum suspensa. Mandato 'Commuta omnem synchronizationem' resumitur.",
        zh: "重启插件，并暂停全部同步与文件监视，用于问题反复出现时。用命令「开关全部同步」恢复。",
    },
    "tabularium.settings.sync": {
        def: "Sync",
        la: "Synchronizatio",
        zh: "同步",
    },
    "tabularium.settings.syncIgnoreRegEx": {
        def: "Files not to synchronise",
        la: "Plicae non synchronizandae",
        zh: "不同步的文件",
    },
    "tabularium.settings.syncIgnoreRegExDesc": {
        def: "Regular expressions on the file path, one per line; matching files are neither sent nor received.",
        la: "Expressiones regulares in via plicae, una per lineam; plicae congruentes nec mittuntur nec accipiuntur.",
        zh: "按文件路径匹配的正则表达式，每行一个；匹配的文件既不发送也不接收。",
    },
    "tabularium.settings.syncNow": {
        def: "Sync now",
        la: "Nunc synchronizare",
        zh: "立即同步",
    },
    "tabularium.settings.syncOnlyRegEx": {
        def: "Synchronise only these files",
        la: "Has tantum plicas synchronizare",
        zh: "只同步这些文件",
    },
    "tabularium.settings.syncOnlyRegExDesc": {
        def: "Regular expressions on the file path, one per line. When set, only matching files are synchronised.",
        la: "Expressiones regulares in via plicae, una per lineam. Si positae, tantum plicae congruentes synchronizantur.",
        zh: "按文件路径匹配的正则表达式，每行一个。填写后只同步匹配的文件。",
    },
    "tabularium.settings.unlock": {
        def: "Unlock",
        la: "Reserare",
        zh: "解除锁定",
    },
    "tabularium.settings.unlockBody": {
        def: "All devices can synchronise with the vault again.",
        la: "Omnia instrumenta iterum cum tabulario synchronizare poterunt.",
        zh: "所有设备都可以再与这个笔记库同步。",
    },
    "tabularium.settings.unlockDesc": {
        def: "Ends the lock a rebuild leaves on the vault.",
        la: "Clausuram quam reaedificatio relinquit finit.",
        zh: "结束重建后笔记库上的锁定。",
    },
    "tabularium.settings.unlockImpact": {
        def: "A device that has not fetched the vault since the rebuild may then send old data back to the server.",
        la: "Instrumentum quod post reaedificationem tabularium non arcessivit vetera data ad ministratorem remittere potest.",
        zh: "重建后还没有重新获取的设备，解锁后可能把旧数据发回服务器。",
    },
    "tabularium.settings.unlockTitle": {
        def: "Unlock the vault?",
        la: "Tabularium reserare?",
        zh: "解除笔记库锁定？",
    },
    "tabularium.settings.version": {
        def: "Tabularium ${version}",
        la: "Tabularium ${version}",
        zh: "Tabularium ${version}",
    },
    "tabularium.settings.whatSyncs": {
        def: "What is synchronised",
        la: "Quae synchronizantur",
        zh: "同步范围",
    },
    "tabularium.sorting.apply": {
        def: "Apply sorting rules",
        la: "Adhibe regulas ordinandi",
        zh: "应用排序规则",
    },
    "tabularium.sorting.applyButton": {
        def: "Apply",
        la: "Adhibe",
        zh: "应用",
    },
    "tabularium.sorting.applyDesc": {
        def: "Read sorting-spec from your notes and update the file explorer.",
        la: "Lege sorting-spec ex commentariis tuis et indicem plicarum renova.",
        zh: "从笔记中读取 sorting-spec 并更新文件列表。",
    },
    "tabularium.sorting.bookmarks": {
        def: "Order by bookmarks",
        la: "Ordinare per signa libri",
        zh: "按书签排序",
    },
    "tabularium.sorting.bookmarksDesc": {
        def: "Uses the order of items in a group of the core Bookmarks plug-in, so items can be arranged by dragging them there.",
        la: "Ordine rerum in grege additamenti 'Signa libri' utitur, ut res illic trahendo disponantur.",
        zh: "使用 Obsidian 核心插件「书签」中某个分组里的顺序，这样可以通过在书签中拖动来排列。",
    },
    "tabularium.sorting.bookmarksGroup": {
        def: "Bookmarks group",
        la: "Grex signorum",
        zh: "书签分组",
    },
    "tabularium.sorting.bookmarksGroupDesc": {
        def: "The group in Bookmarks whose order is used.",
        la: "Grex signorum cuius ordo adhibetur.",
        zh: "使用其顺序的书签分组。",
    },
    "tabularium.sorting.bookmarksMenus": {
        def: "Bookmark menu items",
        la: "Res indicis signorum",
        zh: "书签菜单项",
    },
    "tabularium.sorting.bookmarksMenusDesc": {
        def: "Adds items to the file explorer's right-click menu for adding files and folders to that group.",
        la: "Res in indicem dextri clici addit ut plicae et capsae ei gregi addantur.",
        zh: "在文件列表的右键菜单中加入把文件和文件夹加入该分组的菜单项。",
    },
    "tabularium.sorting.command": {
        def: "Open file sorting settings",
        la: "Aperi optiones ordinandi plicas",
        zh: "打开文件排序设置",
    },
    "tabularium.sorting.contextMenu": {
        def: "Sorting menu in the file explorer",
        la: "Index ordinandi in indice plicarum",
        zh: "文件列表中的排序菜单",
    },
    "tabularium.sorting.contextMenuDesc": {
        def: "Adds applying and pausing sorting to the file explorer's right-click menu.",
        la: "Adhibere et suspendere ordinem in indicem dextri clici addit.",
        zh: "在文件列表的右键菜单中加入应用与暂停排序。",
    },
    "tabularium.sorting.delay": {
        def: "Delay at start (seconds)",
        la: "Mora initio (secundae)",
        zh: "启动后延迟（秒）",
    },
    "tabularium.sorting.delayDesc": {
        def: "Seconds to wait after Obsidian starts before sorting, 0 to 30. Increase it if sorting is not applied on large vaults or on mobile.",
        la: "Quot secundis post initium Obsidian exspectetur antequam ordinetur, 0 ad 30. Auge si in magnis tabulariis vel telephono ordo non adhibetur.",
        zh: "Obsidian 启动后等待多少秒再排序，0 到 30。大笔记库或手机上排序没有生效时调大。",
    },
    "tabularium.sorting.indexNote": {
        def: "Folder note name",
        la: "Nomen commentarii capsae",
        zh: "文件夹笔记名称",
    },
    "tabularium.sorting.indexNoteDesc": {
        def: "If each folder describes itself in a note with a fixed name inside it (such as index), enter that name; its sorting rules and metadata are read too.",
        la: "Si quaeque capsa se in commentario nominis certi (ut index) describit, hoc nomen scribe; regulae et metadata eius quoque leguntur.",
        zh: "如果每个文件夹用其中一篇固定名称的笔记（如 index）描述自身，在此填写这个名称，也会读取其中的排序规则和元数据。",
    },
    "tabularium.sorting.notReady": {
        def: "File sorting is still starting; open this page again in a moment.",
        la: "Ordo fasciculorum adhuc incipit; hanc paginam mox iterum aperi.",
        zh: "文件排序仍在启动，稍后再打开这一页。",
    },
    "tabularium.sorting.parseFailed": {
        def: "The sorting rules could not be parsed; sorting is paused. ${detail}",
        la: "Regulae ordinandi interpretari non potuerunt; ordinatio suspensa est. ${detail}",
        zh: "排序规则解析失败，排序已暂停。${detail}",
    },
    "tabularium.sorting.pause": {
        def: "Pause",
        la: "Intermitte",
        zh: "暂停",
    },
    "tabularium.sorting.settingDesc": {
        def: "Arrange notes and folders using sorting rules or bookmarks.",
        la: "Commentarios et capsas secundum regulas ordinandi vel signacula dispone.",
        zh: "按排序规则或书签排列笔记和文件夹。",
    },
    "tabularium.sorting.specFile": {
        def: "Additional rule notes",
        la: "Commentarii regularum additi",
        zh: "额外的规则笔记",
    },
    "tabularium.sorting.specFileDesc": {
        def: "Names or paths of notes whose front matter holds sorting rules, besides sortspec notes and folder notes. Apply the rules again after changing it.",
        la: "Nomina vel viae commentariorum quorum praefatio regulas ordinandi continet, praeter commentarios sortspec et commentarios capsarum. Post mutationem regulas iterum adhibe.",
        zh: "除 sortspec 笔记和文件夹笔记外，另外读取排序规则（front matter）的笔记名称或路径。修改后重新应用规则。",
    },
    "tabularium.sorting.standalone": {
        def: "Custom File Explorer sorting is enabled in this vault and sorts the file explorer, so the built-in file sorting stays off. If you disable it, the built-in sorting returns the next time Tabularium loads.",
        la: "In hoc tabulario Custom File Explorer sorting adhibetur et indicem plicarum ordinat, itaque ordinatio interna non adhibetur. Si id deactivas, ordinatio interna proximo Tabularii initio redit.",
        zh: "这个笔记库启用了 Custom File Explorer sorting，文件列表由它排序，内置的文件排序不启用。停用它之后，下次加载 Tabularium 时内置排序恢复。",
    },
    "tabularium.sorting.statusBar": {
        def: "Show in the status bar",
        la: "In vectigali status ostendere",
        zh: "在状态栏显示",
    },
    "tabularium.sorting.statusBarDesc": {
        def: "Shows whether file sorting is on.",
        la: "Ostendit utrum ordo plicarum adhibeatur.",
        zh: "显示文件排序是否开启。",
    },
    "tabularium.sorting.statusOff": {
        def: "Sorting: off",
        la: "Ordo: suspensus",
        zh: "排序：关",
    },
    "tabularium.sorting.statusOn": {
        def: "Sorting: on",
        la: "Ordo: adhibetur",
        zh: "排序：开",
    },
    "tabularium.sorting.title": {
        def: "Tabularium file sorting",
        la: "Ordinatio plicarum Tabularium",
        zh: "Tabularium 文件排序",
    },
    "tabularium.sorting.ui.apply": {
        def: "Apply sorting",
        la: "Ordinem adhibere",
        zh: "应用排序",
    },
    "tabularium.sorting.ui.applyFlat": {
        def: "Sorting: apply",
        la: "Ordo: adhibere",
        zh: "排序：应用",
    },
    "tabularium.sorting.ui.bookmark": {
        def: "Add to the sorting bookmarks",
        la: "Signis ordinandi addere",
        zh: "加入排序书签",
    },
    "tabularium.sorting.ui.bookmarkFlat": {
        def: "Sorting: add to the bookmarks",
        la: "Ordo: signis addere",
        zh: "排序：加入书签",
    },
    "tabularium.sorting.ui.bookmarkSelected": {
        def: "Sorting: add the selection to the bookmarks",
        la: "Ordo: delecta signis addere",
        zh: "排序：把所选项目加入书签",
    },
    "tabularium.sorting.ui.bookmarkSelectedFlat": {
        def: "Add the selection to the sorting bookmarks",
        la: "Delecta signis ordinandi addere",
        zh: "把所选项目加入排序书签",
    },
    "tabularium.sorting.ui.bookmarkSiblings": {
        def: "Add it and its siblings to the sorting bookmarks",
        la: "Id et cognata signis ordinandi addere",
        zh: "连同同级项目加入排序书签",
    },
    "tabularium.sorting.ui.bookmarkSiblingsFlat": {
        def: "Sorting: add it and its siblings to the bookmarks",
        la: "Ordo: id et cognata signis addere",
        zh: "排序：连同同级项目加入书签",
    },
    "tabularium.sorting.ui.commandOff": {
        def: "Pause file sorting",
        la: "Ordinem plicarum suspendere",
        zh: "暂停文件排序",
    },
    "tabularium.sorting.ui.commandOn": {
        def: "Apply file sorting, reading the sorting rules again",
        la: "Ordinem plicarum adhibere, regulis iterum lectis",
        zh: "重新读取排序规则并应用文件排序",
    },
    "tabularium.sorting.ui.submenu": {
        def: "Sorting",
        la: "Ordo",
        zh: "排序",
    },
    "tabularium.sorting.ui.suspend": {
        def: "Pause sorting",
        la: "Ordinem suspendere",
        zh: "暂停排序",
    },
    "tabularium.sorting.ui.suspendFlat": {
        def: "Sorting: pause",
        la: "Ordo: suspendere",
        zh: "排序：暂停",
    },
    "tabularium.sorting.ui.toggle": {
        def: "Turn file sorting on or off",
        la: "Ordinem plicarum commutare",
        zh: "开关文件排序",
    },
    "tabularium.sorting.ui.unbookmark": {
        def: "Remove from the sorting bookmarks",
        la: "E signis ordinandi removere",
        zh: "从排序书签中移除",
    },
    "tabularium.sorting.ui.unbookmarkFlat": {
        def: "Sorting: remove from the bookmarks",
        la: "Ordo: e signis removere",
        zh: "排序：从书签中移除",
    },
    "tabularium.sorting.ui.unbookmarkSelected": {
        def: "Sorting: remove the selection from the bookmarks",
        la: "Ordo: delecta e signis removere",
        zh: "排序：把所选项目从书签中移除",
    },
    "tabularium.sorting.ui.unbookmarkSelectedFlat": {
        def: "Remove the selection from the sorting bookmarks",
        la: "Delecta e signis ordinandi removere",
        zh: "把所选项目从排序书签中移除",
    },
    "tabularium.sorting.ui.unbookmarkSiblings": {
        def: "Remove it and its siblings from the sorting bookmarks",
        la: "Id et cognata e signis ordinandi removere",
        zh: "连同同级项目从排序书签中移除",
    },
    "tabularium.sorting.ui.unbookmarkSiblingsFlat": {
        def: "Sorting: remove it and its siblings from the bookmarks",
        la: "Ordo: id et cognata e signis removere",
        zh: "排序：连同同级项目从书签中移除",
    },
    "tabularium.sorting.viewProblem": {
        def: "The file explorer could not be sorted. Open the developer console for details.",
        la: "Index plicarum ordinari non potuit. Singula in consola elaboratoris vide.",
        zh: "无法对文件列表排序，详情见开发者控制台。",
    },
    "tabularium.sync.liveOff": {
        def: "Live sync off.",
        la: "Synchronizatio viva deactivata est.",
        zh: "实时同步已关闭。",
    },
    "tabularium.sync.liveOn": {
        def: "Live sync on.",
        la: "Synchronizatio viva activata est.",
        zh: "实时同步已开启。",
    },
    "tabularium.sync.resumed": {
        def: "Synchronisation resumed.",
        la: "Synchronizatio resumpta est.",
        zh: "同步已恢复。",
    },
    "tabularium.sync.suspended": {
        def: "All synchronisation suspended.",
        la: "Omnis synchronizatio suspensa est.",
        zh: "已暂停全部同步。",
    },
    "tabularium.syncMenu.flat": {
        def: "Sync: ${action}",
        la: "Synchronizatio: ${action}",
        zh: "同步：${action}",
    },
    "tabularium.syncMenu.history": {
        def: "Version history",
        la: "Historia versionum",
        zh: "历史版本",
    },
    "tabularium.syncMenu.now": {
        def: "Sync now",
        la: "Synchroniza nunc",
        zh: "立即同步",
    },
    "tabularium.syncMenu.pause": {
        def: "Pause live sync",
        la: "Synchronizationem vivam suspende",
        zh: "暂停实时同步",
    },
    "tabularium.syncMenu.resume": {
        def: "Resume live sync",
        la: "Synchronizationem vivam resume",
        zh: "恢复实时同步",
    },
    "tabularium.syncMenu.title": {
        def: "Sync",
        la: "Synchronizatio",
        zh: "同步",
    },
    "Testing only - Resolve file conflicts by syncing newer copies of the file, this can overwrite modified files. Be Warned.":
        {
            def: "Testing only - Resolve file conflicts by syncing newer copies of the file, this can overwrite modified files. Be Warned.",
            la: "Probationi tantum - Discrepantias plicarum solve synchronizando recentiora plicarum exemplaria; hoc plicas mutatas superscribere potest. Cave.",
            zh: "仅供测试 - 通过同步文件的较新副本来解决文件冲突,这可能会覆盖修改过的文件。请注意 ",
        },
    "The current database revision could not be read. The Vault was not changed.": {
        def: "The current revision in the database could not be read. The vault was not changed.",
        la: "Revisio praesens in repositorio legi non potuit. Tabularium non mutatum est.",
        zh: "无法读取数据库中的当前修订。库未作任何更改。",
    },
    "The delay for consecutive on-demand fetches": {
        def: "The delay for consecutive on-demand fetches",
        la: "Mora inter arcessiones postulatas continuas",
        zh: "连续按需获取的延迟",
    },
    "The deleted storage file ${file.path} has conflicts, but its displayed revision is unknown; preserving every database branch":
        {
            def: "The deleted file ${file.path} has conflicts, but the revision it showed is unknown; keeping every branch in the database",
            la: "Plica deleta ${file.path} discrepantias habet, sed revisio ostensa ignota est; omnes rami in repositorio servantur",
            zh: "已删除的文件 ${file.path} 存在冲突，但不知道它显示的是哪个修订，将保留数据库中的所有分支",
        },
    "The deleted storage file ${path} has conflicts, but its displayed revision is unknown; preserving every database branch":
        {
            def: "The deleted file ${path} has conflicts, but the revision it showed is unknown; keeping every branch in the database",
            la: "Plica deleta ${path} discrepantias habet, sed revisio ostensa ignota est; omnes rami in repositorio servantur",
            zh: "已删除的文件 ${path} 存在冲突，但不知道它显示的是哪个修订，将保留数据库中的所有分支",
        },
    "The document ID configurations differ. Import the correct Setup URI, or configure the matching ID key, before synchronising.":
        {
            def: "The document ID settings differ between this device and the server. Configure the matching ID key before synchronising.",
            la: "Configurationes identificatorum documentorum inter hoc instrumentum et ministratorem differunt. Ante synchronizationem clavem identificatorum congruentem constitue.",
            zh: "此设备与服务器的文档 ID 设置不一致。请先配置一致的 ID 密钥，再进行同步。",
        },
    "The files in this Vault are almost identical to the server's.": {
        def: "The files in this Vault are almost identical to the server's.",
        la: "Plicae in hoc tabulario fere eaedem sunt atque eae ministratoris.",
        zh: "本库中的文件与服务器上的几乎一致。",
    },
    "The Hash algorithm for chunk IDs": {
        def: "The Hash algorithm for chunk IDs",
        la: "Algorithmus hash ad identificationes fragmentorum",
        zh: "块 ID 的哈希算法(实验性)",
    },
    "The local database has been cleaned up.": {
        def: "This device's database has been cleaned up.",
        la: "Repositorium huius instrumenti purgatum est.",
        zh: "这台设备的数据库已清理。",
    },
    "The maximum duration for which chunks can be incubated within the document. Chunks exceeding this period will graduate to independent chunks.":
        {
            def: "The maximum duration for which chunks can be incubated within the document. Chunks exceeding this period will graduate to independent chunks.",
            la: "Spatium maximum quo fragmenta intra documentum incubari possunt. Fragmenta quae hoc spatium excedunt in fragmenta independentia transibunt.",
            zh: "文档中可以孵化的数据块的最大持续时间。超过此时间的数据块将成为独立数据块 ",
        },
    "The maximum number of chunks that can be incubated within the document. Chunks exceeding this number will immediately graduate to independent chunks.":
        {
            def: "The maximum number of chunks that can be incubated within the document. Chunks exceeding this number will immediately graduate to independent chunks.",
            la: "Numerus maximus fragmentorum quae intra documentum incubari possunt. Fragmenta quae hunc numerum excedunt statim in fragmenta independentia transibunt.",
            zh: "文档中可以孵化的数据块的最大数量。超过此数量的数据块将立即成为独立数据块 ",
        },
    "The maximum total size of chunks that can be incubated within the document. Chunks exceeding this size will immediately graduate to independent chunks.":
        {
            def: "The maximum total size of chunks that can be incubated within the document. Chunks exceeding this size will immediately graduate to independent chunks.",
            la: "Magnitudo maxima summa fragmentorum quae intra documentum incubari possunt. Fragmenta quae hanc magnitudinem excedunt statim in fragmenta independentia transibunt.",
            zh: "文档中可以孵化的数据块的最大总大小。超过此大小的数据块将立即成为独立数据块 ",
        },
    "The minimum interval for automatic synchronisation on event.": {
        def: "The minimum interval for automatic synchronisation on event.",
        la: "Intervallum minimum synchronizationis automaticae ad eventum.",
        zh: "基于事件自动同步的最小间隔。",
    },
    "The remote connectivity check timed out.": {
        def: "The connection check to the server timed out.",
        la: "Probatio conexionis cum ministratore tempus excessit.",
        zh: "检查与服务器的连接超时。",
    },
    "The remote database has been cleaned up. Fetch rebuilt DB, explicit unlocking or chunk clean-up is required.": {
        def: "The server's database has been cleaned up. Fetch the rebuilt database, unlock it explicitly, or clean up chunks.",
        la: "Repositorium ministratoris purgatum est. Necesse est repositorium reaedificatum arcessere, id expresse reserare, aut fragmenta purgare.",
        zh: "服务器上的数据库已被清理。需要获取重建后的数据库、明确解锁，或清理数据块。",
    },
    "The remote database has been cleaned.": {
        def: "The server's database has been cleaned up.",
        la: "Repositorium ministratoris purgatum est.",
        zh: "服务器上的数据库已清理。",
    },
    "The remote database has been rebuilt or corrupted since we have synchronized last time. Fetch rebuilt DB, explicit unlocking or chunk clean-up is required.":
        {
            def: "The server's database has been rebuilt or damaged since the last synchronisation. Fetch the rebuilt database, unlock it explicitly, or clean up chunks.",
            la: "Repositorium ministratoris post ultimam synchronizationem reaedificatum aut corruptum est. Necesse est repositorium reaedificatum arcessere, id expresse reserare, aut fragmenta purgare.",
            zh: "自上次同步以来，服务器上的数据库已被重建或损坏。需要获取重建后的数据库、明确解锁，或清理数据块。",
        },
    "The remote database has no compatibility with the running version. Please upgrade the plugin.": {
        def: "The server's database is not compatible with this version. Please update the plug-in.",
        la: "Repositorium ministratoris cum hac versione non congruit. Additamentum renova.",
        zh: "服务器上的数据库与当前版本不兼容，请更新插件。",
    },
    "The remote document IDs do not match the configured ID key.": {
        def: "The document IDs on the server do not match the configured ID key.",
        la: "Indices documentorum in ministratore clavi indicum constitutae non congruunt.",
        zh: "服务器上的文档 ID 与配置的 ID 密钥不匹配。",
    },
    "The remote type does not support preferred tweak values.": {
        def: "This server type does not support preferred tweak values.",
        la: "Hoc genus ministratoris valores accommodationis praelatos non sustinet.",
        zh: "此类服务器不支持推荐的调整值。",
    },
    "The request may have failed. The reason sent by the server: ${r.status}: ${r.statusText}": {
        def: "The request may have failed. Server response: ${r.status}: ${r.statusText}",
        la: "Petitio fortasse defecit. Responsum ministratoris: ${r.status}: ${r.statusText}",
        zh: "请求可能失败了。服务器返回：${r.status}: ${r.statusText}",
    },
    "The request was successful by API. But the native fetch API failed! Please check CORS settings on the remote database!. While this condition, you cannot enable LiveSync":
        {
            def: "The request succeeded through the Obsidian API, but the native fetch API failed. Please check the CORS settings on the server. Until this is fixed, live synchronisation cannot be enabled.",
            la: "Petitio per API Obsidian successit, sed API fetch nativum defecit. Optiones CORS ministratoris inspice. Donec hoc corrigatur, synchronizatio continua activari non potest.",
            zh: "通过 Obsidian API 的请求成功，但原生 fetch API 失败。请检查服务器的 CORS 设置。在此问题解决前，无法启用实时同步。",
        },
    "The restored file could not be opened in the editor.": {
        def: "The restored file could not be opened in the editor.",
        la: "Plica restituta in editore aperiri non potuit.",
        zh: "无法在编辑器中打开恢复的文件。",
    },
    "The restored revision could not be created. The file may have changed during the operation, and the Vault was not changed.":
        {
            def: "The restored revision could not be created. The file may have changed during the operation. The vault was not changed.",
            la: "Revisio restituta creari non potuit. Plica fortasse dum res agebatur mutata est. Tabularium non mutatum est.",
            zh: "无法创建恢复的修订。文件可能在操作过程中发生了变化。库未作任何更改。",
        },
    "The restored revision was saved in the local database, but it could not be reflected to the Vault. Use 'Inspect conflicts and file/database differences' to review and apply it.":
        {
            def: "The restored revision was saved in this device's database, but it could not be written to the vault.",
            la: "Revisio restituta in repositorio huius instrumenti servata est, sed in tabularium scribi non potuit.",
            zh: "恢复的修订已保存到此设备的数据库，但无法写入库。",
        },
    "The selected content was restored as a new revision.": {
        def: "The selected content was restored as a new revision.",
        la: "Contentum selectum ut nova revisio restitutum est.",
        zh: "所选内容已恢复为新的修订。",
    },
    "The selected content was restored as a new revision. LiveSync could not confirm whether other versions remain; use 'Inspect conflicts and file/database differences' to review the file.":
        {
            def: "The selected content was restored as a new revision. Tabularium could not confirm whether other versions remain; use 'Pick a file to resolve conflict' to review the file.",
            la: "Contentum selectum ut nova revisio restitutum est. Tabularium confirmare non potuit an aliae versiones supersint; per 'Elige plicam ad discrepantiam solvendam' plicam inspice.",
            zh: "所选内容已恢复为新的修订。Tabularium 无法确认是否还有其他版本，请使用「选择要解决冲突的文件」检查该文件。",
        },
    "The selected content was restored as a new revision. Other versions remain unresolved; use 'Inspect conflicts and file/database differences' to review them.":
        {
            def: "The selected content was restored as a new revision. Other versions remain unresolved; use 'Pick a file to resolve conflict' to review them.",
            la: "Contentum selectum ut nova revisio restitutum est. Aliae versiones adhuc irresolutae manent; per 'Elige plicam ad discrepantiam solvendam' eas inspice.",
            zh: "所选内容已恢复为新的修订。其他版本仍未解决，请使用「选择要解决冲突的文件」查看。",
        },
    "The selected local database is not ready for the rebuild download.": {
        def: "This device's database is not ready to receive the rebuild download.",
        la: "Repositorium huius instrumenti nondum paratum est ad data reaedificationis accipienda.",
        zh: "这台设备的数据库尚未准备好进行重建下载。",
    },
    "The selected local database is not ready for the rebuild upload.": {
        def: "This device's database is not ready to be uploaded for the rebuild.",
        la: "Repositorium huius instrumenti nondum paratum est ut ad reaedificationem sursum mittatur.",
        zh: "这台设备的数据库尚未准备好进行重建上传。",
    },
    "The selected revision could not be restored because its content is no longer available.": {
        def: "The selected revision could not be restored because its content is no longer available.",
        la: "Revisio selecta restitui non potuit, quia eius contentum iam non exstat.",
        zh: "所选修订的内容已不存在，无法恢复。",
    },
    "The selected revision does not have a revision identifier.": {
        def: "The selected revision does not have a revision identifier.",
        la: "Revisio selecta identificatore revisionis caret.",
        zh: "所选修订没有修订标识。",
    },
    "The settings in the remote database are the same as the local database.": {
        def: "The settings on the server are the same as in this device's database.",
        la: "Optiones in ministratore eaedem sunt atque in repositorio huius instrumenti.",
        zh: "服务器上的设置与此设备数据库中的设置相同。",
    },
    "the single, authoritative master copy": {
        def: "the single, authoritative master copy",
        la: "unicum et auctoritativum exemplar principale",
        zh: "唯一的权威主副本",
    },
    "The storage file has been changed but exceeds the maximum size. Skipping: ${param.file.path}": {
        def: "A file changed in the vault but exceeds the maximum size. Skipping: ${param.file.path}",
        la: "Plica in tabulario mutata est, sed magnitudinem maximam excedit. Praeteritur: ${param.file.path}",
        zh: "库中有文件发生变化，但超过了最大大小。已跳过：${param.file.path}",
    },
    "There are no conflicted documents": {
        def: "There are no conflicted documents.",
        la: "Nulla documenta discrepantiam habent.",
        zh: "没有存在冲突的文档。",
    },
    "There is a way to resolve this on other devices.": {
        def: "There is a way to resolve this on other devices.",
        la: "Est modus hoc in aliis instrumentis solvendi.",
        zh: "在其他设备上有办法解决这个问题。",
    },
    "There may be differences between the files in this Vault and the server.": {
        def: "There may be differences between the files in this Vault and the server.",
        la: "Fortasse differentiae sunt inter plicas in hoc tabulario et ministratorem.",
        zh: "本库中的文件与服务器上可能存在差异。",
    },
    "This device": {
        def: "This device",
        la: "Hoc instrumentum",
        zh: "本设备",
    },
    "This is an extremely powerful operation. We strongly recommend that you copy your Vault folder to a safe location.":
        {
            def: "This is an extremely powerful operation. We strongly recommend that you copy your Vault folder to a safe location.",
            la: "Haec operatio est vehementissima. Valde suademus ut thecam tabularii tui in locum tutum exscribas.",
            zh: "这是一项影响极大的操作。我们强烈建议先把库文件夹复制到安全位置。",
        },
    "This passphrase will not be copied to another device. It will be set to `Default` until you configure it again.": {
        def: "This passphrase will not be copied to another device. It will be set to `Default` until you configure it again.",
        la: "Haec tessera arcana in aliud instrumentum non exscribetur. Ad `Default` ponetur donec eam iterum configures.",
        zh: "此密码不会复制到另一台设备。在您再次配置之前,它将设置为 `Default` ",
    },
    "This procedure will first delete all existing synchronisation data from the server. Following this, the server data will be completely rebuilt, using the current state of your Vault on this device (including its local database) as":
        {
            def: "This procedure will first delete all existing synchronisation data from the server. Following this, the server data will be completely rebuilt, using the current state of your Vault on this device (including its local database) as",
            la: "Haec ratio primum omnia data synchronizationis exstantia ex ministratore delebit. Deinde data ministratoris omnino reaedificabuntur, statu praesenti tabularii tui in hoc instrumento (repositorio locali incluso) adhibito ut",
            zh: "此操作会先删除服务器上所有现有的同步数据。随后，服务器数据将被完全重建，以本设备上你库的当前状态（包括其本地数据库）作为",
        },
    "This Vault is empty, or contains only new files that are not on the server.": {
        def: "This Vault is empty, or contains only new files that are not on the server.",
        la: "Hoc tabularium vacuum est, aut solas plicas novas continet quae in ministratore non sunt.",
        zh: "本库为空，或只包含服务器上没有的新文件。",
    },
    "This will rebuild the local database on this device using the most recent data from the server. This action is designed to resolve synchronisation inconsistencies and restore correct functionality.":
        {
            def: "This will rebuild the local database on this device using the most recent data from the server. This action is designed to resolve synchronisation inconsistencies and restore correct functionality.",
            la: "Hoc repositorium localem in hoc instrumento reaedificabit, recentissimis datis ex ministratore adhibitis. Haec actio ad incongruentias synchronizationis solvendas et ad rectam functionem restituendam destinata est.",
            zh: "这将用服务器上的最新数据重建本设备的本地数据库。此操作旨在解决同步不一致并恢复正常功能。",
        },
    "To minimise the creation of new conflicts": {
        def: "To minimise the creation of new conflicts",
        la: "Ut creatio novarum discrepantiarum minuatur",
        zh: "以减少新冲突的产生",
    },
    "To stop the countdown, tap anywhere on the dialogue": {
        def: "To stop the countdown, tap anywhere on the dialogue",
        la: "Ut numerationem retrorsum sistas, ubivis in dialogo tange",
        zh: "要停止倒计时，请点击对话框任意位置",
    },
    "To:": {
        def: "To:",
        la: "Ad:",
        zh: "至：",
    },
    "Toggle All Sync.": {
        def: "Toggle All Sync.",
        la: "Commuta omnem synchronizationem",
        zh: "开关全部同步",
    },
    "Toggle LiveSync": {
        def: "Toggle live sync",
        la: "Commuta synchronizationem vivam",
        zh: "开关实时同步",
    },
    "TURN Credential": {
        def: "TURN Credential",
        la: "Credentiale TURN",
        zh: "TURN 凭据",
    },
    "TURN Username": {
        def: "TURN Username",
        la: "Nomen usoris TURN",
        zh: "TURN 用户名",
    },
    "TweakMismatchResolve.Action.Dismiss": {
        def: "Dismiss",
        la: "Dimitte",
        zh: "Dismiss",
    },
    "TweakMismatchResolve.Action.UseConfigured": {
        def: "Use configured settings",
        la: "Adhibe optiones configuratas",
        zh: "Use configured settings",
    },
    "TweakMismatchResolve.Action.UseMine": {
        def: "Update remote database settings",
        la: "Renova optiones repositorii remoti",
        zh: "Update remote database settings",
    },
    "TweakMismatchResolve.Action.UseMineAcceptIncompatible": {
        def: "Update remote database settings but keep as is",
        la: "Renova optiones repositorii remoti sed serva ut sunt",
        zh: "Update remote database settings but keep as is",
    },
    "TweakMismatchResolve.Action.UseMineWithRebuild": {
        def: "Update remote database settings and rebuild again",
        la: "Renova optiones repositorii remoti et iterum reaedifica",
        zh: "Update remote database settings and rebuild again",
    },
    "TweakMismatchResolve.Action.UseRemote": {
        def: "Apply settings to this device",
        la: "Applica optiones huic instrumento",
        zh: "Apply settings to this device",
    },
    "TweakMismatchResolve.Action.UseRemoteAcceptIncompatible": {
        def: "Apply settings to this device, but and ignore incompatibility",
        la: "Applica optiones huic instrumento, sed incongruentiam neglege",
        zh: "Apply settings to this device, but and ignore incompatibility",
    },
    "TweakMismatchResolve.Action.UseRemoteWithRebuild": {
        def: "Apply settings to this device, and fetch again",
        la: "Applica optiones huic instrumento, et iterum arcesse",
        zh: "Apply settings to this device, and fetch again",
    },
    "TweakMismatchResolve.Message.Main": {
        def: "\nThe settings in the remote database are as follows. These values are configured by other devices, which are synchronised with this device at least once.\n\nIf you want to use these settings, please select Use configured settings.\nIf you want to keep the settings of this device, please select Dismiss.\n\n${table}\n\n>[!TIP]\n> If you want to synchronise all settings, please use `Sync settings via markdown` after applying minimal configuration with this feature.\n\n${additionalMessage}",
        la: "\nOptiones in repositorio remoto sunt hae. Hi valores ab aliis instrumentis configurati sunt, quae cum hoc instrumento saltem semel synchronizata sunt.\n\nSi has optiones adhibere vis, selige Adhibe optiones configuratas.\nSi optiones huius instrumenti servare vis, selige Dimitte.\n\n${table}\n\n>[!TIP]\n> Si omnes optiones synchronizare vis, post configurationem minimam hac facultate applicatam `Sync settings via markdown` adhibe.\n\n${additionalMessage}",
        zh: "\nThe settings in the remote database are as follows. These values are configured by other devices, which are synchronised with this device at least once.\n\nIf you want to use these settings, please select Use configured settings.\nIf you want to keep the settings of this device, please select Dismiss.\n\n${table}\n\n>[!TIP]\n> If you want to synchronise all settings, please use `Sync settings via markdown` after applying minimal configuration with this feature.\n\n${additionalMessage}",
    },
    "TweakMismatchResolve.Message.MainTweakResolving": {
        def: "Your configuration has not been matched with the one on the remote server.\n\nFollowing configuration should be matched:\n\n${table}\n\nLet us know your decision.\n\n${additionalMessage}",
        la: "Configuratio tua cum ea in ministratore remoto non congruit.\n\nConfiguratio sequens congruere debet:\n\n${table}\n\nNobis consilium tuum indica.\n\n${additionalMessage}",
        zh: "Your configuration has not been matched with the one on the remote server.\n\nFollowing configuration should be matched:\n\n${table}\n\nLet us know your decision.\n\n${additionalMessage}",
    },
    "TweakMismatchResolve.Message.mineUpdated": {
        def: "The device configuration have been adjusted.",
        la: "Configuratio instrumenti accommodata est.",
        zh: "本设备的配置已调整。",
    },
    "TweakMismatchResolve.Message.remoteUpdated": {
        def: "The configuration stored remotely has been updated.",
        la: "Configuratio remote servata renovata est.",
        zh: "远端存储的配置已更新。",
    },
    "TweakMismatchResolve.Message.UseRemote.WarningRebuildRecommended": {
        def: "\n>[!NOTICE]\n> Some changes are compatible but may consume extra storage and transfer volumes. A rebuild is recommended. However, a rebuild may not be performed at present, but may be implemented in future maintenance.\n> ***Please ensure that you have time and are connected to a stable network to apply!***",
        la: "\n>[!NOTICE]\n> Quaedam mutationes congruunt sed fortasse plus spatii et transmissionis consument. Reaedificatio commendatur. Reaedificatio tamen nunc fieri non debet, sed in futura curatione fieri potest.\n> ***Cura ut tempus habeas et retiaculo stabili conexus sis antequam applices!***",
        zh: "\n>[!NOTICE]\n> Some changes are compatible but may consume extra storage and transfer volumes. A rebuild is recommended. However, a rebuild may not be performed at present, but may be implemented in future maintenance.\n> ***Please ensure that you have time and are connected to a stable network to apply!***",
    },
    "TweakMismatchResolve.Message.UseRemote.WarningRebuildRequired": {
        def: "\n>[!WARNING]\n> Some remote configurations are not compatible with the local database of this device. Rebuilding the local database will be required.\n> ***Please ensure that you have time and are connected to a stable network to apply!***",
        la: "\n>[!WARNING]\n> Quaedam configurationes remotae cum repositorio locali huius instrumenti non congruunt. Repositorium locale reaedificandum erit.\n> ***Cura ut tempus habeas et retiaculo stabili conexus sis antequam applices!***",
        zh: "\n>[!WARNING]\n> Some remote configurations are not compatible with the local database of this device. Rebuilding the local database will be required.\n> ***Please ensure that you have time and are connected to a stable network to apply!***",
    },
    "TweakMismatchResolve.Message.WarningIncompatibleRebuildRecommended": {
        def: "\n>[!NOTICE]\n> We have detected that some of the values are different to make incompatible the local database with the remote database.\n> Some changes are compatible but may consume extra storage and transfer volumes. A rebuild is recommended. However, a rebuild may not be performed at present, but may be implemented in future maintenance.\n> If you want to rebuild, it takes a few minutes or more. **Make sure it is safe to perform it now.**",
        la: "\n>[!NOTICE]\n> Animadvertimus quosdam valores differre, ita ut repositorium locale cum remoto non congruat.\n> Quaedam mutationes congruunt sed fortasse plus spatii et transmissionis consument. Reaedificatio commendatur. Reaedificatio tamen nunc fieri non debet, sed in futura curatione fieri potest.\n> Si reaedificare vis, pauca minuta aut plura requiruntur. **Cura ut nunc id tuto fieri possit.**",
        zh: "\n>[!NOTICE]\n> We have detected that some of the values are different to make incompatible the local database with the remote database.\n> Some changes are compatible but may consume extra storage and transfer volumes. A rebuild is recommended. However, a rebuild may not be performed at present, but may be implemented in future maintenance.\n> If you want to rebuild, it takes a few minutes or more. **Make sure it is safe to perform it now.**",
    },
    "TweakMismatchResolve.Message.WarningIncompatibleRebuildRequired": {
        def: "\n>[!WARNING]\n> We have detected that some of the values are different to make incompatible the local database with the remote database.\n> Either local or remote rebuilds are required. Both of them takes a few minutes or more. **Make sure it is safe to perform it now.**",
        la: "\n>[!WARNING]\n> Animadvertimus quosdam valores differre, ita ut repositorium locale cum remoto non congruat.\n> Aut localis aut remota reaedificatio requiritur. Utraque pauca minuta aut plura requirit. **Cura ut nunc id tuto fieri possit.**",
        zh: "\n>[!WARNING]\n> We have detected that some of the values are different to make incompatible the local database with the remote database.\n> Either local or remote rebuilds are required. Both of them takes a few minutes or more. **Make sure it is safe to perform it now.**",
    },
    "TweakMismatchResolve.Table": {
        def: "| Value name | This device | On Remote |\n|: --- |: ---- :|: ---- :|\n${rows}\n\n",
        la: "| Nomen valoris | Hoc instrumentum | In remoto |\n|: --- |: ---- :|: ---- :|\n${rows}\n\n",
        zh: "| Value name | This device | On Remote |\n|: --- |: ---- :|: ---- :|\n${rows}\n\n",
    },
    "TweakMismatchResolve.Table.Row": {
        def: "| ${name} | ${self} | ${remote} |",
        la: "| ${name} | ${self} | ${remote} |",
        zh: "| ${name} | ${self} | ${remote} |",
    },
    "TweakMismatchResolve.Title": {
        def: "Configuration Mismatch Detected",
        la: "Incongruentia configurationis detecta",
        zh: "Configuration Mismatch Detected",
    },
    "TweakMismatchResolve.Title.TweakResolving": {
        def: "Configuration Mismatch Detected",
        la: "Incongruentia configurationis detecta",
        zh: "Configuration Mismatch Detected",
    },
    "TweakMismatchResolve.Title.UseRemoteConfig": {
        def: "Use Remote Configuration",
        la: "Adhibe configurationem remotam",
        zh: "Use Remote Configuration",
    },
    "Ui.Common.LocalDatabaseInitialisationFailed": {
        def: "Tabularium cannot synchronise. Generate a report to review the detailed log.",
        la: "Tabularium synchronizare non potest. Relationem genera ut acta accurata recenseas.",
        zh: "Tabularium 无法同步。请生成报告以查看详细日志。",
    },
    "Ui.Common.Signal.Caution": {
        def: "CAUTION",
        la: "CAUTIO",
        zh: "注意",
    },
    "Ui.Common.Signal.Danger": {
        def: "DANGER",
        la: "PERICULUM",
        zh: "危险",
    },
    "Ui.Common.Signal.Notice": {
        def: "NOTICE",
        la: "ADMONITIO",
        zh: "提示",
    },
    "Ui.Common.Signal.Warning": {
        def: "WARNING",
        la: "MONITUM",
        zh: "警告",
    },
    "Ui.Common.SomeFilesCouldNotBeSynchronised": {
        def: "Not all files could be synchronised. Check the affected files. Generate a report to review the detailed log.",
        la: "Non omnes plicae synchronizari potuerunt. Plicas affectas inspice. Relationem genera ut acta accurata recenseas.",
        zh: "并非所有文件都能同步。请检查受影响的文件。生成报告以查看详细日志。",
    },
    "Ui.SetupWizard.RebuildEverythingP2P.ConfirmLocalReset": {
        def: "I understand that this resets only this device's local synchronisation database.",
        la: "Intellego hoc solum repositorium locale synchronizationis huius instrumenti restituere.",
        zh: "我明白这只会重置本设备的本地同步数据库。",
    },
    "Ui.SetupWizard.RebuildEverythingP2P.ConfirmLocalResetNote": {
        def: "The files currently in this Vault are used to rebuild it.",
        la: "Plicae quae nunc in hoc tabulario sunt ad id reaedificandum adhibentur.",
        zh: "将使用本库中当前的文件来重建它。",
    },
    "Ui.SetupWizard.RebuildEverythingP2P.ConfirmTitle": {
        def: "Please Confirm the Following",
        la: "Quaeso sequentia confirma",
        zh: "请确认以下内容",
    },
    "Ui.SetupWizard.RebuildEverythingP2P.Guidance": {
        def: "This procedure will discard the local database on this device and rebuild it from the current files in this Vault. It does not delete or overwrite data on another device.",
        la: "Haec ratio repositorium locale in hoc instrumento abiciet et ex plicis praesentibus in hoc tabulario reaedificabit. Data in alio instrumento neque delet neque superscribit.",
        zh: "此操作会丢弃本设备的本地数据库，并用本库中当前的文件重建。它不会删除或覆盖其他设备上的数据。",
    },
    "Ui.SetupWizard.RebuildEverythingP2P.Note": {
        def: "Keep this device online after initialisation so that another device can fetch the Vault from it.",
        la: "Post initiationem hoc instrumentum conexum serva ut aliud instrumentum tabularium ex eo arcessere possit.",
        zh: "初始化后请保持本设备在线，以便其他设备从它获取库。",
    },
    "Ui.SetupWizard.RebuildEverythingP2P.Proceed": {
        def: "I Understand, Prepare This Device",
        la: "Intellego, para hoc instrumentum",
        zh: "我明白，准备本设备",
    },
    "Ui.SetupWizard.RebuildEverythingP2P.Title": {
        def: "Final Confirmation: Prepare This Device for P2P",
        la: "Confirmatio ultima: para hoc instrumentum ad P2P",
        zh: "最终确认：为本设备准备 P2P",
    },
    "Unable to display the file in the editor": {
        def: "Unable to display the file in the editor",
        la: "Plica in editore monstrari non potest",
        zh: "无法在编辑器中显示该文件",
    },
    "Unique name between all synchronized devices. To edit this setting, please disable customization sync once.": {
        def: "Unique name between all synchronized devices. To edit this setting, please disable customization sync once.",
        la: "Nomen unicum inter omnia instrumenta synchronizata. Ut hanc optionem emendes, synchronizationem optionum propriarum semel deactiva.",
        zh: "所有同步设备之间的唯一名称。要编辑此设置,请首先禁用自定义同步",
    },
    "Unknown encryption version. Cannot decrypt.": {
        def: "Unknown encryption version. Cannot decrypt.",
        la: "Versio cryptationis ignota. Decryptari non potest.",
        zh: "未知的加密版本，无法解密。",
    },
    "Unload preparation failed; pending storage work may require recovery": {
        def: "Preparing to unload failed; pending file operations may need recovery",
        la: "Praeparatio ad exonerandum defecit; operationes plicarum pendentes fortasse restituendae sunt",
        zh: "卸载前的准备失败，未完成的文件操作可能需要恢复",
    },
    URL: {
        def: "URL",
        la: "URL",
        zh: "URL",
    },
    "Use ${name}": {
        def: "Use ${name}",
        la: "Utere ${name}",
        zh: "使用 ${name}",
    },
    "Use Custom HTTP Handler": {
        def: "Use Custom HTTP Handler",
        la: "Adhibe tractatorem HTTP proprium",
        zh: "使用自定义 HTTP 处理程序",
    },
    "Use dynamic iteration count": {
        def: "Use dynamic iteration count",
        la: "Adhibe numerum iterationum dynamicum",
        zh: "使用动态迭代次数",
    },
    "Use Internal API": {
        def: "Use Internal API",
        la: "Adhibe API internam",
        zh: "使用内部 API",
    },
    "Use Segmented-splitter": {
        def: "Use Segmented-splitter",
        la: "Adhibe divisorem segmentatum",
        zh: "使用分段分割器",
    },
    "Use splitting-limit-capped chunk splitter": {
        def: "Use splitting-limit-capped chunk splitter",
        la: "Adhibe divisorem fragmentorum limite divisionis coercitum",
        zh: "使用分割限制上限的块分割器",
    },
    "Use the detailed flow": {
        def: "Use the detailed flow",
        la: "Adhibe processum accuratum",
        zh: "使用详细流程",
    },
    "Use the trash bin": {
        def: "Use the trash bin",
        la: "Adhibe receptaculum purgamentorum",
        zh: "使用回收站",
    },
    "Use timeouts instead of heartbeats": {
        def: "Use timeouts instead of heartbeats",
        la: "Adhibe tempora exspirationis pro pulsibus",
        zh: "使用超时而不是心跳",
    },
    "User chose to reboot and re-run the process.": {
        def: "Restarting to run the process again.",
        la: "Denuo incipitur ut processus iterum agatur.",
        zh: "将重启并重新运行此过程。",
    },
    username: {
        def: "username",
        la: "nomen usoris",
        zh: "用户名",
    },
    Username: {
        def: "Username",
        la: "Nomen usoris",
        zh: "用户名",
    },
    "Vault history": {
        def: "Vault history",
        la: "Historia tabularii",
        zh: "笔记库历史",
    },
    "Verbose Log": {
        def: "Verbose Log",
        la: "Acta prolixa",
        zh: "详细日志",
    },
    Version: {
        def: "Version",
        la: "Versio",
        zh: "版本",
    },
    "Wait for a bounded local quiet period before processing file updates in LiveSync mode, reducing intermediate database updates while delaying their reflection to remote devices.":
        {
            def: "In live sync, wait for a short local pause in editing (with an upper bound) before writing file changes to the database: fewer intermediate versions are written, but other devices receive the changes a little later.",
            la: "In modo vivo, post mutationem plicae breve otium locale (cum fine) exspectat antequam in repositorium scribat. Renovationes intermediae minuuntur, sed alia instrumenta mutationes serius accipiunt.",
            zh: "实时同步模式下，文件改动后先等本地停止编辑一小段时间（有上限）再写入数据库。这样可以减少中间版本的写入，但其他设备会晚一些收到改动。",
        },
    "Warning! This will have a serious impact on performance. And the logs will not be synchronised under the default name. Please be careful with logs; they often contain your confidential information.":
        {
            def: "Warning! This will have a serious impact on performance. And the logs will not be synchronised under the default name. Please be careful with logs; they often contain your confidential information.",
            la: "Monitum! Hoc celeritatem graviter afficiet. Et acta sub nomine praedefinito non synchronizabuntur. Cave cum actis; saepe notitiam tuam secretam continent.",
            zh: "警告！这将严重影响性能。并且日志不会以默认名称同步。请小心处理日志；它们通常包含您的敏感信息 ",
        },
    WATCH: {
        def: "WATCH",
        la: "OBSERVA",
        zh: "监视",
    },
    "We are about to retrieve the remote data.\n\nFirstly, how shall we handle the data retrieved from this remote source?\n\n- **${NEWER_WINS}**: Compares the modified time of files and takes the newer one.\n  If you have been using Self-hosted LiveSync and have made changes on multiple devices, this option may be suitable for you as it tries to merge changes based on modified time.\n- **${REMOTE_WINS}**: Remote data is the source of truth.\n  If you are new to using Self-hosted LiveSync. This option may be easiest to understand and get started with.\n  It will overwrite all your local files with the remote data, so please make sure you have a backup if there is any important data in your vault.\n- **${DETAILED}**: Opens the detailed setup wizard.\n  If you want to have more control over the synchronisation process, or want to review the changes before applying, you can choose this option to use the detailed flow.":
        {
            def: "We are about to retrieve the remote data.\n\nFirstly, how shall we handle the data retrieved from this remote source?\n\n- **${NEWER_WINS}**: Compares the modified time of files and takes the newer one.\n  If you have been using Tabularium and have made changes on multiple devices, this option may be suitable for you as it tries to merge changes based on modified time.\n- **${REMOTE_WINS}**: Remote data is the source of truth.\n  If you are new to using Tabularium. This option may be easiest to understand and get started with.\n  It will overwrite all your local files with the remote data, so please make sure you have a backup if there is any important data in your vault.\n- **${DETAILED}**: Opens the detailed setup wizard.\n  If you want to have more control over the synchronisation process, or want to review the changes before applying, you can choose this option to use the detailed flow.",
            la: "Data remota mox recipiemus.\n\nPrimum, quomodo data ex hoc fonte remoto recepta tractabimus?\n\n- **${NEWER_WINS}**: Tempora mutationis plicarum comparat et recentiorem sumit.\n  Si Tabularium iam adhibuisti et in pluribus instrumentis mutationes fecisti, haec optio tibi fortasse apta est, quia mutationes secundum tempus mutationis conflare conatur.\n- **${REMOTE_WINS}**: Data remota fons veritatis sunt.\n  Si Tabularium primum adhibes, haec optio fortasse facillima est ad intellegendum et incipiendum.\n  Omnes plicas tuas locales datis remotis superscribet, itaque cura ut exemplar tutum habeas si qua data magni momenti in tabulario tuo sunt.\n- **${DETAILED}**: Ductorem institutionis accuratum aperit.\n  Si processum synchronizationis magis regere vis, aut mutationes ante applicationem recensere vis, hanc optionem eligere potes ut processum accuratum adhibeas.",
            zh: "即将获取远程数据。\n\n首先，应如何处理从此远程来源获取的数据？\n\n- **${NEWER_WINS}**：比较文件的修改时间，采用较新的版本。\n  如果你一直在使用 Tabularium，并在多台设备上做过修改，此选项可能适合你，因为它会尝试根据修改时间合并变更。\n- **${REMOTE_WINS}**：以远程数据为准。\n  如果你刚开始使用 Tabularium，此选项可能最容易理解和上手。\n  它会用远程数据覆盖所有本地文件，因此如果笔记库中有重要数据，请确保已做好备份。\n- **${DETAILED}**：打开详细设置向导。\n  如果你希望更好地控制同步过程，或想在应用前查看变更，可以选择此选项使用详细流程。",
        },
    "We don't have any history for this note.": {
        def: "We don't have any history for this note.",
        la: "Nulla historia huius commentarii nobis est.",
        zh: "此笔记没有任何历史记录。",
    },
    "We recommend that you copy your Vault folder to a safe location. This will provide a safeguard in case a large number of conflicts arise, or if you accidentally synchronise with an incorrect destination.":
        {
            def: "We recommend that you copy your Vault folder to a safe location. This will provide a safeguard in case a large number of conflicts arise, or if you accidentally synchronise with an incorrect destination.",
            la: "Suademus ut thecam tabularii tui in locum tutum exscribas. Hoc praesidium praebebit si multae discrepantiae oriuntur, aut si per errorem cum destinatione falsa synchronizas.",
            zh: "我们建议你把库文件夹复制到安全位置。这样在出现大量冲突，或不小心同步到错误目标时，能多一层保障。",
        },
    "When you save a file in the editor, start a sync automatically": {
        def: "When you save a file in the editor, start a sync automatically",
        la: "Cum plicam in editore servas, synchronizationem automatice incipe",
        zh: "当您在编辑器中保存文件时,自动开始同步",
    },
    "Write credentials in the file": {
        def: "Write credentials in the file",
        la: "Inscribe testimonia in plicam",
        zh: "将凭据写入文件",
    },
    "Write logs into the file": {
        def: "Write logs into the file",
        la: "Inscribe acta in plicam",
        zh: "将日志写入文件",
    },
    "You should create a new synchronisation destination and rebuild your data there.": {
        def: "You should create a new synchronisation destination and rebuild your data there.",
        la: "Novam destinationem synchronizationis creare et data tua ibi reaedificare debes.",
        zh: "你应当创建一个新的同步目标，并在那里重建数据。",
    },
    "You should perform this operation only in exceptional circumstances, such as when the server data is completely corrupted, when changes on all other devices are no longer needed, or when the database size has become unusually large in comparison to the Vault size.":
        {
            def: "You should perform this operation only in exceptional circumstances, such as when the server data is completely corrupted, when changes on all other devices are no longer needed, or when the database size has become unusually large in comparison to the Vault size.",
            la: "Hanc operationem tantum in condicionibus extraordinariis perficere debes, ut cum data ministratoris omnino corrupta sunt, cum mutationes in omnibus aliis instrumentis non iam necessariae sunt, aut cum magnitudo repositorii prae magnitudine tabularii insolite magna facta est.",
            zh: "你只应在特殊情况下执行此操作，例如服务器数据完全损坏、其他所有设备上的更改都不再需要，或数据库体积相对于库体积异常庞大时。",
        },
    "(RegExp) Limit normal files to matching paths. Leave empty to allow all normal file paths. Hidden File Sync uses its own target patterns.":
        {
            la: "(RegExp) Plicas ordinarias ad vias congruentes limita. Vacuum relinque ut omnes viae plicarum ordinariarum permittantur. Synchronizatio plicarum occultarum suis exemplaribus propriis utitur.",
            zh: "（正则表达式）只同步路径匹配的普通文件。留空则允许所有普通文件路径。隐藏文件同步使用自己的目标模式。",
        },
    "(RegExp) Skip changes to matching normal and hidden files, locally and remotely.": {
        la: "(RegExp) Mutationes plicarum ordinariarum et occultarum congruentium, localiter et remote, praetermitte.",
        zh: "（正则表达式）跳过匹配的普通文件和隐藏文件在本地和远程的变更。",
    },
    "${ROLE}: ${REVISION}": {
        la: "${ROLE}: ${REVISION}",
        zh: "${ROLE}：${REVISION}",
    },
    Accepted: {
        la: "Acceptum",
        zh: "已接受",
    },
    "Active Remote Type": {
        la: "Genus remotum activum",
        zh: "当前远程类型",
    },
    "After restarting, select an online source device for the initial Fetch. The local LiveSync database on this device will be rebuilt from that source. Unsynchronised files in this Vault may conflict with the fetched data.":
        {
            la: "Post iteratum initium, instrumentum fontis online elige ad primam arcessionem. Repositorium Tabularium locale in hoc instrumento ex illo fonte reaedificabitur. Plicae non synchronizatae in hoc tabulario cum datis arcessitis discrepare possunt.",
            zh: "重启后，请选择一台在线的源设备进行首次获取。本设备上的本地数据库将根据该源设备重建。本笔记库中未同步的文件可能与获取的数据产生冲突。",
        },
    "All revisions and chunk availability below are a snapshot of this device's local database; the remote is not queried. Review the Vault-relative path, document identifier, content-derived chunk identifiers, and metadata before sharing this report. File contents are omitted.":
        {
            la: "Omnes recensiones et praesto esse fragmentorum infra sunt imago momentanea repositorii localis huius instrumenti; remotum non interrogatur. Viam relativam ad tabularium, identificatorem documenti, identificatores fragmentorum ex contento derivatos et metadata recense antequam hanc relationem communices. Contenta plicarum omittuntur.",
            zh: "以下所有修订版本和块可用性都是本设备本地数据库的快照，不会查询远程。分享此报告前，请检查其中相对于笔记库的路径、文档标识符、由内容派生的块标识符和元数据。报告不包含文件内容。",
        },
    "An exact target is already present; repair can remove the obsolete ID.": {
        la: "Scopus exactus iam adest; reparatio ID obsoletum removere potest.",
        zh: "已存在完全匹配的目标；修复可以移除过时的 ID。",
    },
    "An ID source is required to enable this option.": {
        la: "Fons ID requiritur ut haec optio activetur.",
        zh: "启用此选项需要提供 ID 来源。",
    },
    "Announce changes": {
        la: "Nuntia mutationes",
        zh: "广播变更",
    },
    "Announce changes automatically after connecting": {
        la: "Nuntia mutationes automatice post conexionem",
        zh: "连接后自动广播变更",
    },
    "App version": {
        la: "Versio applicationis",
        zh: "应用版本",
    },
    "Application ID": {
        la: "ID applicationis",
        zh: "应用 ID",
    },
    "Apply database revision ${REVISION} to ${FILE}? The current Vault file will be overwritten.": {
        la: "Applicarene recensionem repositorii ${REVISION} ad ${FILE}? Plica tabularii praesens superscribetur.",
        zh: "将数据库修订版本 ${REVISION} 应用到 ${FILE}？笔记库中的当前文件将被覆盖。",
    },
    "Apply database revision to Vault": {
        la: "Applica recensionem repositorii ad tabularium",
        zh: "将数据库修订版本应用到笔记库",
    },
    "Apply logical deletion ${REVISION} to ${FILE}? The current Vault file will be removed.": {
        la: "Applicarene deletionem logicam ${REVISION} ad ${FILE}? Plica tabularii praesens removebitur.",
        zh: "将逻辑删除 ${REVISION} 应用到 ${FILE}？笔记库中的当前文件将被移除。",
    },
    "Apply logical deletion to Vault": {
        la: "Applica deletionem logicam ad tabularium",
        zh: "将逻辑删除应用到笔记库",
    },
    "Apply pending changes now": {
        la: "Applica mutationes pendentes nunc",
        zh: "立即应用待处理的变更",
    },
    "Apply settings only (advanced)": {
        la: "Applica optiones tantum (provectum)",
        zh: "仅应用设置（高级）",
    },
    "Apply this revision to Vault": {
        la: "Applica hanc recensionem ad tabularium",
        zh: "将此修订版本应用到笔记库",
    },
    "Auto-accept compatible tweak mismatches": {
        la: "Accipe automatice discrepantias tweak compatibiles",
        zh: "自动接受兼容的调整值不一致",
    },
    "Automatically accepts mismatches that are compatible but potentially lossy by comparing tweak modification times.":
        {
            la: "Discrepantias compatibiles sed fortasse damnosas automatice accipit, tempora mutationis tweak comparando.",
            zh: "通过比较调整值的修改时间，自动接受兼容但可能丢失信息的不一致。",
        },
    "Automatically broadcast changes to connected peers": {
        la: "Mutationes ad pares conexos automatice divulga",
        zh: "自动向已连接的对等方广播变更",
    },
    "Automatically start P2P connection on launch": {
        la: "Conexionem P2P in initio automatice incipe",
        zh: "启动时自动开始 P2P 连接",
    },
    "Back to matches": {
        la: "Retro ad congruentias",
        zh: "返回匹配结果",
    },
    "Begin inspection": {
        la: "Incipe inspectionem",
        zh: "开始检查",
    },
    "Calculating database usage": {
        la: "Usus repositorii computatur",
        zh: "正在计算数据库用量",
    },
    "Cancel inspection": {
        la: "Abroga inspectionem",
        zh: "取消检查",
    },
    "Cancelling inspection…": {
        la: "Inspectio abrogatur…",
        zh: "正在取消检查…",
    },
    "Cancelling local search. Checked ${COUNT} entries.": {
        la: "Quaestio localis abrogatur. ${COUNT} inscriptiones inspectae.",
        zh: "正在取消本地搜索。已检查 ${COUNT} 个条目。",
    },
    "Change CouchDB server setting": {
        la: "Muta optionem ministratoris CouchDB",
        zh: "更改 CouchDB 服务器设置",
    },
    "Change CouchDB server setting '${SETTING}' to '${VALUE}'?": {
        la: "Mutarene optionem ministratoris CouchDB “${SETTING}” in “${VALUE}”?",
        zh: "将 CouchDB 服务器设置「${SETTING}」更改为「${VALUE}」？",
    },
    "Changing the E2EE passphrase changes IDs generated by the legacy configuration.": {
        la: "Mutatio tesserae arcanae E2EE identificatores a configuratione hereditaria generatos mutat.",
        zh: "更改 E2EE 密码短语会改变旧版配置生成的 ID。",
    },
    "Checked ${COUNT} local entries.": {
        la: "${COUNT} inscriptiones locales inspectae.",
        zh: "已检查 ${COUNT} 个本地条目。",
    },
    "Choose a file to inspect": {
        la: "Elige plicam inspiciendam",
        zh: "选择要检查的文件",
    },
    "Choose a long, unpredictable source. It is used once and cannot be shown again after saving. A recovery code can be displayed on this device later. This input also accepts a tagged recovery code.":
        {
            la: "Elige fontem longum et imprevisibilem. Semel adhibetur nec post servationem iterum ostendi potest. Codex recuperationis in hoc instrumento postea ostendi potest. Hic campus etiam codicem recuperationis signatum accipit.",
            zh: "请选择一个足够长且无法预测的来源。它只使用一次，保存后无法再次显示。之后可以在本设备上显示恢复码。此输入框也接受带标签的恢复码。",
        },
    "Choose file": {
        la: "Elige plicam",
        zh: "选择文件",
    },
    "Chunk revisions are always derived from their content. This stored key is retained only for compatibility.": {
        la: "Recensiones fragmentorum semper ex contento eorum derivantur. Haec clavis servata solum compatibilitatis causa retinetur.",
        zh: "块的修订版本始终由其内容派生。保留此已存储的键仅为兼容。",
    },
    "Chunk Splitter": {
        la: "Divisor fragmentorum",
        zh: "块分割器",
    },
    "Compare with Vault": {
        la: "Compara cum tabulario",
        zh: "与笔记库比较",
    },
    "Configure TURN when a direct connection cannot be established or when you select TURN relay only.": {
        la: "Configura TURN cum conexio directa constitui non potest vel cum solum relationem TURN eligis.",
        zh: "当无法建立直接连接，或选择了仅使用 TURN 中继时，请配置 TURN。",
    },
    Configured: {
        la: "Configuratum",
        zh: "已配置",
    },
    "Conflict revision": {
        la: "Recensio discrepans",
        zh: "冲突修订版本",
    },
    "Conflicts: ${COUNT}": {
        la: "Discrepantiae: ${COUNT}",
        zh: "冲突：${COUNT}",
    },
    "Connection compatibility": {
        la: "Compatibilitas conexionis",
        zh: "连接兼容性",
    },
    "Connection path": {
        la: "Via conexionis",
        zh: "连接路径",
    },
    "Connection settings": {
        la: "Optiones conexionis",
        zh: "连接设置",
    },
    Conservative: {
        la: "Cautum",
        zh: "保守",
    },
    "Content-derived chunk revisions (obsolete setting)": {
        la: "Recensiones fragmentorum ex contento derivatae (optio obsoleta)",
        zh: "由内容派生的块修订版本（已弃用的设置）",
    },
    "Copy database information": {
        la: "Exscribe informationes repositorii",
        zh: "复制数据库信息",
    },
    "Copy database information for a file": {
        la: "Exscribe informationes repositorii de plica",
        zh: "复制文件的数据库信息",
    },
    "Copy database information for the active file": {
        la: "Exscribe informationes repositorii de plica activa",
        zh: "复制当前文件的数据库信息",
    },
    "Copy failed. Select the report text and copy it manually.": {
        la: "Exscriptio defecit. Textum relationis elige et manu exscribe.",
        zh: "复制失败。请选中报告文本后手动复制。",
    },
    "Copy recovery code": {
        la: "Exscribe codicem recuperationis",
        zh: "复制恢复码",
    },
    "Copy report": {
        la: "Exscribe relationem",
        zh: "复制报告",
    },
    "Copy revision, conflict, and local chunk availability information, including document and chunk identifiers but not file contents.":
        {
            la: "Exscribe informationes de recensionibus, discrepantiis et praesto esse fragmentorum localium, inclusis identificatoribus documentorum et fragmentorum, sed non contentis plicarum.",
            zh: "复制修订版本、冲突和本地块可用性信息，包括文档和块标识符，但不包括文件内容。",
        },
    "Could Not Read Synchronisation Settings": {
        la: "Optiones synchronizationis legi non potuerunt",
        zh: "无法读取同步设置",
    },
    "Could not read the remote's synchronisation settings. Check the connection and credentials, then retry.": {
        la: "Optiones synchronizationis remoti legi non potuerunt. Conexionem et testimonia inspice, deinde iterum conare.",
        zh: "无法读取远程的同步设置。请检查连接和凭据，然后重试。",
    },
    "Could not read the remote's synchronisation settings. Retry, or continue the overwrite with this device's settings. A working connection is still required.":
        {
            la: "Optiones synchronizationis remoti legi non potuerunt. Iterum conare, vel superscriptionem cum optionibus huius instrumenti continua. Conexio operans tamen requiritur.",
            zh: "无法读取远程的同步设置。请重试，或使用本设备的设置继续覆盖。仍然需要可用的连接。",
        },
    "Current configuration: a saved ID key is used.": {
        la: "Configuratio praesens: clavis ID servata adhibetur.",
        zh: "当前配置：使用已保存的 ID 密钥。",
    },
    "Current configuration: no ID key is saved. With E2EE enabled, keeping it uses legacy IDs tied to the E2EE passphrase.":
        {
            la: "Configuratio praesens: nulla clavis ID servata est. E2EE activo, si sic relinquitur, identificatores hereditarii tesserae arcanae E2EE alligati adhibentur.",
            zh: "当前配置：未保存 ID 密钥。启用 E2EE 时，保持此配置将使用与 E2EE 密码短语绑定的旧版 ID。",
        },
    "Current configuration: the saved ID key is retained while E2EE is off.": {
        la: "Configuratio praesens: clavis ID servata retinetur dum E2EE deactivatum est.",
        zh: "当前配置：E2EE 关闭期间保留已保存的 ID 密钥。",
    },
    "Current ID recovery code": {
        la: "Codex recuperationis ID praesens",
        zh: "当前 ID 恢复码",
    },
    "Current Vault file": {
        la: "Plica tabularii praesens",
        zh: "笔记库中的当前文件",
    },
    "Custom headers for requesting the bucket. e.g. `x-custom-header1: value1\n x-custom-header2: value2`": {
        la: "Capita propria ad petitiones situlae. e.g. `x-custom-header1: value1\n x-custom-header2: value2`",
        zh: "请求存储桶时使用的自定义请求头。例如 `x-custom-header1: value1\n x-custom-header2: value2`",
    },
    "Custom headers for requesting the CouchDB. e.g. `x-custom-header1: value1\n x-custom-header2: value2`": {
        la: "Capita propria ad petitiones CouchDB. e.g. `x-custom-header1: value1\n x-custom-header2: value2`",
        zh: "请求 CouchDB 时使用的自定义请求头。例如 `x-custom-header1: value1\n x-custom-header2: value2`",
    },
    "Database information for ${FILE}": {
        la: "Informationes repositorii de ${FILE}",
        zh: "${FILE} 的数据库信息",
    },
    "Database revision": {
        la: "Recensio repositorii",
        zh: "数据库修订版本",
    },
    "Database revision is newer": {
        la: "Recensio repositorii recentior est",
        zh: "数据库修订版本较新",
    },
    "DB ${DATABASE_TIME} · Vault ${VAULT_TIME} · Δtime ${DIFFERENCE} ms (${RELATION})": {
        la: "Repositorium ${DATABASE_TIME} · Tabularium ${VAULT_TIME} · Δtempus ${DIFFERENCE} ms (${RELATION})",
        zh: "数据库 ${DATABASE_TIME} · 笔记库 ${VAULT_TIME} · Δ时间 ${DIFFERENCE} ms（${RELATION}）",
    },
    "DB: recorded ${RECORDED} B · decoded ${DECODED} B · Δsize ${DIFFERENCE} B": {
        la: "Repositorium: inscriptum ${RECORDED} B · decodatum ${DECODED} B · Δmagnitudo ${DIFFERENCE} B",
        zh: "数据库：记录 ${RECORDED} B · 解码 ${DECODED} B · Δ大小 ${DIFFERENCE} B",
    },
    "DB: recorded ${RECORDED} B · decoded unavailable": {
        la: "Repositorium: inscriptum ${RECORDED} B · decodatum non praesto",
        zh: "数据库：记录 ${RECORDED} B · 无法解码",
    },
    "Derive from current E2EE passphrase": {
        la: "Deriva ex tessera arcana E2EE praesenti",
        zh: "从当前 E2EE 密码短语派生",
    },
    "Desktop only; uses more battery and network.": {
        la: "Solum in computatris mensalibus; plus pilae et retis consumit.",
        zh: "仅限桌面端；会消耗更多电量和流量。",
    },
    "Diagnostic report": {
        la: "Relatio diagnostica",
        zh: "诊断报告",
    },
    "Differs from Vault": {
        la: "A tabulario differt",
        zh: "与笔记库不同",
    },
    "Discard branch": {
        la: "Abice ramum",
        zh: "丢弃分支",
    },
    "Discard database branch ${REVISION} of ${FILE}? This creates a logical deletion for that exact live branch. The current Vault file will not be changed.":
        {
            la: "Abicerene ramum repositorii ${REVISION} plicae ${FILE}? Hoc deletionem logicam illius ipsius rami vivi creat. Plica tabularii praesens non mutabitur.",
            zh: "丢弃 ${FILE} 的数据库分支 ${REVISION}？这会为该活动分支创建一个逻辑删除。笔记库中的当前文件不会改变。",
        },
    "Discard database revision ${REVISION} of ${FILE}? This creates a logical deletion for that exact live revision. Missing content cannot be recovered by this action.":
        {
            la: "Abicerene recensionem repositorii ${REVISION} plicae ${FILE}? Hoc deletionem logicam illius ipsius recensionis vivae creat. Contentum deficiens hac actione recuperari non potest.",
            zh: "丢弃 ${FILE} 的数据库修订版本 ${REVISION}？这会为该活动修订版本创建一个逻辑删除。此操作无法恢复已缺失的内容。",
        },
    "Discard this branch": {
        la: "Abice hunc ramum",
        zh: "丢弃此分支",
    },
    "Discard unreadable revision": {
        la: "Abice recensionem illegibilem",
        zh: "丢弃无法读取的修订版本",
    },
    "Discovering revisions": {
        la: "Recensiones inveniuntur",
        zh: "正在查找修订版本",
    },
    "Download requested. You can also copy the report if downloads are unavailable on this device.": {
        la: "Deorsum latio petita est. Relationem etiam exscribere potes si deorsum latio in hoc instrumento praesto non est.",
        zh: "已请求下载。如果本设备无法下载，也可以复制报告。",
    },
    "Effectively a directory. Should end with `/`. e.g., `vault-name/`.": {
        la: "Re vera directorium. In `/` desinere debet. e.g., `vault-name/`.",
        zh: "相当于一个目录，应以 `/` 结尾。例如 `vault-name/`。",
    },
    "Enable Developers' Debug Tools (If available).": {
        la: "Activa instrumenta purgandi programmatorum (si praesto sunt).",
        zh: "启用开发者调试工具（如果可用）。",
    },
    "Enable forcePathStyle": {
        la: "Activa forcePathStyle",
        zh: "启用 forcePathStyle",
    },
    "Enable P2P Synchronization": {
        la: "Activa synchronizationem P2P",
        zh: "启用 P2P 同步",
    },
    "Enable per-file customization sync": {
        la: "Activa synchronizationem optionum propriarum per singulas plicas",
        zh: "启用按文件的自定义同步",
    },
    "Encrypt file properties (paths, times, sizes, and Chunk references) used by Hidden File Sync and Customisation Sync. This affects future writes; manually rebuild the remote database to protect existing properties. Requires E2EE V2, Property Encryption, and compatible clients on every device.":
        {
            la: "Proprietates plicarum (vias, tempora, magnitudines et relationes ad fragmenta) crypta quibus synchronizatio plicarum occultarum et synchronizatio optionum propriarum utuntur. Hoc ad scripturas futuras pertinet; repositorium remotum manu reaedifica ut proprietates exstantes protegas. Requirit E2EE V2, cryptationem proprietatum et clientes compatibiles in omni instrumento.",
            zh: "加密隐藏文件同步和自定义同步使用的文件属性（路径、时间、大小和块引用）。此设置影响之后的写入；如需保护已有属性，请手动重建远程数据库。需要 E2EE V2、属性加密，并且每台设备都使用兼容的客户端。",
        },
    "Encrypt internal file Properties": {
        la: "Crypta proprietates plicarum internarum",
        zh: "加密内部文件属性",
    },
    "Encryption passphrase. If changed, you should overwrite the server's database with the new (encrypted) files.": {
        la: "Tessera arcana cryptationis. Si mutatur, repositorium ministratoris novis plicis (cryptatis) superscribere debes.",
        zh: "E2EE 密码短语。如果更改，应使用新的（加密后的）文件覆盖服务器上的数据库。",
    },
    "End-to-End Encryption Algorithm": {
        la: "Algorithmus cryptationis ab extremo ad extremum",
        zh: "端到端加密算法",
    },
    "Enter a TURN Key API Token.": {
        la: "Insere signum API clavis TURN.",
        zh: "请输入 TURN Key API 令牌。",
    },
    "Enter a TURN Key ID.": {
        la: "Insere ID clavis TURN.",
        zh: "请输入 TURN Key ID。",
    },
    "Enter a valid report path pseudonym.": {
        la: "Insere pseudonymum viae relationis validum.",
        zh: "请输入有效的报告路径化名。",
    },
    "Enter an ID recovery code": {
        la: "Insere codicem recuperationis ID",
        zh: "输入 ID 恢复码",
    },
    "Enter an ID source": {
        la: "Insere fontem ID",
        zh: "输入 ID 来源",
    },
    "Expected document ID: ${ID}": {
        la: "ID documenti exspectatum: ${ID}",
        zh: "预期的文档 ID：${ID}",
    },
    "File prefix on the bucket": {
        la: "Praefixum plicarum in situla",
        zh: "存储桶中的文件前缀",
    },
    "Files with modification times greater than this value (in seconds since the Unix epoch) will not have their events reflected. Set to 0 to disable this limit.":
        {
            la: "Plicarum quarum tempora mutationis hoc valore maiora sunt (in secundis ab epocha Unix) eventus non reddentur. 0 constitue ut hic limes deactivetur.",
            zh: "修改时间大于此值（自 Unix 纪元起的秒数）的文件，其事件将不会被反映。设为 0 可取消此限制。",
        },
    "Find a file from a report pseudonym": {
        la: "Inveni plicam ex pseudonymo relationis",
        zh: "根据报告化名查找文件",
    },
    "Find file": {
        la: "Inveni plicam",
        zh: "查找文件",
    },
    "Find matching paths in this Vault and local Metadata, then prepare a follow-up report using the same pseudonyms.":
        {
            la: "Vias congruentes in hoc tabulario et in metadatis localibus inveni, deinde relationem sequentem eisdem pseudonymis utentem para.",
            zh: "在本笔记库和本地元数据中查找匹配的路径，然后使用相同的化名准备后续报告。",
        },
    "Follow changes": {
        la: "Sequere mutationes",
        zh: "跟随变更",
    },
    "Follow changes from this device": {
        la: "Sequere mutationes ex hoc instrumento",
        zh: "跟随此设备的变更",
    },
    "Follow whenever this device connects": {
        la: "Sequere quotiens hoc instrumentum conectitur",
        zh: "每当此设备连接时跟随",
    },
    "For recovery after losing every device, save the recovery code after setup or choose an ID source you can reproduce.":
        {
            la: "Ad recuperationem post omnia instrumenta amissa, codicem recuperationis post configurationem serva vel fontem ID elige quem reproducere potes.",
            zh: "为了在丢失所有设备后仍能恢复，请在设置完成后保存恢复码，或选择一个你能重新生成的 ID 来源。",
        },
    "Forget device": {
        la: "Obliviscere instrumentum",
        zh: "忘记设备",
    },
    "Forget this device record?": {
        la: "Oblivisceris huius instrumenti memoriam?",
        zh: "要忘记此设备记录吗？",
    },
    "Forgetting the record does not delete Vault files or revoke credentials.": {
        la: "Memoriae oblivio plicas tabularii non delet nec testimonia revocat.",
        zh: "忘记记录不会删除笔记库中的文件，也不会吊销凭据。",
    },
    "Forgetting…": {
        la: "Oblivio fit…",
        zh: "正在忘记…",
    },
    "Found ${COUNT} local matches.": {
        la: "${COUNT} congruentiae locales inventae.",
        zh: "找到 ${COUNT} 个本地匹配项。",
    },
    "Generate a random ID key": {
        la: "Genera clavem ID fortuitam",
        zh: "生成随机 ID 密钥",
    },
    "Hidden File Sync initialisation was not started.": {
        la: "Initium synchronizationis plicarum occultarum non est inceptum.",
        zh: "隐藏文件同步的初始化尚未开始。",
    },
    "Hidden File Sync is disabled on this device. Enable it in Sync Settings before using Automatic or initialising hidden files.":
        {
            la: "Synchronizatio plicarum occultarum in hoc instrumento deactivata est. Eam in optionibus synchronizationis activa antequam modo automatico utaris vel plicas occultas initialiter pares.",
            zh: "本设备已停用隐藏文件同步。在使用自动模式或初始化隐藏文件之前，请先在同步设置中启用它。",
        },
    "Hide current recovery code": {
        la: "Cela codicem recuperationis praesentem",
        zh: "隐藏当前恢复码",
    },
    "How to set the ID key": {
        la: "Quomodo clavis ID constituatur",
        zh: "如何设置 ID 密钥",
    },
    "ID generation": {
        la: "Generatio ID",
        zh: "ID 生成",
    },
    "ID recovery code": {
        la: "Codex recuperationis ID",
        zh: "ID 恢复码",
    },
    "ID source": {
        la: "Fons ID",
        zh: "ID 来源",
    },
    "If enabled, changes will be automatically broadcasted to all connected peers. Notified peers will start fetching the changes.":
        {
            la: "Si activum est, mutationes ad omnes pares conexos automatice divulgabuntur. Pares certiores facti mutationes arcessere incipient.",
            zh: "启用后，变更将自动广播给所有已连接的对等方。收到通知的对等方会开始获取这些变更。",
        },
    "If enabled, efficient per-file customization sync will be used. A minor migration is required when enabling this feature, and all devices must be updated to v0.23.18. Enabling this feature will result in losing compatibility with older versions.":
        {
            la: "Si activum est, synchronizatio optionum propriarum efficax per singulas plicas adhibebitur. Cum haec facultas activatur, parva migratio requiritur, et omnia instrumenta ad v0.23.18 renovanda sunt. Activatio huius facultatis compatibilitatem cum versionibus vetustioribus tollet.",
            zh: "启用后，将使用高效的按文件自定义同步。启用此功能需要进行一次小规模迁移，并且所有设备都必须更新到 v0.23.18。启用此功能将失去与旧版本的兼容性。",
        },
    "If enabled, the file properties will be encrypted in the remote database. This is useful for protecting sensitive information in file paths, sizes, and IDs of its chunks. If you are using V1 E2EE, this only obfuscates the file path.":
        {
            la: "Si activum est, proprietates plicarum in repositorio remoto cryptabuntur. Hoc utile est ad informationes sensibiles in viis plicarum, magnitudinibus et ID fragmentorum protegendas. Si E2EE V1 uteris, hoc solum viam plicae obscurat.",
            zh: "启用后，文件属性将在远程数据库中加密。这有助于保护文件路径、大小及其块 ID 中的敏感信息。如果使用 V1 E2EE，则只会混淆文件路径。",
        },
    "If enabled, the forcePathStyle option will be used for bucket operations.": {
        la: "Si activum est, optio forcePathStyle ad operationes situlae adhibebitur.",
        zh: "启用后，存储桶操作将使用 forcePathStyle 选项。",
    },
    "If enabled, the P2P connection will be automatically started when the application launches.": {
        la: "Si activum est, conexio P2P automatice incipietur cum applicatio initium capit.",
        zh: "启用后，应用启动时将自动开始 P2P 连接。",
    },
    "If enabled, the plugin will not attempt to connect to the remote database even if the chunk was not found locally.":
        {
            la: "Si activum est, additamentum ad repositorium remotum conectere non conabitur etiamsi fragmentum localiter non inventum est.",
            zh: "启用后，即使本地找不到块，插件也不会尝试连接远程数据库。",
        },
    "If enabled, the request API will be used to avoid `inevitable` CORS problems. This is a workaround and may not work in all cases. PLEASE READ THE DOCUMENTATION BEFORE USING THIS OPTION. This is a less-secure option.":
        {
            la: "Si activum est, API petitionum adhibebitur ad difficultates CORS `inevitable` vitandas. Hoc est remedium temporarium nec in omnibus casibus fortasse operabitur. QUAESO DOCUMENTA LEGE ANTEQUAM HAC OPTIONE UTARIS. Haec optio minus tuta est.",
            zh: "启用后，将使用 request API 来规避`无法避免的`CORS 问题。这是一种变通方法，未必在所有情况下都有效。使用此选项前请务必阅读文档。此选项的安全性较低。",
        },
    "If this enabled, JWT will be used for authentication.": {
        la: "Si hoc activum est, JWT ad authenticationem adhibebitur.",
        zh: "启用后，将使用 JWT 进行认证。",
    },
    "Import an ID recovery code": {
        la: "Importa codicem recuperationis ID",
        zh: "导入 ID 恢复码",
    },
    "Include in the P2P synchronisation command": {
        la: "Include in mandato synchronizationis P2P",
        zh: "包含在 P2P 同步命令中",
    },
    "Include remote database": {
        la: "Include repositorium remotum",
        zh: "包含远程数据库",
    },
    "Initialise or overwrite the remote": {
        la: "Initia vel superscribe remotum",
        zh: "初始化或覆盖远程",
    },
    Inspect: {
        la: "Inspice",
        zh: "检查",
    },
    "Inspect conflicts and file/database differences": {
        la: "Inspice discrepantias et differentias inter plicas et repositorium",
        zh: "检查冲突以及文件与数据库的差异",
    },
    "Inspect database integrity": {
        la: "Inspice integritatem repositorii",
        zh: "检查数据库完整性",
    },
    "Inspect normal-file Metadata, current conflicts, and suspect content against the Vault. Remote inspection supports CouchDB. Older history is excluded; findings do not authorise deletion.":
        {
            la: "Metadata plicarum ordinariarum, discrepantias praesentes et contentum suspectum cum tabulario confer. Inspectio remota CouchDB sustinet. Historia vetustior excluditur; inventa deletionem non permittunt.",
            zh: "对照笔记库检查普通文件的元数据、当前冲突和可疑内容。远程检查支持 CouchDB。不包括较早的历史记录；检查结果不代表可以删除。",
        },
    "Inspection cancelled. The report contains only the evidence collected so far.": {
        la: "Inspectio abrogata. Relatio solum testimonia hactenus collecta continet.",
        zh: "检查已取消。报告只包含目前已收集的证据。",
    },
    "Inspection completed. Review the findings and coverage before sharing.": {
        la: "Inspectio perfecta. Inventa et ambitum recense antequam communices.",
        zh: "检查已完成。分享前请查看检查结果和覆盖范围。",
    },
    "Inspection failed. The report records the available evidence and reasons.": {
        la: "Inspectio defecit. Relatio testimonia praesto et causas recordatur.",
        zh: "检查失败。报告记录了现有的证据和原因。",
    },
    "Inspection partially completed. Some information could not be checked; review the reported reasons.": {
        la: "Inspectio ex parte perfecta. Quaedam informationes inspici non potuerunt; causas relatas recense.",
        zh: "检查部分完成。部分信息无法检查，请查看报告中列出的原因。",
    },
    "Internal timestamp for resolving compatible tweak mismatches.": {
        la: "Signum temporis internum ad discrepantias tweak compatibiles resolvendas.",
        zh: "用于解决兼容的调整值不一致的内部时间戳。",
    },
    "Items inspected": {
        la: "Res inspectae",
        zh: "已检查的项目",
    },
    "Join this device": {
        la: "Adiunge hoc instrumentum",
        zh: "加入此设备",
    },
    "Joined devices": {
        la: "Instrumenta adiuncta",
        zh: "已加入的设备",
    },
    "Joined devices are available after database startup with an active CouchDB or Object Storage connection.": {
        la: "Instrumenta adiuncta praesto sunt post initium repositorii cum conexione activa ad CouchDB vel repositorium obiectorum.",
        zh: "数据库启动并且有可用的 CouchDB 或对象存储连接后，才能查看已加入的设备。",
    },
    "Joined devices could not be updated. Refresh the list and try again. If the remote configuration has changed, close this dialogue and open Joined devices again.":
        {
            la: "Instrumenta adiuncta renovari non potuerunt. Indicem renova et iterum conare. Si configuratio remota mutata est, hunc dialogum claude et instrumenta adiuncta iterum aperi.",
            zh: "无法更新已加入的设备。请刷新列表后重试。如果远程配置已更改，请关闭此对话框，然后重新打开「已加入的设备」。",
        },
    "Keep current configuration": {
        la: "Serva configurationem praesentem",
        zh: "保留当前配置",
    },
    "Keep replication active in the background": {
        la: "Serva replicationem activam in recessu",
        zh: "在后台保持复制",
    },
    "Keep unchanged": {
        la: "Relinque immutatum",
        zh: "保持不变",
    },
    "Key ID": {
        la: "ID clavis",
        zh: "Key ID",
    },
    "Keypair or pre-shared key": {
        la: "Par clavium vel clavis praecommunicata",
        zh: "密钥对或预共享密钥",
    },
    "Last recorded": {
        la: "Ultimo recordatum",
        zh: "最后记录",
    },
    "Last tweak modified timestamp": {
        la: "Signum temporis ultimae mutationis tweak",
        zh: "调整值的最后修改时间戳",
    },
    "Learn more about P2P connections": {
        la: "Plura de conexionibus P2P disce",
        zh: "了解 P2P 连接",
    },
    "Learn more about signalling and TURN": {
        la: "Plura de significatione et TURN disce",
        zh: "了解信令和 TURN",
    },
    "Leave this input empty to keep the saved ID key.": {
        la: "Hunc campum vacuum relinque ut clavem ID servatam retineas.",
        zh: "留空此输入框以保留已保存的 ID 密钥。",
    },
    "Loading joined devices…": {
        la: "Instrumenta adiuncta onerantur…",
        zh: "正在加载已加入的设备…",
    },
    "Local DB: missing": {
        la: "Repositorium locale: deest",
        zh: "本地数据库：缺失",
    },
    "Local file diagnostic report": {
        la: "Relatio diagnostica plicae localis",
        zh: "本地文件诊断报告",
    },
    "Locked out": {
        la: "Exclusum",
        zh: "已锁定",
    },
    "Logical deletion": {
        la: "Deletio logica",
        zh: "逻辑删除",
    },
    "Longest chunk line threshold value (Not Configurable from the UI Now).": {
        la: "Limen longissimae lineae fragmenti (nunc ex UI configurari non potest).",
        zh: "最长块行阈值（目前无法在界面中配置）。",
    },
    "Managed (Cloudflare)": {
        la: "Administratum (Cloudflare)",
        zh: "托管（Cloudflare）",
    },
    Manual: {
        la: "Manuale",
        zh: "手动",
    },
    "Mark this revision as the Vault version": {
        la: "Nota hanc recensionem ut versionem tabularii",
        zh: "将此修订版本标记为笔记库版本",
    },
    "Matches Vault": {
        la: "Cum tabulario congruit",
        zh: "与笔记库一致",
    },
    "Maximum compatibility": {
        la: "Maxima compatibilitas",
        zh: "最大兼容性",
    },
    "Maximum file modification time for reflected file events": {
        la: "Maximum tempus mutationis plicae pro eventibus plicarum reddendis",
        zh: "反映文件事件的最大文件修改时间",
    },
    "Maximum request size for manually resending chunks": {
        la: "Maxima magnitudo petitionis ad fragmenta manu iterum mittenda",
        zh: "手动重新发送块时的最大请求大小",
    },
    "MB per request": {
        la: "MB per petitionem",
        zh: "每次请求的 MB 数",
    },
    Metadata: {
        la: "Metadata",
        zh: "元数据",
    },
    "Metadata document ID": {
        la: "ID documenti metadatorum",
        zh: "元数据文档 ID",
    },
    "Metadata document ID repair and the ordinary Vault scan completed. Run this inspection again after synchronisation.":
        {
            la: "Reparatio ID documentorum metadatorum et perlustratio ordinaria tabularii perfectae sunt. Hanc inspectionem post synchronizationem iterum exsequere.",
            zh: "元数据文档 ID 修复和常规笔记库扫描已完成。请在同步后再次运行此检查。",
        },
    "Metadata document ID repair completed, but the ordinary Vault scan did not run. Keep synchronisation paused, resolve the scan condition, then run 'Scan storage and database again'.":
        {
            la: "Reparatio ID documentorum metadatorum perfecta est, sed perlustratio ordinaria tabularii non est exsecuta. Synchronizationem suspensam tene, condicionem perlustrationis resolve, deinde “Scan storage and database again” exsequere.",
            zh: "元数据文档 ID 修复已完成，但常规笔记库扫描没有运行。请保持同步暂停，解决扫描条件后，再运行「再次扫描存储和数据库」。",
        },
    "Metadata entry requires review and was left unchanged": {
        la: "Inscriptio metadatorum recensionem requirit et immutata relicta est",
        zh: "元数据条目需要审查，已保持不变",
    },
    "Minimum Chunk Size (Not Configurable from the UI Now).": {
        la: "Minima magnitudo fragmenti (nunc ex UI configurari non potest).",
        zh: "最小块大小（目前无法在界面中配置）。",
    },
    Missing: {
        la: "Deest",
        zh: "缺失",
    },
    "Missing chunks: ${COUNT}": {
        la: "Fragmenta deficientia: ${COUNT}",
        zh: "缺失的块：${COUNT}",
    },
    "More actions for ${DEVICE}": {
        la: "Plures actiones pro ${DEVICE}",
        zh: "${DEVICE} 的更多操作",
    },
    "More actions for ${FILE}": {
        la: "Plures actiones pro ${FILE}",
        zh: "${FILE} 的更多操作",
    },
    "More actions for revision ${REVISION}": {
        la: "Plures actiones pro recensione ${REVISION}",
        zh: "修订版本 ${REVISION} 的更多操作",
    },
    "Move remotely deleted files to the trash, instead of deleting. (This setting is ineffective from Obsidian v1.7.2 onwards, as deletion always respects your Obsidian preferences.)":
        {
            la: "Plicas remote deletas in quisquilias move, pro eis delendis. (Haec optio ab Obsidian v1.7.2 deinceps inefficax est, quia deletio semper praeferentias Obsidian tuas observat.)",
            zh: "将远程已删除的文件移到回收站，而不是直接删除。（从 Obsidian v1.7.2 起此设置无效，因为删除操作始终遵循你的 Obsidian 偏好设置。）",
        },
    "Names in this report": {
        la: "Nomina in hac relatione",
        zh: "此报告中的名称",
    },
    "Newer Self-hosted LiveSync versions detected: ${versions}.": {
        la: "Versiones recentiores Tabularii detectae: ${versions}.",
        zh: "检测到较新的 Tabularium 版本：${versions}。",
    },
    "No central data-storage server is required, but a signalling relay is required for peer discovery. Both devices must be online at the same time. Vault data travels through the encrypted P2P connection, not through the signalling relay. Some features may be limited.":
        {
            la: "Nullus ministrator centralis ad data servanda requiritur, sed nuntius signorum (relay) ad pares inveniendos requiritur. Ambo instrumenta simul in linea esse debent. Data tabularii per conexionem P2P cryptatam, non per nuntium signorum, transeunt. Quaedam facultates fortasse limitatae erunt.",
            zh: "不需要中央数据存储服务器，但需要信令中继来发现对等方。两台设备必须同时在线。笔记库数据通过加密的 P2P 连接传输，不经过信令中继。部分功能可能受限。",
        },
    "No current Metadata document": {
        la: "Nullum documentum metadatorum currens",
        zh: "没有当前的元数据文档",
    },
    "No joined devices are recorded on this remote.": {
        la: "Nulla instrumenta adiuncta in hoc remoto notata sunt.",
        zh: "此远程没有已加入设备的记录。",
    },
    "No matches were found in current Vault paths or current local Metadata. Older history and remote-only files are not searched.":
        {
            la: "Nihil congruens inventum est in viis tabularii currentibus neque in metadatis localibus currentibus. Historia vetustior et plicae solum remotae non quaeruntur.",
            zh: "在当前笔记库路径或当前本地元数据中未找到匹配项。不会搜索较早的历史记录和仅存在于远程的文件。",
        },
    "No shared ancestor is available for this conflict. The live revisions remain available for explicit review.": {
        la: "Nullus antecessor communis huic discrepantiae praesto est. Recensiones vivae ad recognitionem expressam praesto manent.",
        zh: "此冲突没有可用的共同祖先。活动修订版本仍可供明确审查。",
    },
    "No Synchronisation Settings Found": {
        la: "Nullae optiones synchronizationis inventae",
        zh: "未找到同步设置",
    },
    "Not accepted": {
        la: "Non acceptum",
        zh: "未接受",
    },
    "Not recorded": {
        la: "Non notatum",
        zh: "未记录",
    },
    "Now we can choose how to split the chunks; V3 is the most efficient. If you have troubled, please make this Default or Legacy.":
        {
            la: "Nunc eligere possumus quomodo fragmenta dividantur; V3 efficacissimum est. Si difficultates habes, quaeso hoc ad Default vel Legacy pone.",
            zh: "现在可以选择块的分割方式；V3 效率最高。如果遇到问题，请改为 Default 或 Legacy。",
        },
    "Older Self-hosted LiveSync versions detected: ${versions}.": {
        la: "Versiones vetustiores Tabularii detectae: ${versions}.",
        zh: "检测到较旧的 Tabularium 版本：${versions}。",
    },
    "One-step repair is unavailable because this entry is ambiguous, no longer current, or unsafe to change.": {
        la: "Reparatio uno gradu non praesto est, quia haec inscriptio ambigua est, non iam currens, vel ad mutandum non tuta.",
        zh: "此条目含义不明确、已不是当前版本或更改不安全，因此无法一步修复。",
    },
    "Open file": {
        la: "Aperi plicam",
        zh: "打开文件",
    },
    "Original names": {
        la: "Nomina originalia",
        zh: "原始名称",
    },
    "P2P message size": {
        la: "Magnitudo nuntii P2P",
        zh: "P2P 消息大小",
    },
    "P2P requires no central data-storage server, but it still uses a signalling relay for peer discovery.": {
        la: "P2P nullum ministratorem centralem ad data servanda requirit, sed nuntium signorum ad pares inveniendos tamen adhibet.",
        zh: "P2P 不需要中央数据存储服务器，但仍会使用信令中继来发现对等方。",
    },
    "P2P Status pane": {
        la: "Tabula status P2P",
        zh: "P2P 状态面板",
    },
    "Partial Usage results are available as JSON so their coverage and reasons stay with the rows.": {
        la: "Eventus partiales usus ut JSON praesto sunt, ut ambitus et causae eorum cum ordinibus maneant.",
        zh: "部分用量结果以 JSON 提供，以便其覆盖范围和原因与各行数据保持在一起。",
    },
    "Paste a tagged recovery code from an existing device to restore the same ID key.": {
        la: "Insere codicem restitutionis notatum ex instrumento exstante ut eandem clavem ID restituas.",
        zh: "粘贴现有设备上带标签的恢复码，以恢复相同的 ID 密钥。",
    },
    "Peer discovery uses Nostr-compatible signalling relays.": {
        la: "Inventio parium nuntiis signorum cum Nostr congruentibus utitur.",
        zh: "对等方发现使用兼容 Nostr 的信令中继。",
    },
    Platform: {
        la: "Suggestus",
        zh: "平台",
    },
    "Please use V2, V1 is deprecated and will be removed in the future, It was not a very appropriate algorithm. Only for compatibility V1 is kept.":
        {
            la: "Quaeso V2 adhibe; V1 obsoletum est et in futuro removebitur, quia algorithmus non satis aptus erat. V1 tantum compatibilitatis causa servatur.",
            zh: "请使用 V2。V1 已弃用，并将在未来移除，它并不是一个很合适的算法，仅为兼容而保留。",
        },
    "Prepare follow-up report": {
        la: "Para relationem subsequentem",
        zh: "准备后续报告",
    },
    "Preparing follow-up report…": {
        la: "Relatio subsequens paratur…",
        zh: "正在准备后续报告…",
    },
    Present: {
        la: "Praesens",
        zh: "存在",
    },
    "Process files even if seems to be corrupted": {
        la: "Tracta plicas etiam si corruptae esse videntur",
        zh: "即使文件似乎已损坏也进行处理",
    },
    "Pseudonyms (recommended)": {
        la: "Pseudonyma (commendata)",
        zh: "化名（推荐）",
    },
    "Pseudonyms include a public salt, so guessed paths can be checked. Original names include private filenames. Reports omit file contents and credentials.":
        {
            la: "Pseudonyma salem publicum continent, ergo viae coniectae probari possunt. Nomina originalia nomina plicarum privata continent. Relationes contenta plicarum et credentialia omittunt.",
            zh: "化名包含公开的盐值，因此可以验证猜测的路径。原始名称包含私人文件名。报告不包含文件内容和凭据。",
        },
    "Read available local revisions and report their Chunk references. Settings are left unchanged.": {
        la: "Lege recensiones locales praesto et earum relationes ad fragmenta refer. Optiones immutatae relinquuntur.",
        zh: "读取可用的本地修订版本，并报告其块引用。设置保持不变。",
    },
    "Read normal-file Metadata and current conflicts locally and in CouchDB, then compare content for suspect groups. Choose original names or pseudonyms before starting.":
        {
            la: "Lege metadata plicarum ordinariarum et discrepantias currentes localiter et in CouchDB, deinde contenta gregum suspectorum compara. Nomina originalia vel pseudonyma elige antequam incipias.",
            zh: "在本地和 CouchDB 中读取普通文件的元数据和当前冲突，然后比较可疑组的内容。开始前请选择原始名称或化名。",
        },
    "Readable on this device; recorded size ${RECORDED}, decoded size ${ACTUAL}": {
        la: "Legibile in hoc instrumento; magnitudo notata ${RECORDED}, magnitudo decodificata ${ACTUAL}",
        zh: "可在本设备上读取；记录的大小为 ${RECORDED}，解码后的大小为 ${ACTUAL}",
    },
    "Reading revisions": {
        la: "Recensiones leguntur",
        zh: "正在读取修订版本",
    },
    "Recovery code copied.": {
        la: "Codex restitutionis exscriptus.",
        zh: "已复制恢复码。",
    },
    "Recreate chunks for current Vault files": {
        la: "Recrea fragmenta plicarum tabularii currentium",
        zh: "为笔记库中的当前文件重新创建块",
    },
    "Recreate chunks from the files currently present in this Vault. This cannot reconstruct unavailable historical or conflict content.":
        {
            la: "Recrea fragmenta ex plicis quae nunc in hoc tabulario adsunt. Hoc contenta historica vel discrepantiarum quae non iam praesto sunt reconstruere non potest.",
            zh: "根据本笔记库中当前存在的文件重新创建块。此操作无法重建已不可用的历史内容或冲突内容。",
        },
    "Recreate current chunks": {
        la: "Recrea fragmenta currentia",
        zh: "重新创建当前块",
    },
    Reduced: {
        la: "Imminutum",
        zh: "精简",
    },
    "Repair failed before the source was removed. Run inspection again before retrying.": {
        la: "Reparatio defecit antequam fons remotus est. Inspectionem iterum exsequere antequam rursus conaris.",
        zh: "修复在移除源之前失败。请再次运行检查后再重试。",
    },
    "Repair is available for this entry.": {
        la: "Reparatio huic inscriptioni praesto est.",
        zh: "此条目可以修复。",
    },
    "Repair Metadata document ID": {
        la: "Repara ID documenti metadatorum",
        zh: "修复元数据文档 ID",
    },
    "Repair Metadata ID": {
        la: "Repara ID metadatorum",
        zh: "修复元数据 ID",
    },
    "Repair stopped after creating the target. The source was retained. Run inspection again before retrying.": {
        la: "Reparatio post destinationem creatam constitit. Fons retentus est. Inspectionem iterum exsequere antequam rursus conaris.",
        zh: "修复在创建目标后停止，源已保留。请再次运行检查后再重试。",
    },
    "Repair this Metadata document ID": {
        la: "Repara hoc ID documenti metadatorum",
        zh: "修复此元数据文档 ID",
    },
    "Report copied.": {
        la: "Relatio exscripta.",
        zh: "已复制报告。",
    },
    "Report format": {
        la: "Forma relationis",
        zh: "报告格式",
    },
    "Report path pseudonym": {
        la: "Pseudonymum viae in relatione",
        zh: "报告路径化名",
    },
    "Resolve all conflicts by the newest version": {
        la: "Solve omnes discrepantias versione recentissima",
        zh: "按最新版本解决所有冲突",
    },
    "Resolve every conflict by modification time? This logically deletes every version except the newest one and cannot recover content which is already unavailable.":
        {
            la: "Visne omnes discrepantias secundum tempus mutationis solvere? Hoc logice omnes versiones praeter recentissimam delet, nec contentum quod iam non praesto est recuperare potest.",
            zh: "要按修改时间解决所有冲突吗？这会逻辑删除除最新版本以外的所有版本，并且无法恢复已不可用的内容。",
        },
    "Restart and Select Source Device": {
        la: "Denuo incipe et instrumentum fontis elige",
        zh: "重启并选择源设备",
    },
    "Restart this device, then choose the source device when P2P Rebuild opens.": {
        la: "Hoc instrumentum denuo incipe, deinde instrumentum fontis elige cum P2P Rebuild aperitur.",
        zh: "重启本设备，然后在 P2P 重建打开时选择源设备。",
    },
    Retry: {
        la: "Iterum conare",
        zh: "重试",
    },
    "Retry reading revision": {
        la: "Iterum conare recensionem legere",
        zh: "重新读取修订版本",
    },
    "Review device records for the active CouchDB or Object Storage connection.": {
        la: "Recognosce notitias instrumentorum conexionis CouchDB vel repositorii obiectorum activae.",
        zh: "查看当前 CouchDB 或对象存储连接的设备记录。",
    },
    "Review devices": {
        la: "Recognosce instrumenta",
        zh: "查看设备",
    },
    "Reviewing and aligning Self-hosted LiveSync versions across devices is recommended.": {
        la: "Versiones Tabularii per instrumenta recognoscere et congruentes reddere commendatur.",
        zh: "建议检查并统一各设备上的 Tabularium 版本。",
    },
    "Revision metadata is unavailable on this device": {
        la: "Metadata recensionis in hoc instrumento non praesto sunt",
        zh: "本设备上没有修订版本的元数据",
    },
    "Rotation Duration": {
        la: "Spatium rotationis",
        zh: "轮换时长",
    },
    "Save report": {
        la: "Serva relationem",
        zh: "保存报告",
    },
    "Saved connections": {
        la: "Conexiones servatae",
        zh: "已保存的连接",
    },
    "Scan Vault files and local-database Metadata for conflicts, missing chunks, identity mismatches, and differences. Each result provides actions for one exact entry or revision.":
        {
            la: "Perscrutare plicas tabularii et metadata repositorii localis ad discrepantias, fragmenta deficientia, identitates non congruentes et differentias inveniendas. Quisque eventus actiones pro una certa inscriptione vel recensione praebet.",
            zh: "扫描笔记库文件和本地数据库元数据，查找冲突、缺失的块、标识不匹配和差异。每个结果都针对某个确切的条目或修订版本提供操作。",
        },
    "Search cancelled. Matches found so far are shown.": {
        la: "Quaestio abrogata. Congruentia hactenus inventa monstrantur.",
        zh: "搜索已取消。显示目前已找到的匹配项。",
    },
    "Search current Vault paths and current local Metadata only. Older history and remote-only files are not searched.":
        {
            la: "Quaere solum in viis tabularii currentibus et metadatis localibus currentibus. Historia vetustior et plicae solum remotae non quaeruntur.",
            zh: "只搜索当前笔记库路径和当前本地元数据。不会搜索较早的历史记录和仅存在于远程的文件。",
        },
    "Set an ID key": {
        la: "Constitue clavem ID",
        zh: "设置 ID 密钥",
    },
    "SettingService.ConfigurationCouldNotBeDecrypted": {
        la: "Configuratio exstans decryptari non potuit. Clavis configurationis mutata non est.",
        zh: "无法解密现有配置。配置密钥未更改。",
    },
    "SettingService.ConfigurationEncryptionSaveFailed": {
        la: "Cryptatio configurationis servari non potuit. Optiones servatas et clavem instrumenti verifica antequam rursus conaris.",
        zh: "无法保存配置加密。请检查已保存的设置和设备密钥后再重试。",
    },
    "SettingService.ConfigurationPassphraseCancelled": {
        la: "Insertio tesserae arcanae configurationis abrogata est vel non praesto fuit. Initium sistitur; optiones servatae retentae sunt.",
        zh: "配置口令输入已取消或不可用。启动已停止，已保存的设置予以保留。",
    },
    "SettingService.ConfigurationPassphraseDeviceLocalDescription": {
        la: "Haec tessera arcana in hoc instrumento manet. Cum aliud instrumentum optiones protectas sine clave servata decryptare debet, eandem tesseram arcanam in initio insere.",
        zh: "此口令只保存在本设备上。当另一台设备需要在没有已保存密钥的情况下解密受保护的设置时，请在启动时输入相同的口令。",
    },
    "SettingService.ConfigurationPassphraseRetryTitle": {
        la: "Configuratio decryptari non potuit. Tesseram arcanam configurationis iterum insere.",
        zh: "无法解密配置。请重新输入配置口令。",
    },
    "SettingService.ConfigurationPassphraseRollbackFailed": {
        la: "Tessera arcana configurationis post scriptionem defectam restitui non potuit. Optiones servatas et clavem instrumenti verifica antequam rursus conaris.",
        zh: "写入失败后无法恢复配置口令。请检查已保存的设置和设备密钥后再重试。",
    },
    "SettingService.ConfigurationPassphraseTitle": {
        la: "Tessera arcana configurationis",
        zh: "配置口令",
    },
    "Setup Complete: Preparing to Fetch from Another Device": {
        la: "Constitutio perfecta: arcessitio ex alio instrumento paratur",
        zh: "设置完成：准备从另一台设备获取",
    },
    "Shared ancestor ${REVISION} is not readable on this device. Automatic three-way merging may be unavailable, but the live revisions remain available for explicit review.":
        {
            la: "Antecessor communis ${REVISION} in hoc instrumento legi non potest. Conflatio automatica trium viarum fortasse non praesto erit, sed recensiones vivae ad recognitionem expressam praesto manent.",
            zh: "共同祖先 ${REVISION} 在本设备上无法读取。自动三方合并可能不可用，但活动修订版本仍可供明确审查。",
        },
    "Show current recovery code": {
        la: "Monstra codicem restitutionis currentem",
        zh: "显示当前恢复码",
    },
    "Show revision history": {
        la: "Monstra historiam recensionum",
        zh: "显示修订历史",
    },
    "Signalling relay URLs": {
        la: "URL nuntiorum signorum",
        zh: "信令中继 URL",
    },
    "Signalling Relays": {
        la: "Nuntii signorum (relays)",
        zh: "信令中继",
    },
    "Skips checking and applying synchronisation settings from the remote.": {
        la: "Praetermittit inspectionem et applicationem optionum synchronizationis ex remoto.",
        zh: "跳过检查和应用远程的同步设置。",
    },
    "Smaller messages can improve compatibility on paths which fragment or drop larger WebRTC messages. This setting limits outgoing P2P messages, so use a compatible profile on each sending device when required.":
        {
            la: "Nuntii minores compatibilitatem augere possunt in itineribus quae nuntios WebRTC maiores frangunt vel abiciunt. Haec optio nuntios P2P exeuntes limitat; ergo, ubi opus est, rationem compatibilem in quoque instrumento mittente adhibe.",
            zh: "如果网络路径会分片或丢弃较大的 WebRTC 消息，使用较小的消息可以提高兼容性。此设置限制发出的 P2P 消息，因此必要时请在每台发送设备上使用兼容的配置档。",
        },
    Source: {
        la: "Fons",
        zh: "来源",
    },
    "Source revision: ${REVISION}": {
        la: "Recensio fontis: ${REVISION}",
        zh: "源修订版本：${REVISION}",
    },
    Standard: {
        la: "Ordinarium",
        zh: "标准",
    },
    "Start announcing changes": {
        la: "Incipe mutationes nuntiare",
        zh: "开始广播变更",
    },
    "Stop announcing changes": {
        la: "Desine mutationes nuntiare",
        zh: "停止广播变更",
    },
    "Stop following changes from this device": {
        la: "Desine mutationes ab hoc instrumento sequi",
        zh: "停止跟随此设备的变更",
    },
    "Store Vault file as a child of this revision": {
        la: "Serva plicam tabularii ut filiam huius recensionis",
        zh: "将笔记库文件存储为此修订版本的子版本",
    },
    "Store Vault file as a new local database document": {
        la: "Serva plicam tabularii ut novum documentum repositorii localis",
        zh: "将笔记库文件存储为新的本地数据库文档",
    },
    "Stored document ID: ${ID}": {
        la: "ID documenti servati: ${ID}",
        zh: "已存储的文档 ID：${ID}",
    },
    "Subject (whoami)": {
        la: "Subiectum (whoami)",
        zh: "主体（whoami）",
    },
    "Sync now": {
        la: "Synchroniza nunc",
        zh: "立即同步",
    },
    "Synchronisation between different plug-in versions is generally safe unless the connection is explicitly blocked. However, it may be less efficient or use more storage, and P2P synchronisation may be unavailable.":
        {
            la: "Synchronizatio inter diversas versiones additamenti plerumque tuta est, nisi conexio expresse impeditur. Fortasse tamen minus efficax erit vel plus spatii adhibebit, et synchronizatio P2P fortasse non praesto erit.",
            zh: "除非连接被明确阻止，不同插件版本之间同步通常是安全的。但效率可能较低或占用更多存储空间，并且可能无法使用 P2P 同步。",
        },
    "Synchronise when this device connects": {
        la: "Synchroniza cum hoc instrumentum conectitur",
        zh: "此设备连接时同步",
    },
    "The algorithm used for JWT authentication.": {
        la: "Algorithmus ad authenticationem JWT adhibitus.",
        zh: "JWT 认证使用的算法。",
    },
    "The API token is saved with this profile and included in Setup URI and QR code sharing. Temporary TURN credentials are kept in memory only.":
        {
            la: "Tessera API cum hac forma servatur et in communicatione Setup URI et codicis QR includitur. Testimonia TURN temporaria in memoria tantum servantur.",
            zh: "API 令牌随此配置档保存，并会包含在 Setup URI 和二维码分享中。临时 TURN 凭据只保存在内存中。",
        },
    "The Application ID for P2P connection. This should be same among your devices. Default is 'self-hosted-livesync' and could not be modified from the UI.":
        {
            la: "Identificatio applicationis ad conexionem P2P. Haec in omnibus instrumentis tuis eadem esse debet. Praedefinitum est 'self-hosted-livesync' neque per interfaciem mutari potest.",
            zh: "P2P 连接使用的应用 ID。各设备上应保持一致。默认值为「self-hosted-livesync」，无法在界面中修改。",
        },
    "The credential/password for the TURN servers.": {
        la: "Testimonium/tessera ministratorum TURN.",
        zh: "TURN 服务器的凭据或密码。",
    },
    "The device information could not be loaded. Close this dialogue and open Joined devices again if the remote configuration has changed.":
        {
            la: "Notitia instrumenti onerari non potuit. Hunc dialogum claude et “Instrumenta adiuncta” iterum aperi, si configuratio remota mutata est.",
            zh: "无法加载设备信息。如果远程配置已更改，请关闭此对话框，然后重新打开「已加入的设备」。",
        },
    "The device list changed while you were trying to forget this device. Refresh the list before trying again.": {
        la: "Index instrumentorum mutatus est dum hoc instrumentum oblivisci conabaris. Indicem renova antequam iterum conaris.",
        zh: "在你尝试忘记此设备期间，设备列表发生了变化。请刷新列表后再重试。",
    },
    "The device record was already absent.": {
        la: "Tabula instrumenti iam aberat.",
        zh: "设备记录已不存在。",
    },
    "The device record was forgotten.": {
        la: "Tabula instrumenti oblita est.",
        zh: "已忘记该设备记录。",
    },
    "The displayed recovery code belongs to the current key. Reopen this dialogue after saving to copy the replacement key.":
        {
            la: "Codex recuperationis ostensus ad clavem praesentem pertinet. Post servationem hunc dialogum iterum aperi ut clavem novam exscribas.",
            zh: "显示的恢复码属于当前密钥。保存后请重新打开此对话框，以复制替换后的密钥。",
        },
    "The file could not be opened.": {
        la: "Plica aperiri non potuit.",
        zh: "无法打开该文件。",
    },
    "The follow-up report could not be prepared.": {
        la: "Relatio subsequens parari non potuit.",
        zh: "无法准备后续报告。",
    },
    "The ID key is derived from the current E2EE passphrase and saved separately. Changing that passphrase later does not change the saved ID key. To reduce the risk of guessing that passphrase from known IDs, use a separate, unpredictable ID source instead.":
        {
            la: "Clavis identificationum ex tessera arcana E2EE praesenti derivatur et seorsum servatur. Si postea illam tesseram arcanam mutaveris, clavis servata non mutabitur. Ut periculum minuatur ne illa tessera arcana ex identificationibus notis divinetur, potius fontem identificationum separatum et incertum adhibe.",
            zh: "ID 密钥由当前的 E2EE 密码短语派生并单独保存。之后更改该密码短语不会改变已保存的 ID 密钥。为降低通过已知 ID 猜出该密码短语的风险，请改用一个独立且无法预测的 ID 来源。",
        },
    "The ID source or recovery code is invalid. Check it and try again.": {
        la: "Fons identificationum aut codex recuperationis invalidus est. Inspice et iterum conare.",
        zh: "ID 来源或恢复码无效。请检查后重试。",
    },
    "The inspected state changed. No repair was performed; run inspection again.": {
        la: "Status inspectus mutatus est. Nulla reparatio facta est; inspectionem iterum exsequere.",
        zh: "被检查的状态已发生变化。未执行修复，请重新运行检查。",
    },
    "The inspection could not finish. Close this dialogue and try again after database startup.": {
        la: "Inspectio perfici non potuit. Hunc dialogum claude et post initium repositorii datorum iterum conare.",
        zh: "检查无法完成。请关闭此对话框，在数据库启动后重试。",
    },
    "The key (PSK in HSxxx in base64, or private key in ESxxx in PEM) used for JWT authentication.": {
        la: "Clavis (PSK in HSxxx forma base64, aut clavis privata in ESxxx forma PEM) ad authenticationem JWT adhibita.",
        zh: "JWT 认证使用的密钥（HSxxx 使用 base64 格式的 PSK，ESxxx 使用 PEM 格式的私钥）。",
    },
    "The key ID. this should be matched with CouchDB->jwt_keys->ALG:_`kid`.": {
        la: "Identificatio clavis. Haec cum CouchDB->jwt_keys->ALG:_`kid` congruere debet.",
        zh: "密钥 ID。应与 CouchDB->jwt_keys->ALG:_`kid` 一致。",
    },
    "The local search could not finish.": {
        la: "Quaestio localis perfici non potuit.",
        zh: "本地搜索无法完成。",
    },
    "The lookup does not read file contents or contact a remote database. Follow-up reports include current conflicts and merge bases.":
        {
            la: "Haec inquisitio contenta plicarum non legit neque repositorium remotum adit. Relationes subsequentes discrepantias praesentes et bases conflationis includunt.",
            zh: "查找不会读取文件内容，也不会连接远程数据库。后续报告包含当前冲突和合并基准。",
        },
    "The Nostr relay servers to establish connections for P2P connections. Multiple servers can be separated by commas.":
        {
            la: "Ministratores Nostr relay quibus conexiones P2P constituuntur. Plures ministratores commatibus separari possunt.",
            zh: "用于建立 P2P 连接的 Nostr 中继服务器。多个服务器用逗号分隔。",
        },
    "The P2P connection has been configured successfully. The initial synchronisation data must now be fetched from an online source device.":
        {
            la: "Conexio P2P feliciter constituta est. Data synchronizationis initialis nunc ab instrumento fonte conexo arcessenda sunt.",
            zh: "P2P 连接已配置成功。现在必须从一台在线的源设备获取初始同步数据。",
        },
    "The Passphrase for P2P connection. This should be same among your devices.": {
        la: "Tessera arcana ad conexionem P2P. Haec in omnibus instrumentis tuis eadem esse debet.",
        zh: "P2P 连接使用的口令。各设备上应保持一致。",
    },
    "The project's public signalling relay is a best-effort convenience operated by the project author. It does not store Vault contents, but signalling metadata may be visible to the relay. Availability and log retention are not guaranteed. You can replace it with your own Nostr-compatible relay.":
        {
            la: "Relay signorum publicum huius incepti commoditas est ab auctore incepti pro facultate praebita. Contenta tabularii non servat, sed metadata signorum relay visibilia esse possunt. Neque praesto esse neque acta servandi ratio praestatur. Id cum relay tuo Nostr congruenti substituere potes.",
            zh: "项目的公共信令中继由项目作者尽力提供，仅为方便使用。它不存储笔记库内容，但中继可能看到信令元数据。不保证可用性和日志保留策略。你可以替换为自己的兼容 Nostr 的中继。",
        },
    "The recovery code could not be copied. Select and copy the visible code instead.": {
        la: "Codex recuperationis exscribi non potuit. Codicem visibilem potius selige et exscribe.",
        zh: "无法复制恢复码。请选中显示的恢复码后手动复制。",
    },
    "The Room ID for P2P connection. This should be same among your devices.": {
        la: "Identificatio conclavis ad conexionem P2P. Haec in omnibus instrumentis tuis eadem esse debet.",
        zh: "P2P 连接使用的房间 ID。各设备上应保持一致。",
    },
    "The Rotation duration of token in minutes. Each generated tokens will be valid only within this duration.": {
        la: "Spatium rotationis tesserae in minutis. Quaeque tessera generata intra hoc spatium tantum valebit.",
        zh: "令牌的轮换时长（分钟）。生成的每个令牌只在此时长内有效。",
    },
    "The saved ID key is configured. Its source cannot be shown again.": {
        la: "Clavis identificationum servata configurata est. Fons eius iterum ostendi non potest.",
        zh: "已配置保存的 ID 密钥。其来源无法再次显示。",
    },
    "The selected remote has no saved synchronisation settings. This is normal for a new remote. Use this device's settings, or cancel if you expected existing settings.":
        {
            la: "Remotum selectum nullas optiones synchronizationis servatas habet. Hoc in remoto novo solitum est. Optiones huius instrumenti adhibe, aut abroga si optiones exstantes exspectabas.",
            zh: "所选远程没有已保存的同步设置。对于新的远程来说这是正常的。请使用本设备的设置；如果你预期远程已有设置，请取消。",
        },
    "The selected TURN configuration is not supported.": {
        la: "Configuratio TURN selecta non sustinetur.",
        zh: "不支持所选的 TURN 配置。",
    },
    "The stored document ID and recorded path are handled by different synchronisation features.": {
        la: "Identificatio documenti servata et via notata a diversis facultatibus synchronizationis tractantur.",
        zh: "已存储的文档 ID 和记录的路径由不同的同步功能处理。",
    },
    "The stored document ID does not match the ID derived from its recorded path.": {
        la: "Identificatio documenti servata non congruit cum identificatione ex via notata derivata.",
        zh: "已存储的文档 ID 与根据其记录路径派生的 ID 不一致。",
    },
    "The subject for JWT authentication. Mostly username.": {
        la: "Subiectum ad authenticationem JWT. Plerumque nomen usoris.",
        zh: "JWT 认证的主体，通常是用户名。",
    },
    "The TURN servers to use for P2P connections. Multiple servers can be separated by commas.": {
        la: "Ministratores TURN ad conexiones P2P adhibendi. Plures ministratores commatibus separari possunt.",
        zh: "P2P 连接使用的 TURN 服务器。多个服务器用逗号分隔。",
    },
    "The username for the TURN servers.": {
        la: "Nomen usoris ministratorum TURN.",
        zh: "TURN 服务器的用户名。",
    },
    "This device has been locked out. Use the existing recovery process to join again.": {
        la: "Hoc instrumentum exclusum est. Processum recuperationis exstantem adhibe ut iterum adiungaris.",
        zh: "此设备已被锁定。请使用现有的恢复流程重新加入。",
    },
    "This file has ${COUNT} unresolved versions. They will be reviewed one pair at a time.": {
        la: "Haec plica ${COUNT} versiones non solutas habet. Singula paria deinceps recensebuntur.",
        zh: "此文件有 ${COUNT} 个未解决的版本，将逐对进行审查。",
    },
    "This file has unresolved conflicts.": {
        la: "Haec plica discrepantias non solutas habet.",
        zh: "此文件有未解决的冲突。",
    },
    "This list shows device information recorded by the remote. It does not show whether a device is online now.": {
        la: "Hic index notitiam instrumentorum a remoto notatam ostendit. Non ostendit num instrumentum nunc conexum sit.",
        zh: "此列表显示远程记录的设备信息，不表示设备当前是否在线。",
    },
    "This moves one local Metadata entry to the ID derived from its recorded path.\n\n**File:** `${FILE}`  \n**Source:** `${SOURCE}@${REVISION}`  \n**Target:** `${TARGET}`\n\nThe target is verified before the source is removed. Its CouchDB revision ancestry cannot be preserved.\n\n> [!warning] Before repairing\n> - Back up this device.\n> - If file-name case or path obfuscation was intentionally changed for the whole database, use Rebuild instead.\n> - If other devices share this database, pause them, allow this device to upload the repair, then resume them one at a time.":
        {
            la: "Hoc unam inscriptionem Metadata localem ad identificationem ex via notata derivatam movet.\n\n**Plica:** `${FILE}`  \n**Fons:** `${SOURCE}@${REVISION}`  \n**Destinatio:** `${TARGET}`\n\nDestinatio verificatur antequam fons removeatur. Stirps recensionum CouchDB eius servari non potest.\n\n> [!warning] Ante reparationem\n> - Hoc instrumentum tuto exscribe.\n> - Si litterarum magnitudo in nominibus plicarum aut obfuscatio viarum consulto pro toto repositorio mutata est, potius “Reaedifica” adhibe.\n> - Si alia instrumenta hoc repositorium communicant, ea suspende, sine hoc instrumentum reparationem sursum mittere, deinde ea singillatim resume.",
            zh: "此操作会将一条本地元数据条目移动到根据其记录路径派生的 ID。\n\n**文件：** `${FILE}`  \n**源：** `${SOURCE}@${REVISION}`  \n**目标：** `${TARGET}`\n\n在移除源之前会先验证目标。其 CouchDB 修订版本的祖先关系无法保留。\n\n> [!warning] 修复之前\n> - 备份此设备。\n> - 如果是有意为整个数据库更改了文件名大小写或路径混淆，请改用重建。\n> - 如果其他设备共享此数据库，请先暂停它们，等本设备上传修复后，再逐台恢复。",
        },
    "This remote does not currently have a record of joined devices.": {
        la: "Hoc remotum nunc nullam tabulam instrumentorum adiunctorum habet.",
        zh: "此远程目前没有已加入设备的记录。",
    },
    "This remote does not support conditional updates, so the device record could not be removed.": {
        la: "Hoc remotum renovationes condicionales non sustinet, itaque tabula instrumenti removeri non potuit.",
        zh: "此远程不支持条件更新，因此无法移除设备记录。",
    },
    "This remote has been cleaned. Use the existing recovery process to join devices again as needed.": {
        la: "Hoc remotum purgatum est. Processum recuperationis exstantem adhibe ut instrumenta, prout opus est, iterum adiungas.",
        zh: "此远程已被清理。如有需要，请使用现有的恢复流程重新加入设备。",
    },
    "This remote is locked. If the device returns, use the existing recovery process to join it again.": {
        la: "Hoc remotum obseratum est. Si instrumentum redit, processum recuperationis exstantem adhibe ut id iterum adiungas.",
        zh: "此远程已锁定。如果设备回来，请使用现有的恢复流程让它重新加入。",
    },
    "This remote is locked. Use the existing recovery process for devices that need to join again.": {
        la: "Hoc remotum obseratum est. Processum recuperationis exstantem adhibe pro instrumentis quae iterum adiungenda sunt.",
        zh: "此远程已锁定。需要重新加入的设备请使用现有的恢复流程。",
    },
    "This remote is unlocked. A device that returns can register again.": {
        la: "Hoc remotum reseratum est. Instrumentum quod redit iterum se inscribere potest.",
        zh: "此远程已解锁。回来的设备可以重新注册。",
    },
    "This removes only this device's record from the remote.": {
        la: "Hoc solam tabulam huius instrumenti ex remoto removet.",
        zh: "此操作只会从远程移除本设备的记录。",
    },
    "This report contains original paths and identifiers. Review them before sharing.": {
        la: "Haec relatio vias et identificationes originales continet. Eas inspice antequam communices.",
        zh: "此报告包含原始路径和标识符。分享前请仔细检查。",
    },
    "This report uses pseudonyms. Review its coverage before sharing.": {
        la: "Haec relatio pseudonymis utitur. Ambitum eius inspice antequam communices.",
        zh: "此报告使用化名。分享前请检查其覆盖范围。",
    },
    "This report uses temporary pseudonyms. Counts and relationships remain visible.": {
        la: "Haec relatio pseudonymis temporariis utitur. Numeri et relationes visibiles manent.",
        zh: "此报告使用临时化名。数量和关联关系仍然可见。",
    },
    "This uses a saved key for new Chunk IDs and obfuscated Metadata document IDs, so changing the E2EE passphrase does not derive a new key automatically.":
        {
            la: "Hoc clavem servatam ad novas identificationes fragmentorum et ad identificationes documentorum Metadata obfuscatas adhibet, itaque mutatio tesserae arcanae E2EE clavem novam sponte non derivat.",
            zh: "新的块 ID 和混淆后的元数据文档 ID 使用已保存的密钥，因此更改 E2EE 密码短语不会自动派生新密钥。",
        },
    "Timestamp comparison unavailable": {
        la: "Comparatio temporum notatorum non praesto est",
        zh: "无法比较时间戳",
    },
    "TURN configuration": {
        la: "Configuratio TURN",
        zh: "TURN 配置",
    },
    "TURN Key API Token": {
        la: "Signum API clavis TURN",
        zh: "TURN Key API 令牌",
    },
    "TURN Key API Token must use Bearer token syntax.": {
        la: "Signum API clavis TURN syntaxi signi Bearer uti debet.",
        zh: "TURN Key API 令牌必须使用 Bearer 令牌格式。",
    },
    "TURN Key ID": {
        la: "ID clavis TURN",
        zh: "TURN Key ID",
    },
    "TURN Key ID contains unsupported characters.": {
        la: "ID clavis TURN characteres non sustentos continet.",
        zh: "TURN Key ID 包含不支持的字符。",
    },
    "TURN relay only": {
        la: "Solum per nuntium TURN",
        zh: "仅使用 TURN 中继",
    },
    "TURN relay only is available when at least one valid TURN server URL is configured under Advanced Settings.": {
        la: "“Solum per nuntium TURN” praesto est cum saltem unum URL ministratoris TURN validum sub optionibus provectis constitutum est.",
        zh: "需要在「高级设置」中至少配置一个有效的 TURN 服务器 URL，才能使用「仅使用 TURN 中继」。",
    },
    "TURN relay only requires a TURN server or a configured credential source under Advanced Settings.": {
        la: "“Solum per nuntium TURN” ministratorem TURN vel fontem credentialium constitutum sub optionibus provectis requirit.",
        zh: "「仅使用 TURN 中继」需要在「高级设置」中配置 TURN 服务器或凭据来源。",
    },
    "TURN relay only requires at least one valid TURN server URL. Connection path has been restored to Automatic.": {
        la: "“Solum per nuntium TURN” saltem unum URL ministratoris TURN validum requirit. Iter conexionis ad modum automaticum restitutum est.",
        zh: "「仅使用 TURN 中继」需要至少一个有效的 TURN 服务器 URL。连接路径已恢复为「自动」。",
    },
    "TURN relay only requires TURN configuration. Connection path has been restored to Automatic.": {
        la: "“Solum per nuntium TURN” configurationem TURN requirit. Iter conexionis ad modum automaticum restitutum est.",
        zh: "「仅使用 TURN 中继」需要 TURN 配置。连接路径已恢复为「自动」。",
    },
    "TURN Servers": {
        la: "Ministratores TURN",
        zh: "TURN 服务器",
    },
    "Unknown platform": {
        la: "Suggestus ignotus",
        zh: "未知平台",
    },
    "Unknown revision": {
        la: "Recensio ignota",
        zh: "未知修订版本",
    },
    "Unsupported TURN configuration": {
        la: "Configuratio TURN non sustenta",
        zh: "不支持的 TURN 配置",
    },
    "Use JWT instead of Basic Authentication": {
        la: "Adhibe JWT pro authenticatione Basic",
        zh: "使用 JWT 代替 Basic 认证",
    },
    "Use Only Local Chunks": {
        la: "Adhibe sola fragmenta localia",
        zh: "仅使用本地块",
    },
    "Use Request API to avoid `inevitable` CORS problem": {
        la: "Adhibe Request API ut difficultatem CORS `inevitable` vites",
        zh: "使用 Request API 规避`无法避免的`CORS 问题",
    },
    "Use the project's public signalling relay": {
        la: "Adhibe relay signorum publicum huius incepti",
        zh: "使用项目的公共信令中继",
    },
    "Use this device's settings": {
        la: "Adhibe optiones huius instrumenti",
        zh: "使用本设备的设置",
    },
    Vault: {
        la: "Tabularium",
        zh: "笔记库",
    },
    "Vault and database revision": {
        la: "Tabularium et recensio repositorii",
        zh: "笔记库与数据库修订版本",
    },
    "Vault file": {
        la: "Plica tabularii",
        zh: "笔记库文件",
    },
    "Vault file is newer": {
        la: "Plica tabularii recentior est",
        zh: "笔记库文件较新",
    },
    "Vault matches winner": {
        la: "Tabularium cum victrice congruit",
        zh: "笔记库与胜出版本一致",
    },
    "Vault: ${SIZE} B · ${TIME}": {
        la: "Tabularium: ${SIZE} B · ${TIME}",
        zh: "笔记库：${SIZE} B · ${TIME}",
    },
    "Vault: ${VAULT} B · Δsize vs DB ${DIFFERENCE} B": {
        la: "Tabularium: ${VAULT} B · Δmagnitudo contra repositorium ${DIFFERENCE} B",
        zh: "笔记库：${VAULT} B · 与数据库的 Δ大小 ${DIFFERENCE} B",
    },
    "Vault: missing": {
        la: "Tabularium: deest",
        zh: "笔记库：缺失",
    },
    "WebRTC encrypts data between your devices, including when it passes through TURN. The TURN provider cannot read the transferred data. It can see network addresses and traffic volume.":
        {
            la: "WebRTC data inter instrumenta tua cryptat, etiam cum per TURN transeunt. Praebitor TURN data translata legere non potest. Inscriptiones retiales et copiam commeatus videre potest.",
            zh: "WebRTC 会对设备之间的数据进行加密，经过 TURN 时也是如此。TURN 服务商无法读取传输的数据，但可以看到网络地址和流量大小。",
        },
    "When enabled, this device notifies connected peers after a local change. The notification contains no Vault data; a peer which follows this device then fetches the change through the encrypted P2P connection.":
        {
            la: "Si activa est, hoc instrumentum pares conexos post mutationem localem certiores facit. Nuntius nulla data tabularii continet; par qui hoc instrumentum sequitur deinde mutationem per conexionem P2P cryptatam arcessit.",
            zh: "启用后，本设备在本地发生变更后会通知已连接的对等方。通知中不包含笔记库数据；跟随本设备的对等方随后会通过加密的 P2P 连接获取变更。",
        },
    "While enabled, it causes very performance impact but debugging replication testing and other features will be enabled. Please disable this if you have not read the source code. Requires restart of Obsidian. Sometimes there is no implementation.":
        {
            la: "Dum activa est, effectum multum minuit, sed probatio replicationis ad vitia investiganda aliaeque facultates activantur. Deactiva hanc optionem, nisi codicem fontis legisti. Obsidian iterum incipiendum est. Interdum nulla exsecutio adest.",
            zh: "启用后会严重影响性能，但会启用复制测试调试等功能。如果你没有读过源代码，请停用此项。需要重启 Obsidian。部分功能可能尚未实现。",
        },
    "Winner revision": {
        la: "Recensio victrix",
        zh: "胜出修订版本",
    },
    "Within the two-second comparison window": {
        la: "Intra spatium comparationis duorum secundorum",
        zh: "在两秒比较窗口内",
    },
    "xxhash64 is the current default.": {
        la: "xxhash64 est praedefinitum praesens.",
        zh: "xxhash64 是当前的默认值。",
    },
    "You can enable this setting to process the files with size mismatches, these files can be created by some APIs or integrations.":
        {
            la: "Hanc optionem activare potes ut plicae cum magnitudinibus discrepantibus tractentur; tales plicae ab aliquibus API vel integrationibus creari possunt.",
            zh: "启用此设置可以处理大小不一致的文件，这类文件可能由某些 API 或集成创建。",
        },
};
