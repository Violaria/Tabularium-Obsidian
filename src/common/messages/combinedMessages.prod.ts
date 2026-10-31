export const allMessages: Readonly<Record<string, Readonly<Record<string, string>>>> = {
    ", please select the option that best describes the current state of your Vault. The application will then check your files in the most appropriate way based on your selection.":
        {
            def: ", please select the option that best describes the current state of your Vault. The application will then check your files in the most appropriate way based on your selection.",
            la: ", quaeso optionem elige quae statum praesentem tabularii tui optime describit. Applicatio deinde plicas tuas modo aptissimo secundum electionem tuam inspiciet.",
            zh: "，请选择最符合你库当前状态的选项。程序会根据你的选择，用最合适的方式检查你的文件。",
        },
    "(Active)": {
        def: "(Active)",
        la: "(Activum)",
        zh: "（已启用）",
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
    "(Missing)": {
        def: "(Missing)",
        la: "(Deest)",
        zh: "（缺失）",
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
    "(re)initialise hidden files between storage and database": {
        def: "(re)initialise hidden files between storage and database",
        la: "Plicas occultas inter repositorium plicarum et repositorium (re)initia",
        zh: "（重新）初始化存储与数据库之间的隐藏文件",
    },
    "(RegExp) Empty to sync all files. Set filter as a regular expression to limit synchronising files.": {
        def: "(RegExp) Empty to sync all files. Set filter as a regular expression to limit synchronising files.",
        la: "(RegExp) Vacuum relinque ut omnes plicae synchronizentur. Filtrum ut expressionem regularem constitue ad plicas synchronizandas limitandas.",
        zh: "（正则表达式）留空表示同步所有文件。可设置正则表达式来限制需要同步的文件。",
    },
    "(RegExp) If this is set, any changes to local and remote files that match this will be skipped.": {
        def: "(RegExp) If this is set, any changes to local and remote files that match this will be skipped.",
        la: "(RegExp) Si hoc constituitur, omnes mutationes plicarum localium et remotarum quae huic congruunt praetermittentur.",
        zh: "（正则表达式）如果已设置，则所有匹配此模式的本地和远端文件变更都会被跳过。",
    },
    "(Select this if you already have another synchronising device.) This option adds this device to the same synchronisation.":
        {
            def: "(Select this if you already have another synchronising device.) This option adds this device to the same synchronisation.",
            la: "(Hoc elige si iam aliud instrumentum synchronizans habes.) Haec optio hoc instrumentum eidem synchronizationi addit.",
            zh: "（如果你已有另一台正在同步的设备，请选择此项。）此选项会把本设备加入同一个同步。",
        },
    "(Select this if you are configuring this device as the first synchronisation device.) This option is suitable if you are new to LiveSync and want to set it up from scratch.":
        {
            def: "(Select this if you are configuring this device as the first synchronisation device.) This option is suitable if you are new to Tabularium and want to set it up from scratch.",
            la: "(Hoc elige si hoc instrumentum ut primum instrumentum synchronizationis configuras.) Haec optio apta est si Tabularium novus tibi est et eum ab initio constituere vis.",
            zh: "（如果你正在将此设备配置为第一台同步设备，请选择此项。）此选项适合初次使用 Tabularium，并希望从头开始配置的用户。",
        },
    "↑: Overwrite Remote": {
        def: "↑: Overwrite Remote",
        la: "↑: Superscribe remotum",
        zh: "↑：覆盖远端",
    },
    "↓: Overwrite Local": {
        def: "↓: Overwrite Local",
        la: "↓: Superscribe locale",
        zh: "↓：覆盖本地",
    },
    "⇅: Use newer": {
        def: "⇅: Use newer",
        la: "⇅: Utere recentiore",
        zh: "⇅：使用较新版本",
    },
    "+1 week": {
        def: "+1 week",
        la: "+1 hebdomas",
        zh: "+1 周",
    },
    "> [!INFO]- The connected devices have been detected as follows:\n${devices}": {
        def: "> [!INFO]- The connected devices have been detected as follows:\n${devices}",
        la: "> [!INFO]- Instrumenta conexa sic detecta sunt:\n${devices}",
        zh: "> [!INFO]- 已检测到以下已连接设备：\n${devices}",
    },
    "${count} issue(s) detected!": {
        def: "${count} issue(s) detected!",
        la: "${count} quaestiones detectae!",
        zh: "检测到 ${count} 个问题！",
    },
    "A Setup URI is a single string of text containing your server address and authentication details. Using a URI, if one was generated by your server installation script, provides a simple and secure configuration.":
        {
            def: "A Setup URI is a single string of text containing your server address and authentication details. Using a URI, if one was generated by your server installation script, provides a simple and secure configuration.",
            la: "Setup URI est una series textus quae inscriptionem ministratoris et singula authenticationis continet. URI uti, si a scripto institutionis ministratoris tui generatum est, configurationem simplicem et tutam praebet.",
            zh: "Setup URI 是一段包含服务器地址与认证信息的文本。如果服务器安装脚本已经生成了 URI，使用它可以更简单且更安全地完成配置。",
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
    "Accept in session": {
        def: "Accept in session",
        la: "Accipe in sessione",
        zh: "本次会话内接受",
    },
    ACCEPTED: {
        def: "ACCEPTED",
        la: "ACCEPTUM",
        zh: "已接受",
    },
    "ACCEPTED (in session)": {
        def: "ACCEPTED (in session)",
        la: "ACCEPTUM (in sessione)",
        zh: "已接受（本次会话）",
    },
    "Access Key": {
        def: "Access Key",
        la: "Clavis accessus",
        zh: "访问密钥",
    },
    "Access Key ID": {
        def: "Access Key ID",
        la: "ID clavis accessus",
        zh: "访问密钥 ID",
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
    "Active Remote Configuration": {
        def: "Active Remote Configuration",
        la: "Configuratio remota activa",
        zh: "生效中的远程配置",
    },
    Add: {
        def: "Add",
        la: "Adde",
        zh: "添加",
    },
    "Add default patterns": {
        def: "Add default patterns",
        la: "Adde exemplaria praedefinita",
        zh: "添加默认模式",
    },
    "Add new connection": {
        def: "Add new connection",
        la: "Adde novam conexionem",
        zh: "新增连接",
    },
    "AddOn Module (ConfigSync) has not been loaded. This is very unexpected situation. Please report this issue.": {
        def: "AddOn Module (ConfigSync) has not been loaded. This is very unexpected situation. Please report this issue.",
        la: "Modulus additicius (ConfigSync) non est oneratus. Haec res maxime inopinata est. Quaeso hanc quaestionem nuntia.",
        zh: "附加模块（ConfigSync）未能加载。这是非常意外的情况。请报告此问题。",
    },
    "AddOn Module (HiddenFileSync) has not been loaded. This is very unexpected situation. Please report this issue.": {
        def: "AddOn Module (HiddenFileSync) has not been loaded. This is very unexpected situation. Please report this issue.",
        la: "Modulus additicius (HiddenFileSync) non est oneratus. Haec res maxime inopinata est. Quaeso hanc quaestionem nuntia.",
        zh: "附加模块（HiddenFileSync）未能加载。这是非常意外的情况。请报告此问题。",
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
    "After restarting, the data on this device will be uploaded to the server as the 'master copy'. Please be aware that any unintended data currently on the server will be completely overwritten.":
        {
            def: "After restarting, the data on this device will be uploaded to the server as the 'master copy'. Please be aware that any unintended data currently on the server will be completely overwritten.",
            la: "Post iteratum initium, data in hoc instrumento ad ministratorem ut “exemplar principale” sursum mittentur. Scito omnia data non intenta quae nunc in ministratore sunt omnino superscriptum iri.",
            zh: "重启后，本设备上的数据将作为「主副本」上传到服务器。请注意，服务器上现有的任何非预期数据都会被完全覆盖。",
        },
    "After restarting, the database on this device will be rebuilt using data from the server. If there are any unsynchronised files in this vault, conflicts may occur with the server data.":
        {
            def: "After restarting, the database on this device will be rebuilt using data from the server. If there are any unsynchronised files in this vault, conflicts may occur with the server data.",
            la: "Post iteratum initium, repositorium in hoc instrumento ex datis ministratoris reaedificabitur. Si quae plicae non synchronizatae in hoc tabulario sunt, discrepantiae cum datis ministratoris oriri possunt.",
            zh: "重启后，将用服务器上的数据重建本设备的数据库。如果本库中有未同步的文件，可能会与服务器数据产生冲突。",
        },
    "After that, synchronise to a brand new vault on each other device with the new remote one by one.": {
        def: "After that, synchronise to a brand new vault on each other device with the new remote one by one.",
        la: "Deinde, in quoque alio instrumento singillatim cum novo remoto in tabularium omnino novum synchroniza.",
        zh: "之后，在其他设备上逐个用新的远端同步到一个全新的库。",
    },
    "All checks passed successfully!": {
        def: "All checks passed successfully!",
        la: "Omnes probationes feliciter transiectae sunt!",
        zh: "所有检查均已通过！",
    },
    "All devices have the same progress value (${progress}). Your devices seem to be synchronised. And be able to proceed with Garbage Collection.":
        {
            def: "All devices have the same progress value (${progress}). Your devices seem to be synchronised. And be able to proceed with Garbage Collection.",
            la: "Omnia instrumenta eundem valorem progressus habent (${progress}). Instrumenta tua synchronizata esse videntur et ad collectionem quisquiliarum procedere possunt.",
            zh: "所有设备的进度值均相同（${progress}）。看起来你的设备已经同步，可以继续执行垃圾回收。",
        },
    "All the same or non-existent": {
        def: "All the same or non-existent",
        la: "Omnia eadem vel non exstantia",
        zh: "全部相同或不存在",
    },
    "Allow in session": {
        def: "Allow in session",
        la: "Permitte in sessione",
        zh: "本次会话内允许",
    },
    "Allow permanently": {
        def: "Allow permanently",
        la: "Permitte in perpetuum",
        zh: "永久允许",
    },
    "Also, please note that if you are using Peer-to-Peer synchronization, this configuration will be used when you switch to other methods and connect to a remote server in the future.":
        {
            def: "Also, please note that if you are using Peer-to-Peer synchronization, this configuration will be used when you switch to other methods and connect to a remote server in the future.",
            la: "Nota quoque, si synchronizatione inter pares (Peer-to-Peer) uteris, hanc configurationem adhibitum iri cum ad alias methodos transibis et posthac ad ministratorem remotum conectes.",
            zh: "另外请注意，如果你正在使用点对点同步，当你日后切换到其他方式并连接远端服务器时，将使用此配置。",
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
    "Analyse database usage and generate a TSV report for diagnosis yourself. You can paste the generated report with any spreadsheet you like.":
        {
            def: "Analyse database usage and generate a TSV report for diagnosis yourself. You can paste the generated report with any spreadsheet you like.",
            la: "Analysa usum repositorii et relationem TSV ad diagnosim ipse faciendam genera. Relationem generatam in quamlibet tabulam computatoriam inserere potes.",
            zh: "分析数据库使用情况并生成 TSV 报告以供您自行诊断。您可以将生成的报告粘贴到您喜欢的任何电子表格中。",
        },
    Apply: {
        def: "Apply",
        la: "Applica",
        zh: "应用",
    },
    "Apply All Selected": {
        def: "Apply All Selected",
        la: "Applica omnia electa",
        zh: "应用所有已选项",
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
    "Apply the settings": {
        def: "Apply the settings",
        la: "Applica optiones",
        zh: "应用设置",
    },
    "Ask a passphrase at every launch": {
        def: "Ask a passphrase at every launch",
        la: "Tesseram arcanam in quoque initio roga",
        zh: "每次启动时询问密码短语",
    },
    "Auto Accepting": {
        def: "Auto Accepting",
        la: "Accipiens automatice",
        zh: "自动接受",
    },
    "Auto Connect": {
        def: "Auto Connect",
        la: "Conexio automatica",
        zh: "自动连接",
    },
    "Auto Start P2P Connection": {
        def: "Auto Start P2P Connection",
        la: "Conexionem P2P automatice incipe",
        zh: "自动启动 P2P 连接",
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
    "Available Peers": {
        def: "Available Peers",
        la: "Pares praesto",
        zh: "可用的对等方",
    },
    Back: {
        def: "Back",
        la: "Retro",
        zh: "返回",
    },
    "Back to non-configured": {
        def: "Back to non-configured",
        la: "Retro ad statum non configuratum",
        zh: "恢复为未配置状态",
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
    "Broadcasting?": {
        def: "Broadcasting?",
        la: "Divulgaturne?",
        zh: "正在广播？",
    },
    "Bucket Name": {
        def: "Bucket Name",
        la: "Nomen situlae",
        zh: "存储桶名称",
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
    "Cancel Garbage Collection": {
        def: "Cancel Garbage Collection",
        la: "Abroga collectionem quisquiliarum",
        zh: "取消垃圾回收",
    },
    "Changing the encryption algorithm will prevent access to any data previously encrypted with a different algorithm. Ensure that all your devices are configured to use the same algorithm to maintain access to your data.":
        {
            def: "Changing the encryption algorithm will prevent access to any data previously encrypted with a different algorithm. Ensure that all your devices are configured to use the same algorithm to maintain access to your data.",
            la: "Mutatio algorithmi cryptationis accessum ad omnia data antea alio algorithmo cryptata impediet. Cura ut omnia instrumenta tua eodem algorithmo uti configurentur, ut accessum ad data tua serves.",
            zh: "更改加密算法将导致无法访问此前用其他算法加密的数据。请确保所有设备都配置为使用相同算法，以保持对数据的访问。",
        },
    "Changing this setting requires migrating existing data (a bit time may be taken) and restarting Obsidian. Please make sure to back up your data before proceeding.":
        {
            def: "Changing this setting requires migrating existing data (a bit time may be taken) and restarting Obsidian. Please make sure to back up your data before proceeding.",
            la: "Mutatio huius optionis migrationem datorum exstantium (quod aliquantum temporis sumere potest) et iteratum initium Obsidian requirit. Quaeso cura ut exemplar tutelare datorum tuorum facias antequam pergas.",
            zh: "更改此设置需要迁移现有数据（可能需要一些时间）并重启 Obsidian。请务必在继续之前备份数据。",
        },
    Check: {
        def: "Check",
        la: "Inspice",
        zh: "立即检查",
    },
    "Check and convert non-path-obfuscated files": {
        def: "Check and convert non-path-obfuscated files",
        la: "Inspice et converte plicas viis non obscuratis",
        zh: "检查并转换未进行路径混淆的文件",
    },
    "Check for documents that have not been converted to path-obfuscated IDs and convert them if necessary.": {
        def: "Check for documents that have not been converted to path-obfuscated IDs and convert them if necessary.",
        la: "Inspice documenta quae in identificatores viis obscuratis non conversa sunt, et ea si opus est converte.",
        zh: "检查尚未转换为路径混淆 ID 的文档，并在需要时将其转换。",
    },
    "Check server requirements": {
        def: "Check server requirements",
        la: "Inspice requisita ministratoris",
        zh: "检查服务器要求",
    },
    "Checking connection... Please wait.": {
        def: "Checking connection... Please wait.",
        la: "Conexio inspicitur... Quaeso exspecta.",
        zh: "正在检查连接…请稍候。",
    },
    Chunks: {
        def: "Chunks",
        la: "Fragmenta",
        zh: "块",
    },
    Close: {
        def: "Close",
        la: "Claude",
        zh: "关闭",
    },
    "Close & Disconnect": {
        def: "Close & Disconnect",
        la: "Claude et disiunge",
        zh: "关闭并断开连接",
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
    "cmdConfigSync.showCustomizationSync": {
        def: "Show Customization sync",
        la: "Monstra synchronizationem optionum propriarum",
        zh: "显示自定义同步",
    },
    "cmdHiddenFileSync.applyingUntrackedChanges": {
        def: "Applying untracked changes...",
        la: "Mutationes non vestigatae applicantur...",
        zh: "正在应用未跟踪的变更...",
    },
    "cmdHiddenFileSync.checkingProgress": {
        def: "Checking ${progress}/${total}",
        la: "Inspicitur ${progress}/${total}",
        zh: "正在检查 ${progress}/${total}",
    },
    "cmdHiddenFileSync.checkingRemainingDatabaseFirst": {
        def: "Checking for remaining database and storage changes...",
        la: "Mutationes reliquae repositorii datorum et repositorii plicarum inspiciuntur...",
        zh: "正在检查剩余的数据库和存储变更...",
    },
    "cmdHiddenFileSync.checkingRemainingStorageFirst": {
        def: "Checking for remaining storage and database changes...",
        la: "Mutationes reliquae repositorii plicarum et repositorii datorum inspiciuntur...",
        zh: "正在检查剩余的存储和数据库变更...",
    },
    "cmdHiddenFileSync.databaseToStorageCount": {
        def: "Database to Storage: ${count} files.",
        la: "Repositorium -> Repositorium plicarum: ${count} plicae.",
        zh: "数据库到存储：${count} 个文件。",
    },
    "cmdHiddenFileSync.enumeratingDatabaseFiles": {
        def: "Enumerating database files...",
        la: "Plicae repositorii enumerantur...",
        zh: "正在枚举数据库文件...",
    },
    "cmdHiddenFileSync.enumeratingLocalFiles": {
        def: "Enumerating local files...",
        la: "Plicae locales enumerantur...",
        zh: "正在枚举本地文件...",
    },
    "cmdHiddenFileSync.failedStorageChange": {
        def: "Failed to process storage change file:${file}",
        la: "Tractatio plicae mutatae in repositorio plicarum defecit:${file}",
        zh: "处理存储变更文件失败：${file}",
    },
    "cmdHiddenFileSync.initialising": {
        def: "Initialising hidden files sync...",
        la: "Synchronizatio plicarum occultarum initiatur...",
        zh: "正在初始化隐藏文件同步...",
    },
    "cmdHiddenFileSync.mergeSummary": {
        def: "Storage to Database: ${toDatabase} files\n Database to Storage: ${toStorage} files",
        la: "Repositorium plicarum -> Repositorium: ${toDatabase} plicae\n Repositorium -> Repositorium plicarum: ${toStorage} plicae",
        zh: "存储到数据库：${toDatabase} 个文件\n 数据库到存储：${toStorage} 个文件",
    },
    "cmdHiddenFileSync.preparing": {
        def: "Preparing Hidden File Sync...",
        la: "Synchronizatio plicarum occultarum paratur...",
        zh: "正在准备隐藏文件同步...",
    },
    "cmdHiddenFileSync.progressApplyUntracked": {
        def: "[Apply untracked changes ]",
        la: "[Applica mutationes non vestigatas ]",
        zh: "[应用未跟踪的变更 ]",
    },
    "cmdHiddenFileSync.progressDBToStorage": {
        def: "[DB -> Storage ]",
        la: "[Repositorium -> Repositorium plicarum ]",
        zh: "[数据库 -> 存储 ]",
    },
    "cmdHiddenFileSync.progressInitialise": {
        def: "[Initialise]",
        la: "[Initia]",
        zh: "[初始化]",
    },
    "cmdHiddenFileSync.progressRebuildByDatabase": {
        def: "[Rebuild by Database ]",
        la: "[Reaedifica ex repositorio ]",
        zh: "[按数据库重建 ]",
    },
    "cmdHiddenFileSync.progressRebuildByMerge": {
        def: "[Rebuild by Merge ]",
        la: "[Reaedifica conflando ]",
        zh: "[按合并重建 ]",
    },
    "cmdHiddenFileSync.progressRebuildByStorage": {
        def: "[Rebuild by Storage ]",
        la: "[Reaedifica ex repositorio plicarum ]",
        zh: "[按存储重建 ]",
    },
    "cmdHiddenFileSync.progressScanningDBToStorage": {
        def: "[Scanning DB -> Storage ]",
        la: "[Perscrutatio Repositorium -> Repositorium plicarum ]",
        zh: "[扫描 数据库 -> 存储 ]",
    },
    "cmdHiddenFileSync.progressScanningStorageToDB": {
        def: "[Scanning Storage -> DB ]",
        la: "[Perscrutatio Repositorium plicarum -> Repositorium ]",
        zh: "[扫描 存储 -> 数据库 ]",
    },
    "cmdHiddenFileSync.progressStorageToDB": {
        def: "[Storage -> DB ]",
        la: "[Repositorium plicarum -> Repositorium ]",
        zh: "[存储 -> 数据库 ]",
    },
    "cmdHiddenFileSync.rebuildingByMerge": {
        def: "Rebuilding hidden files from the storage and the local database.",
        la: "Plicae occultae ex repositorio plicarum et repositorio locali reaedificantur.",
        zh: "正在根据存储和本地数据库重建隐藏文件。",
    },
    "cmdHiddenFileSync.rebuildingFromStorage": {
        def: "Rebuilding hidden files from the storage.",
        la: "Plicae occultae ex repositorio plicarum reaedificantur.",
        zh: "正在根据存储重建隐藏文件。",
    },
    "cmdHiddenFileSync.scanningDatabaseFiles": {
        def: "Scanning database files...",
        la: "Plicae repositorii perscrutantur...",
        zh: "正在扫描数据库文件...",
    },
    "cmdHiddenFileSync.scanningStorageFiles": {
        def: "Scanning storage files...",
        la: "Plicae repositorii plicarum perscrutantur...",
        zh: "正在扫描存储文件...",
    },
    "cmdHiddenFileSync.startedMerge": {
        def: "Started: Database <--> Storage (by modified date)",
        la: "Incepta: Repositorium <--> Repositorium plicarum (per diem mutationis)",
        zh: "已开始：数据库 <--> 存储（按修改日期）",
    },
    "cmdHiddenFileSync.startedPull": {
        def: "Started: Database --> Storage",
        la: "Incepta: Repositorium --> Repositorium plicarum",
        zh: "已开始：数据库 --> 存储",
    },
    "cmdHiddenFileSync.startedPullOnlyNew": {
        def: "Started: Database --> Storage (Only New)",
        la: "Incepta: Repositorium --> Repositorium plicarum (nova tantum)",
        zh: "已开始：数据库 --> 存储（仅新文件）",
    },
    "cmdHiddenFileSync.startedPush": {
        def: "Started: Storage --> Database",
        la: "Incepta: Repositorium plicarum --> Repositorium",
        zh: "已开始：存储 --> 数据库",
    },
    "cmdHiddenFileSync.startedPushOnlyNew": {
        def: "Started: Storage --> Database (Only New)",
        la: "Incepta: Repositorium plicarum --> Repositorium (nova tantum)",
        zh: "已开始：存储 --> 数据库（仅新文件）",
    },
    "cmdHiddenFileSync.startProcessing": {
        def: "Start processing...",
        la: "Tractatio incipit...",
        zh: "开始处理...",
    },
    "cmdHiddenFileSync.storageStatics": {
        def: "[Storage hidden file statics]\nKnown files: ${known}\nActual files: ${actual}\nAll files: ${all}\nOffline Changed files: ${changed}",
        la: "[Statistica plicarum occultarum in repositorio plicarum]\nPlicae notae: ${known}\nPlicae verae: ${actual}\nOmnes plicae: ${all}\nPlicae extra conexionem mutatae: ${changed}",
        zh: "[存储隐藏文件统计]\n已知文件：${known}\n实际文件：${actual}\n全部文件：${all}\n离线时变更的文件：${changed}",
    },
    "cmdHiddenFileSync.storageToDatabaseCount": {
        def: "Storage to Database: ${count} files.",
        la: "Repositorium plicarum -> Repositorium: ${count} plicae.",
        zh: "存储到数据库：${count} 个文件。",
    },
    "cmdHiddenFileSync.trackChanges": {
        def: "Track changes.",
        la: "Vestiga mutationes.",
        zh: "跟踪变更。",
    },
    "cmdHiddenFileSync.trackingStatics": {
        def: "Tracking statics:\nLocal files: ${local}\nDatabase files: ${database}\nUntracked local files: ${untrackedLocal}\nUntracked database files: ${untrackedDatabase}\nCommon untracked files: ${common}",
        la: "Statistica vestigationis:\nPlicae locales: ${local}\nPlicae repositorii: ${database}\nPlicae locales non vestigatae: ${untrackedLocal}\nPlicae repositorii non vestigatae: ${untrackedDatabase}\nPlicae communes non vestigatae: ${common}",
        zh: "跟踪统计：\n本地文件：${local}\n数据库文件：${database}\n未跟踪的本地文件：${untrackedLocal}\n未跟踪的数据库文件：${untrackedDatabase}\n共同未跟踪的文件：${common}",
    },
    "cmdLocalDatabaseMainte.buttonMark": {
        def: "Mark",
        la: "Nota",
        zh: "标记",
    },
    "cmdLocalDatabaseMainte.buttonResurrect": {
        def: "Resurrect",
        la: "Resuscita",
        zh: "恢复",
    },
    "cmdLocalDatabaseMainte.commandGCV3": {
        def: "Garbage Collection V3 (advanced, beta)",
        la: "Collectio quisquiliarum V3 (provecta, beta)",
        zh: "垃圾回收 V3（高级，测试版）",
    },
    "cmdLocalDatabaseMainte.deleteChunks.message": {
        def: "We have following chunks that are marked as deleted.\n\n- Deleted chunks: ${count} (${size})\n\nAre you sure to delete these chunks permanently?\n\nNote: **Make sure to synchronise all devices before deletion.**\n\n> [!Note]\n> This operation finally reduces the capacity of the remote.",
        la: "Haec fragmenta ut deleta notata habemus.\n\n- Fragmenta deleta: ${count} (${size})\n\nCertusne es te haec fragmenta in perpetuum delere velle?\n\nNota: **Cura ut omnia instrumenta ante deletionem synchronizentur.**\n\n> [!Note]\n> Haec operatio tandem capacitatem remoti minuit.",
        zh: "以下块已被标记为删除。\n\n- 已删除的块：${count}（${size}）\n\n确定要永久删除这些块吗？\n\n注意：**删除前请确保所有设备都已同步。**\n\n> [!Note]\n> 此操作最终会减少远程占用的容量。",
    },
    "cmdLocalDatabaseMainte.deleteChunks.none": {
        def: "No deleted chunks found.",
        la: "Nulla fragmenta deleta inventa.",
        zh: "未找到已删除的块。",
    },
    "cmdLocalDatabaseMainte.deleteChunks.result": {
        def: "Deleted chunks: ${deleted} / ${total}",
        la: "Fragmenta deleta: ${deleted} / ${total}",
        zh: "已删除的块：${deleted} / ${total}",
    },
    "cmdLocalDatabaseMainte.deleteFiles.found": {
        def: "Found ${count} deleted files.",
        la: "${count} plicae deletae inventae.",
        zh: "找到 ${count} 个已删除的文件。",
    },
    "cmdLocalDatabaseMainte.deleteFiles.message": {
        def: "We have following files that are marked as deleted.\n\n- Deleted files: ${count}\n\nAre you sure to delete these files permanently?\n\nNote: **Make sure to synchronise all devices before deletion.**\n\n> [!Note]\n> This operation affects the database permanently. Deleted files will not be recovered after this operation.\n> And, the chunks that are used in the deleted files will be ready for compaction.",
        la: "Has plicas ut deletas notatas habemus.\n\n- Plicae deletae: ${count}\n\nCertusne es te has plicas in perpetuum delere velle?\n\nNota: **Cura ut omnia instrumenta ante deletionem synchronizentur.**\n\n> [!Note]\n> Haec operatio repositorium in perpetuum afficit. Plicae deletae post hanc operationem non recuperabuntur.\n> Et fragmenta quae in plicis deletis adhibentur ad compactionem parata erunt.",
        zh: "以下文件已被标记为删除。\n\n- 已删除的文件：${count}\n\n确定要永久删除这些文件吗？\n\n注意：**删除前请确保所有设备都已同步。**\n\n> [!Note]\n> 此操作会永久影响数据库。执行后，已删除的文件将无法恢复。\n> 此外，已删除文件所使用的块将可以被压缩清理。",
    },
    "cmdLocalDatabaseMainte.deleteFiles.none": {
        def: "No deleted files found.",
        la: "Nullae plicae deletae inventae.",
        zh: "未找到已删除的文件。",
    },
    "cmdLocalDatabaseMainte.deleteFiles.result": {
        def: "Deleted ${deleted} / ${total} files.",
        la: "Deletae ${deleted} / ${total} plicae.",
        zh: "已删除 ${deleted} / ${total} 个文件。",
    },
    "cmdLocalDatabaseMainte.deleteFiles.searching": {
        def: "Searching for deleted files..",
        la: "Plicae deletae quaeruntur..",
        zh: "正在搜索已删除的文件..",
    },
    "cmdLocalDatabaseMainte.deletionCancelled": {
        def: "Deletion operation is cancelled.",
        la: "Operatio deletionis abrogata est.",
        zh: "删除操作已取消。",
    },
    "cmdLocalDatabaseMainte.gc.buttonDelete": {
        def: "Yes, delete chunks",
        la: "Ita, dele fragmenta",
        zh: "是，删除块",
    },
    "cmdLocalDatabaseMainte.gc.cancelled": {
        def: "User cancelled chunk deletion",
        la: "Usor deletionem fragmentorum abrogavit",
        zh: "用户已取消删除块",
    },
    "cmdLocalDatabaseMainte.gc.completed": {
        def: "Garbage Collection completed.\nSuccess: ${success}, Errored: ${errored}",
        la: "Collectio quisquiliarum perfecta.\nSuccessus: ${success}, Errores: ${errored}",
        zh: "垃圾回收完成。\n成功：${success}，出错：${errored}",
    },
    "cmdLocalDatabaseMainte.gc.deleting": {
        def: "Deleting chunks: ${count}",
        la: "Fragmenta delentur: ${count}",
        zh: "正在删除块：${count}",
    },
    "cmdLocalDatabaseMainte.gc.message": {
        def: "This function deletes unused chunks from the device. If there are differences between devices, some chunks may be missing when resolving conflicts.\nBe sure to synchronise before executing.\n\nIf chunks used by current Vault files are deleted, Hatch -> Recreate chunks for current Vault files can recreate them only from files currently present in the Vault. It cannot recover unreadable historical or conflict content.\n\nAre you ready to delete unused chunks?",
        la: "Haec functio fragmenta non adhibita ex instrumento delet. Si inter instrumenta differentiae sunt, quaedam fragmenta in discrepantiis solvendis deesse possunt.\nCura ut ante exsecutionem synchronizes.\n\nSi fragmenta a plicis tabularii currentibus adhibita delentur, Hatch -> Recrea fragmenta plicarum tabularii currentium ea tantum ex plicis quae nunc in tabulario adsunt recreare potest. Contenta historica vel discrepantiarum illegibilia recuperare non potest.\n\nParatusne es fragmenta non adhibita delere?",
        zh: "此功能会删除本设备上未使用的块。如果设备之间存在差异，解决冲突时可能会缺少部分块。\n执行前请务必先同步。\n\n如果当前笔记库文件所用的块被删除，Hatch -> 为笔记库中的当前文件重新创建块 只能根据笔记库中当前存在的文件重新创建它们，无法恢复不可读的历史内容或冲突内容。\n\n准备好删除未使用的块了吗？",
    },
    "cmdLocalDatabaseMainte.gc.title": {
        def: "Are all devices synchronised?",
        la: "Suntne omnia instrumenta synchronizata?",
        zh: "所有设备都已同步了吗？",
    },
    "cmdLocalDatabaseMainte.oldRevisionsFound": {
        def: "Found ${count} old revisions for ${id} . ${toCheck} items to check",
        la: "${count} recensiones veteres pro ${id} inventae . ${toCheck} res inspiciendae",
        zh: "找到 ${id} 的 ${count} 个旧版本。待检查 ${toCheck} 项",
    },
    "cmdLocalDatabaseMainte.operation.deleteChunks": {
        def: "Delete Chunks",
        la: "Dele fragmenta",
        zh: "删除块",
    },
    "cmdLocalDatabaseMainte.operation.deleteFiles": {
        def: "Delete Files",
        la: "Dele plicas",
        zh: "删除文件",
    },
    "cmdLocalDatabaseMainte.operation.deleteUnusedChunks": {
        def: "Delete unused chunks",
        la: "Dele fragmenta non adhibita",
        zh: "删除未使用的块",
    },
    "cmdLocalDatabaseMainte.operation.garbageCollection": {
        def: "Garbage Collection",
        la: "Collectio quisquiliarum",
        zh: "垃圾回收",
    },
    "cmdLocalDatabaseMainte.operation.markUnusedChunks": {
        def: "Mark unused chunks",
        la: "Nota fragmenta non adhibita",
        zh: "标记未使用的块",
    },
    "cmdLocalDatabaseMainte.operation.resurrectChunks": {
        def: "Resurrect Chunks",
        la: "Resuscita fragmenta",
        zh: "恢复块",
    },
    "cmdLocalDatabaseMainte.operation.trackChunkUsage": {
        def: "Track chunk usage",
        la: "Vestiga usum fragmentorum",
        zh: "跟踪块使用情况",
    },
    "cmdLocalDatabaseMainte.resurrect.cancelled": {
        def: "Resurrect operation is cancelled.",
        la: "Operatio resuscitandi abrogata est.",
        zh: "恢复操作已取消。",
    },
    "cmdLocalDatabaseMainte.resurrect.message": {
        def: "We have following chunks that are deleted but still used in the database.\n\n- Completely lost chunks: ${lost}\n- Resurrectable chunks: ${resurrectable}\n\nDo you want to resurrect these chunks?",
        la: "Haec fragmenta deleta habemus quae tamen in repositorio adhibentur.\n\n- Fragmenta omnino amissa: ${lost}\n- Fragmenta resuscitabilia: ${resurrectable}\n\nVisne haec fragmenta resuscitare?",
        zh: "以下块已被删除，但仍在数据库中使用。\n\n- 完全丢失的块：${lost}\n- 可恢复的块：${resurrectable}\n\n是否恢复这些块？",
    },
    "cmdLocalDatabaseMainte.resurrect.none": {
        def: "No chunks are found to be resurrected.",
        la: "Nulla fragmenta resuscitanda inventa sunt.",
        zh: "未找到需要恢复的块。",
    },
    "cmdLocalDatabaseMainte.resurrect.result": {
        def: "Resurrected chunks: ${resurrected} / ${total}",
        la: "Fragmenta resuscitata: ${resurrected} / ${total}",
        zh: "已恢复的块：${resurrected} / ${total}",
    },
    "cmdLocalDatabaseMainte.retrievingChunks": {
        def: "Retrieving chunks informations..",
        la: "Informationes fragmentorum arcessuntur..",
        zh: "正在获取块信息..",
    },
    "cmdLocalDatabaseMainte.revisionLookupFailed": {
        def: "Error finding revisions for ${id}",
        la: "Error in recensionibus pro ${id} quaerendis",
        zh: "查找 ${id} 的版本时出错",
    },
    "cmdLocalDatabaseMainte.trackSummary": {
        def: "Total chunks: ${total}\nUnused chunks: ${unused}",
        la: "Fragmenta omnia: ${total}\nFragmenta non adhibita: ${unused}",
        zh: "块总数：${total}\n未使用的块：${unused}",
    },
    "cmdLocalDatabaseMainte.unusedChunks.deleteMessage": {
        def: 'We have following chunks that are not used from any files.\n\n- Chunks: ${count} (${size})\n\nAre you sure to delete these chunks?\n\nNote: **Make sure to synchronise all devices before deletion.**\n\n> [!Note]\n> Chunks referenced from deleted files are not deleted. Please run "Commit File Deletion" before this operation.',
        la: "Haec fragmenta habemus quae a nulla plica adhibentur.\n\n- Fragmenta: ${count} (${size})\n\nCertusne es te haec fragmenta delere velle?\n\nNota: **Cura ut omnia instrumenta ante deletionem synchronizentur.**\n\n> [!Note]\n> Fragmenta ex plicis deletis relata non delentur. Quaeso ante hanc operationem “Commit File Deletion” exsequere.",
        zh: "以下块未被任何文件使用。\n\n- 块：${count}（${size}）\n\n确定要删除这些块吗？\n\n注意：**删除前请确保所有设备都已同步。**\n\n> [!Note]\n> 已删除文件引用的块不会被删除。请在此操作之前先运行「Commit File Deletion」。",
    },
    "cmdLocalDatabaseMainte.unusedChunks.markMessage": {
        def: "We have following chunks that are not used from any files.\n\n- Chunks: ${count} (${size})\n\nAre you sure to mark these chunks to be deleted?\n\nNote: **Make sure to synchronise all devices before deletion.**\n\n> [!Note]\n> This operation will not reduces the capacity of the remote until permanent deletion.",
        la: "Haec fragmenta habemus quae a nulla plica adhibentur.\n\n- Fragmenta: ${count} (${size})\n\nCertusne es te haec fragmenta ut delenda notare velle?\n\nNota: **Cura ut omnia instrumenta ante deletionem synchronizentur.**\n\n> [!Note]\n> Haec operatio capacitatem remoti non minuet donec deletio perpetua fiat.",
        zh: "以下块未被任何文件使用。\n\n- 块：${count}（${size}）\n\n确定要将这些块标记为待删除吗？\n\n注意：**删除前请确保所有设备都已同步。**\n\n> [!Note]\n> 在永久删除之前，此操作不会减少远程占用的容量。",
    },
    "cmdLocalDatabaseMainte.unusedChunks.markResult": {
        def: "Marked chunks: ${marked} / ${total}",
        la: "Fragmenta notata: ${marked} / ${total}",
        zh: "已标记的块：${marked} / ${total}",
    },
    "cmdLocalDatabaseMainte.unusedChunks.none": {
        def: "No unused chunks found.",
        la: "Nulla fragmenta non adhibita inventa.",
        zh: "未找到未使用的块。",
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
    Communicating: {
        def: "Communicating",
        la: "Communicatur",
        zh: "通信中",
    },
    "Compaction in progress on remote database...": {
        def: "Compaction in progress on remote database...",
        la: "Compactio in repositorio remoto fit...",
        zh: "正在远程数据库上执行压缩...",
    },
    "Compaction on remote database completed successfully.": {
        def: "Compaction on remote database completed successfully.",
        la: "Compactio in repositorio remoto feliciter perfecta est.",
        zh: "远程数据库压缩已成功完成。",
    },
    "Compaction on remote database failed.": {
        def: "Compaction on remote database failed.",
        la: "Compactio in repositorio remoto defecit.",
        zh: "远程数据库压缩失败。",
    },
    "Compaction on remote database timed out.": {
        def: "Compaction on remote database timed out.",
        la: "Compactio in repositorio remoto tempus excessit.",
        zh: "远程数据库压缩超时。",
    },
    "Compare file": {
        def: "Compare file",
        la: "Compara plicam",
        zh: "比较文件",
    },
    "Compare the content of files between on local database and storage. If not matched, you will be asked which one you want to keep.":
        {
            def: "Compare the content of files between on local database and storage. If not matched, you will be asked which one you want to keep.",
            la: "Contentum plicarum inter repositorium locale et repositorium plicarum compara. Si non congruunt, rogaberis utram servare velis.",
            zh: "比较本地数据库与存储中的文件内容；如果不一致，你将被询问要保留哪一份。",
        },
    "Compare time and take newer": {
        def: "Compare time and take newer",
        la: "Compara tempus et recentiorem sume",
        zh: "比较时间并采用较新的版本",
    },
    "Compatibility (Conflict Behaviour)": {
        def: "Compatibility (Conflict Behaviour)",
        la: "Compatibilitas (modus discrepantiarum)",
        zh: "兼容性（冲突行为）",
    },
    "Compatibility (Database structure)": {
        def: "Compatibility (Database structure)",
        la: "Compatibilitas (structura repositorii)",
        zh: "兼容性（数据库结构）",
    },
    "Compatibility (Internal API Usage)": {
        def: "Compatibility (Internal API Usage)",
        la: "Compatibilitas (usus API interni)",
        zh: "兼容性（内部 API 使用）",
    },
    "Compatibility (Metadata)": {
        def: "Compatibility (Metadata)",
        la: "Compatibilitas (metadata)",
        zh: "兼容性（元数据）",
    },
    "Compatibility (Remote Database)": {
        def: "Compatibility (Remote Database)",
        la: "Compatibilitas (repositorium remotum)",
        zh: "兼容性（远端数据库）",
    },
    "Compatibility (Trouble addressed)": {
        def: "Compatibility (Trouble addressed)",
        la: "Compatibilitas (difficultates tractatae)",
        zh: "兼容性（问题修复）",
    },
    "Compute revisions for chunks": {
        def: "Compute revisions for chunks",
        la: "Computa recensiones fragmentorum",
        zh: "为 chunks 计算修订版本(以前的行为)",
    },
    "Concat both": {
        def: "Concat both",
        la: "Coniunge ambo",
        zh: "合并两者",
    },
    Configuration: {
        def: "Configuration",
        la: "Configuratio",
        zh: "配置",
    },
    "Configuration Encryption": {
        def: "Configuration Encryption",
        la: "Cryptatio configurationis",
        zh: "配置加密",
    },
    Configure: {
        def: "Configure",
        la: "Configura",
        zh: "配置",
    },
    "Configure And Change Remote": {
        def: "Configure And Change Remote",
        la: "Configura et muta remotum",
        zh: "配置并切换远端",
    },
    "Configure E2EE": {
        def: "Configure E2EE",
        la: "Configura E2EE",
        zh: "配置 E2EE",
    },
    "Configure Remote": {
        def: "Configure Remote",
        la: "Configura remotum",
        zh: "配置远端",
    },
    "Configure the same server information as your other devices again, manually, very advanced users only.": {
        def: "Configure the same server information as your other devices again, manually, very advanced users only.",
        la: "Easdem informationes ministratoris ac in aliis instrumentis tuis iterum manu configura; solum usoribus valde peritis.",
        zh: "手动重新输入与你其他设备相同的服务器信息。仅适合高级用户。",
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
    "Connect to existing database and continue": {
        def: "Connect to existing database and continue",
        la: "Conecte ad repositorium exstans et perge",
        zh: "连接到现有数据库并继续",
    },
    Connected: {
        def: "Connected",
        la: "Conexum",
        zh: "已连接",
    },
    "Connected to Signaling Server (as Peer ID: ${peerId})": {
        def: "Connected to Signaling Server (as Peer ID: ${peerId})",
        la: "Conexum ad ministratorem significationis (ut ID paris: ${peerId})",
        zh: "已连接到信令服务器（对等方 ID：${peerId}）",
    },
    "Connected:": {
        def: "Connected:",
        la: "Conexi:",
        zh: "已连接：",
    },
    "Connection Method": {
        def: "Connection Method",
        la: "Methodus conexionis",
        zh: "连接方式",
    },
    "Connection Settings": {
        def: "Connection Settings",
        la: "Optiones conexionis",
        zh: "连接设置",
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
    "Continue anyway": {
        def: "Continue anyway",
        la: "Perge nihilominus",
        zh: "仍然继续",
    },
    "Continue to CouchDB setup": {
        def: "Continue to CouchDB setup",
        la: "Perge ad configurationem CouchDB",
        zh: "继续进行 CouchDB 设置",
    },
    "Continue to Peer-to-Peer only setup": {
        def: "Continue to Peer-to-Peer only setup",
        la: "Perge ad configurationem solum inter pares (Peer-to-Peer)",
        zh: "继续进行仅 Peer-to-Peer 设置",
    },
    "Continue to S3/MinIO/R2 setup": {
        def: "Continue to S3/MinIO/R2 setup",
        la: "Perge ad configurationem S3/MinIO/R2",
        zh: "继续进行 S3/MinIO/R2 设置",
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
    "Copy Report to clipboard": {
        def: "Copy Report to clipboard",
        la: "Exscribe relationem in tabellam",
        zh: "将报告复制到剪贴板",
    },
    "Copy to clipboard": {
        def: "Copy to clipboard",
        la: "Exscribe in tabellam",
        zh: "复制到剪贴板",
    },
    "CouchDB Configuration": {
        def: "CouchDB Configuration",
        la: "Configuratio CouchDB",
        zh: "CouchDB 配置",
    },
    "CouchDB Connection Tweak": {
        def: "CouchDB Connection Tweak",
        la: "Accommodatio conexionis CouchDB",
        zh: "CouchDB 连接调优",
    },
    "CouchDB only. Version 0 preserves legacy path identity; version 1 uses Unicode NFC. Physical file names stay unchanged. Update every device and stop synchronisation, then Rebuild both databases from a complete authoritative Vault and Fetch on the other devices. Resolve colliding file names first. P2P and Object Storage do not support version 1.":
        {
            def: "CouchDB only. Version 0 preserves legacy path identity; version 1 uses Unicode NFC. Physical file names stay unchanged. Update every device and stop synchronisation, then Rebuild both databases from a complete authoritative Vault and Fetch on the other devices. Resolve colliding file names first. P2P and Object Storage do not support version 1.",
            la: "Solum CouchDB. Versio 0 identitatem viarum hereditariam servat; versio 1 Unicode NFC utitur. Nomina plicarum physica non mutantur. Omnia instrumenta renova et synchronizationem siste, deinde ambo repositoria ex tabulario integro et auctoritativo reaedifica et in aliis instrumentis arcesse. Prius nomina plicarum inter se collidentia resolve. P2P et repositorium obiectorum versionem 1 non sustinent.",
            zh: "仅限 CouchDB。版本 0 保留旧版路径标识；版本 1 使用 Unicode NFC。实际文件名保持不变。请更新所有设备并停止同步，然后用一份完整且权威的笔记库重建两个数据库，再在其他设备上获取。请先解决文件名冲突。P2P 和对象存储不支持版本 1。",
        },
    "CouchDB validates the database name when you connect. The name must not be empty.": {
        def: "CouchDB validates the database name when you connect. The name must not be empty.",
        la: "CouchDB nomen repositorii cum conectis confirmat. Nomen vacuum esse non debet.",
        zh: "CouchDB 会在连接时校验数据库名称。名称不能为空。",
    },
    "Create conflict": {
        def: "Create conflict",
        la: "Crea discrepantiam",
        zh: "制造冲突",
    },
    "Create or connect to database and continue": {
        def: "Create or connect to database and continue",
        la: "Crea vel conecte ad repositorium et perge",
        zh: "创建或连接到数据库并继续",
    },
    "Create P2P remote": {
        def: "Create P2P remote",
        la: "Crea remotum P2P",
        zh: "创建 P2P 远端",
    },
    "Cross-platform": {
        def: "Cross-platform",
        la: "Trans systemata",
        zh: "跨平台",
    },
    "Current adapter: {adapter}": {
        def: "Current adapter: {adapter}",
        la: "Adaptator praesens: {adapter}",
        zh: "当前适配器：{adapter}",
    },
    "Custom Headers": {
        def: "Custom Headers",
        la: "Capita propria",
        zh: "自定义请求头",
    },
    "Customization Sync": {
        def: "Customization Sync",
        la: "Synchronizatio optionum propriarum",
        zh: "自定义同步",
    },
    "Customization Sync (Beta3)": {
        def: "Customization Sync (Beta3)",
        la: "Synchronizatio optionum propriarum (Beta3)",
        zh: "自定义同步（Beta3）",
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
    "Database -> Storage": {
        def: "Database -> Storage",
        la: "Repositorium -> Repositorium plicarum",
        zh: "数据库 → 存储",
    },
    "Database Adapter": {
        def: "Database Adapter",
        la: "Adaptator repositorii",
        zh: "数据库适配器",
    },
    "Database Name": {
        def: "Database Name",
        la: "Nomen repositorii",
        zh: "数据库名称",
    },
    "Database suffix": {
        def: "Database suffix",
        la: "Suffixum repositorii",
        zh: "数据库后缀",
    },
    Date: {
        def: "Date",
        la: "Dies",
        zh: "日期",
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
    "Delete all customization sync data": {
        def: "Delete all customization sync data",
        la: "Dele omnia data synchronizationis optionum propriarum",
        zh: "删除所有自定义同步数据",
    },
    "Delete all data on the remote server.": {
        def: "Delete all data on the remote server.",
        la: "Dele omnia data in ministratore remoto.",
        zh: "删除远端服务器上的所有数据。",
    },
    "Delete All of": {
        def: "Delete All of",
        la: "Dele omnia ex",
        zh: "全部删除",
    },
    "Delete local database to reset or uninstall Self-hosted LiveSync": {
        def: "Delete local database to reset or uninstall Tabularium",
        la: "Dele repositorium locale ut Tabularium restituas vel deinstalles",
        zh: "删除本地数据库以重置或卸载 Tabularium",
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
    "Delete Remote Configuration": {
        def: "Delete Remote Configuration",
        la: "Dele configurationem remotam",
        zh: "删除远端配置",
    },
    "Delete remote configuration '{name}'?": {
        def: "Delete remote configuration '{name}'?",
        la: "Delerene configurationem remotam “{name}”?",
        zh: "要删除远端配置“{name}”吗？",
    },
    "Delete remote configuration '${name}'?": {
        def: "Delete remote configuration '${name}'?",
        la: "Delerene configurationem remotam “${name}”?",
        zh: "删除远端配置「${name}」？",
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
    "DENIED (in session)": {
        def: "DENIED (in session)",
        la: "NEGATUM (in sessione)",
        zh: "已拒绝（本次会话）",
    },
    Deny: {
        def: "Deny",
        la: "Nega",
        zh: "拒绝",
    },
    "Deny in session": {
        def: "Deny in session",
        la: "Nega in sessione",
        zh: "本次会话内拒绝",
    },
    "Deny permanently": {
        def: "Deny permanently",
        la: "Nega in perpetuum",
        zh: "永久拒绝",
    },
    "Deselect all": {
        def: "Deselect all",
        la: "Deselige omnia",
        zh: "取消全选",
    },
    desktop: {
        def: "desktop",
        la: "instrumentum mensale",
        zh: "桌面设备",
    },
    "Detected Peers": {
        def: "Detected Peers",
        la: "Pares detecti",
        zh: "检测到的对等方",
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
    "device name": {
        def: "device name",
        la: "nomen instrumenti",
        zh: "设备名称",
    },
    "Device name": {
        def: "Device name",
        la: "Nomen instrumenti",
        zh: "设备名称",
    },
    'Device name to identify the device. Please use shorter one for the stable peer detection, i.e., "iphone-16" or "macbook-2021".':
        {
            def: 'Device name to identify the device. Please use shorter one for the stable peer detection, i.e., "iphone-16" or "macbook-2021".',
            la: "Nomen ad instrumentum identificandum. Quaeso breviore utere ad stabilem parium detectionem, e.g., “iphone-16” vel “macbook-2021”.",
            zh: "用于标识设备的名称。为了对等方检测更稳定，请使用较短的名字，例如「iphone-16」或「macbook-2021」。",
        },
    "Device Peer ID": {
        def: "Device Peer ID",
        la: "ID paris instrumenti",
        zh: "设备对等方 ID",
    },
    "Device Setup Method": {
        def: "Device Setup Method",
        la: "Methodus instrumenti constituendi",
        zh: "设备设置方式",
    },
    "Devices:": {
        def: "Devices:",
        la: "Instrumenta:",
        zh: "设备：",
    },
    Diag: {
        def: "Diag",
        la: "Diagn.",
        zh: "诊断",
    },
    "Diagnostic RTCPeerConnection is enabled": {
        def: "Diagnostic RTCPeerConnection is enabled",
        la: "RTCPeerConnection diagnostica activa est",
        zh: "已启用诊断用 RTCPeerConnection",
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
    "dialog.yourLanguageAvailable": {
        def: "Tabularium had translations for your language, so the %{Display language} setting was enabled.\n\nNote: Not all messages are translated. We are waiting for your contributions!\nNote 2: If you create an Issue, **please revert to English** and then take screenshots, messages and logs. This can be done in the setting dialogue.\nMay you find it easy to use!",
        la: "Tabularium translationes linguae tuae habebat, itaque optio %{Display language} activata est.\n\nNota: Non omnes nuntii translati sunt. Contributiones tuas exspectamus!\nNota 2: Si Quaestionem (Issue) creas, **quaeso ad English revertere** et deinde imagines, nuntios et acta cape. Hoc in dialogo optionum fieri potest.\nUtinam facile uti possis!",
        zh: "Tabularium 已提供您语言的翻译,因此启用了%{Display language}\n\n注意：并非所有消息都已翻译。我们期待您的贡献！\n注意 2：若您创建问题报告， **请切换回English** ，然后截取屏幕截图、消息和日志，此操作可在设置对话框中完成\n愿您使用顺心！",
    },
    "dialog.yourLanguageAvailable.btnRevertToDefault": {
        def: "Keep English",
        la: "Retine English",
        zh: "保持English",
    },
    "dialog.yourLanguageAvailable.Title": {
        def: " Translation is available!",
        la: " Translatio praesto est!",
        zh: " 翻译可用!",
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
    "Disables all synchronization and restart.": {
        def: "Disables all synchronization and restart.",
        la: "Omnem synchronizationem deactivat et iterum incipit.",
        zh: "禁用所有同步并重新启动。",
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
    Duplicate: {
        def: "Duplicate",
        la: "Duplica",
        zh: "复制",
    },
    "Duplicate remote": {
        def: "Duplicate remote",
        la: "Duplica remotum",
        zh: "复制远端配置",
    },
    "E2EE Configuration": {
        def: "E2EE Configuration",
        la: "Configuratio E2EE",
        zh: "E2EE 配置",
    },
    "Edge case addressing (Behaviour)": {
        def: "Edge case addressing (Behaviour)",
        la: "Tractatio casuum extremorum (modus agendi)",
        zh: "边缘情况处理（行为）",
    },
    "Edge case addressing (Database)": {
        def: "Edge case addressing (Database)",
        la: "Tractatio casuum extremorum (repositorium)",
        zh: "边缘情况处理（数据库）",
    },
    "Edge case addressing (Processing)": {
        def: "Edge case addressing (Processing)",
        la: "Tractatio casuum extremorum (processus)",
        zh: "边缘情况处理（处理）",
    },
    "Emergency restart": {
        def: "Emergency restart",
        la: "Iteratum initium subitum",
        zh: "紧急重启",
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
    "Enable Developers' Debug Tools.": {
        def: "Enable Developers' Debug Tools.",
        la: "Activa instrumenta purgandi programmatorum.",
        zh: "启用开发者调试工具 ",
    },
    "Enable edge case treatment features": {
        def: "Enable edge case treatment features",
        la: "Activa facultates tractationis casuum extremorum",
        zh: "启用边缘情况处理功能",
    },
    "Enable P2P Replicator": {
        def: "Enable P2P Replicator",
        la: "Activa replicatorem P2P",
        zh: "启用 P2P 复制器",
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
    "Enabling end-to-end encryption ensures that your data is encrypted on your device before being sent to the remote server. This means that even if someone gains access to the server, they won't be able to read your data without the passphrase. Make sure to remember your passphrase, as it will be required to decrypt your data on other devices.":
        {
            def: "Enabling end-to-end encryption ensures that your data is encrypted on your device before being sent to the remote server. This means that even if someone gains access to the server, they won't be able to read your data without the passphrase. Make sure to remember your passphrase, as it will be required to decrypt your data on other devices.",
            la: "Cryptatio ab extremo ad extremum efficit ut data tua in instrumento tuo cryptentur antequam ad ministratorem remotum mittantur. Itaque etiamsi quis accessum ad ministratorem adipiscatur, data tua sine tessera arcana legere non poterit. Cura ut tesseram arcanam memineris, nam ad data tua in aliis instrumentis decryptanda requiretur.",
            zh: "启用端到端加密可确保数据在发送到远端服务器之前已在本设备上加密。这意味着即使有人获得了服务器的访问权限，没有密码短语也无法读取你的数据。请务必记住你的密码短语，因为在其他设备上解密数据时需要用到它。",
        },
    "Encrypt contents on the remote database. If you use the plugin's synchronization feature, enabling this is recommended.":
        {
            def: "Encrypt contents on the remote database. If you use the plugin's synchronization feature, enabling this is recommended.",
            la: "Contenta in repositorio remoto crypta. Si facultate synchronizationis additamenti uteris, hoc activare commendatur.",
            zh: "加密远程数据库中的内容。如果您使用插件的同步功能,则建议启用此功能 ",
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
    "Encryption phassphrase. If changed, you should overwrite the server's database with the new (encrypted) files.": {
        def: "Encryption phassphrase. If changed, you should overwrite the server's database with the new (encrypted) files.",
        la: "Tessera arcana cryptationis. Si mutatur, repositorium ministratoris novis plicis (cryptatis) superscribere debes.",
        zh: "加密密码。如果更改,您应该用新的(加密的)文件覆盖服务器的数据库 ",
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
    "Enter a complete HTTP or HTTPS URL.": {
        def: "Enter a complete HTTP or HTTPS URL.",
        la: "Insere URL integrum HTTP vel HTTPS.",
        zh: "输入完整的 HTTP 或 HTTPS 地址。",
    },
    "Enter a folder prefix (optional)": {
        def: "Enter a folder prefix (optional)",
        la: "Insere praefixum thecae (optionale)",
        zh: "输入文件夹前缀（可选）",
    },
    "Enter Server Information": {
        def: "Enter Server Information",
        la: "Insere informationes ministratoris",
        zh: "输入服务器信息",
    },
    "Enter Setup URI": {
        def: "Enter Setup URI",
        la: "Insere Setup URI",
        zh: "输入设置 URI",
    },
    "Enter the server information manually": {
        def: "Enter the server information manually",
        la: "Insere informationes ministratoris manu",
        zh: "手动输入服务器信息",
    },
    "Enter TURN credential": {
        def: "Enter TURN credential",
        la: "Insere testimonium TURN",
        zh: "输入 TURN 凭据",
    },
    "Enter TURN username": {
        def: "Enter TURN username",
        la: "Insere nomen usoris TURN",
        zh: "输入 TURN 用户名",
    },
    "Enter your Access Key ID": {
        def: "Enter your Access Key ID",
        la: "Insere ID clavis accessus tuae",
        zh: "输入你的访问密钥 ID",
    },
    "Enter your Bucket Name": {
        def: "Enter your Bucket Name",
        la: "Insere nomen situlae tuae",
        zh: "输入你的存储桶名称",
    },
    "Enter your database name": {
        def: "Enter your database name",
        la: "Insere nomen repositorii tui",
        zh: "输入你的数据库名称",
    },
    "Enter your JWT Key ID": {
        def: "Enter your JWT Key ID",
        la: "Insere ID clavis JWT tuae",
        zh: "输入你的 JWT 密钥 ID",
    },
    "Enter your JWT secret or private key": {
        def: "Enter your JWT secret or private key",
        la: "Insere secretum JWT vel clavem privatam tuam",
        zh: "输入你的 JWT 密钥或私钥",
    },
    "Enter your JWT Subject (CouchDB Username)": {
        def: "Enter your JWT Subject (CouchDB Username)",
        la: "Insere subiectum JWT tuum (nomen usoris CouchDB)",
        zh: "输入你的 JWT 主体（CouchDB 用户名）",
    },
    "Enter your passphrase": {
        def: "Enter your passphrase",
        la: "Insere tesseram arcanam tuam",
        zh: "输入你的密码短语",
    },
    "Enter your password": {
        def: "Enter your password",
        la: "Insere tesseram tuam",
        zh: "输入你的密码",
    },
    "Enter your Region (e.g., us-east-1, auto for R2)": {
        def: "Enter your Region (e.g., us-east-1, auto for R2)",
        la: "Insere regionem tuam (e.g., us-east-1, auto pro R2)",
        zh: "输入你的区域（例如 us-east-1，R2 填 auto）",
    },
    "Enter your Secret Access Key": {
        def: "Enter your Secret Access Key",
        la: "Insere clavem accessus secretam tuam",
        zh: "输入你的私有访问密钥",
    },
    "Enter your username": {
        def: "Enter your username",
        la: "Insere nomen usoris tuum",
        zh: "输入你的用户名",
    },
    "Error during connection test: ${reason}": {
        def: "Error during connection test: ${reason}",
        la: "Error in probatione conexionis: ${reason}",
        zh: "连接测试出错：${reason}",
    },
    "Error during testAndFixSettings: ${reason}": {
        def: "Error during testAndFixSettings: ${reason}",
        la: "Error in testAndFixSettings: ${reason}",
        zh: "testAndFixSettings 出错：${reason}",
    },
    "Error while loading file.": {
        def: "Error while loading file.",
        la: "Error dum plica oneratur.",
        zh: "加载文件时出错。",
    },
    "Experimental Settings": {
        def: "Experimental Settings",
        la: "Optiones experimentales",
        zh: "实验性设置",
    },
    Export: {
        def: "Export",
        la: "Exporta",
        zh: "导出",
    },
    "Failed to connect to remote for compaction.": {
        def: "Failed to connect to remote for compaction.",
        la: "Conexio ad remotum ad compactionem defecit.",
        zh: "无法连接到远程数据库以执行压缩。",
    },
    "Failed to connect to remote for compaction. ${reason}": {
        def: "Failed to connect to remote for compaction. ${reason}",
        la: "Conexio ad remotum ad compactionem defecit. ${reason}",
        zh: "无法连接到远程数据库以执行压缩。${reason}",
    },
    "Failed to connect to the server: ${reason}": {
        def: "Failed to connect to the server: ${reason}",
        la: "Conexio ad ministratorem defecit: ${reason}",
        zh: "无法连接到服务器：${reason}",
    },
    "Failed to connect to the server. Please check your settings.": {
        def: "Failed to connect to the server. Please check your settings.",
        la: "Conexio ad ministratorem defecit. Quaeso optiones tuas inspice.",
        zh: "无法连接到服务器。请检查你的设置。",
    },
    "Failed to connect to the signalling relay: ${reason}": {
        def: "Failed to connect to the signalling relay: ${reason}",
        la: "Conexio ad relatorem significationis defecit: ${reason}",
        zh: "无法连接到信令中继：${reason}",
    },
    "Failed to create replicator instance.": {
        def: "Failed to create replicator instance.",
        la: "Instantia replicatoris creari non potuit.",
        zh: "创建复制器实例失败。",
    },
    "Failed to parse Setup-URI.": {
        def: "Failed to parse Setup-URI.",
        la: "Setup-URI interpretari non potuit.",
        zh: "无法解析设置 URI。",
    },
    "Failed to start one-shot replication before Garbage Collection. Garbage Collection Cancelled.": {
        def: "Failed to start one-shot replication before Garbage Collection. Garbage Collection Cancelled.",
        la: "Replicatio singularis ante collectionem quisquiliarum incipi non potuit. Collectio quisquiliarum abrogata.",
        zh: "无法在垃圾回收前启动一次性复制。垃圾回收已取消。",
    },
    "Failed to start replication after Garbage Collection.": {
        def: "Failed to start replication after Garbage Collection.",
        la: "Replicatio post collectionem quisquiliarum incipi non potuit.",
        zh: "垃圾回收后无法启动复制。",
    },
    "Failed:": {
        def: "Failed:",
        la: "Defecerunt:",
        zh: "失败：",
    },
    Fetch: {
        def: "Fetch",
        la: "Arcesse",
        zh: "获取",
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
    "Fetch remote settings": {
        def: "Fetch remote settings",
        la: "Arcesse optiones remotas",
        zh: "获取远端设置",
    },
    FETCHING: {
        def: "FETCHING",
        la: "ARCESSITUR",
        zh: "获取中",
    },
    "Fetching status...": {
        def: "Fetching status...",
        la: "Status arcessitur...",
        zh: "正在获取状态…",
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
    "First, please select the option that best describes your current situation.": {
        def: "First, please select the option that best describes your current situation.",
        la: "Primum, quaeso optionem elige quae condicionem tuam praesentem optime describit.",
        zh: "首先，请选择最符合你当前情况的选项。",
    },
    Fix: {
        def: "Fix",
        la: "Corrige",
        zh: "修复",
    },
    "Flag and restart": {
        def: "Flag and restart",
        la: "Nota et iterum incipe",
        zh: "标记后重启",
    },
    "Flagged Selective": {
        def: "Flagged Selective",
        la: "Selectiva notata",
        zh: "已标记为选择性",
    },
    "Folder Prefix": {
        def: "Folder Prefix",
        la: "Praefixum thecae",
        zh: "文件夹前缀",
    },
    "For HS256/HS512 algorithms, provide the shared secret key. For ES256/ES512 algorithms, provide the pkcs8 PEM-formatted private key.":
        {
            def: "For HS256/HS512 algorithms, provide the shared secret key. For ES256/ES512 algorithms, provide the pkcs8 PEM-formatted private key.",
            la: "Pro algorithmis HS256/HS512, clavem secretam communem praebe. Pro algorithmis ES256/ES512, clavem privatam forma PEM pkcs8 praebe.",
            zh: "对于 HS256/HS512 算法，请提供共享密钥。对于 ES256/ES512 算法，请提供 pkcs8 PEM 格式的私钥。",
        },
    "Forces the file to be synced when opened.": {
        def: "Forces the file to be synced when opened.",
        la: "Plicam synchronizari cogit cum aperitur.",
        zh: "打开文件时强制同步该文件 ",
    },
    "Fresh Start Wipe": {
        def: "Fresh Start Wipe",
        la: "Deletio ad novum initium",
        zh: "全新开始清除",
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
    "Garbage Collection cancelled by user.": {
        def: "Garbage Collection cancelled by user.",
        la: "Collectio quisquiliarum ab usore abrogata.",
        zh: "用户已取消垃圾回收。",
    },
    "Garbage Collection completed. Deleted chunks: ${deletedChunks} / ${totalChunks}. Time taken: ${seconds} seconds.":
        {
            def: "Garbage Collection completed. Deleted chunks: ${deletedChunks} / ${totalChunks}. Time taken: ${seconds} seconds.",
            la: "Collectio quisquiliarum perfecta. Fragmenta deleta: ${deletedChunks} / ${totalChunks}. Tempus consumptum: ${seconds} secundae.",
            zh: "垃圾回收完成。已删除 chunks：${deletedChunks} / ${totalChunks}。耗时：${seconds} 秒。",
        },
    "Garbage Collection Confirmation": {
        def: "Garbage Collection Confirmation",
        la: "Confirmatio collectionis quisquiliarum",
        zh: "垃圾回收确认",
    },
    "Garbage Collection V3 (Beta)": {
        def: "Garbage Collection V3 (Beta)",
        la: "Collectio quisquiliarum V3 (Beta)",
        zh: "垃圾回收 V3（Beta）",
    },
    "Garbage Collection: Found ${unusedChunks} unused chunks to delete.": {
        def: "Garbage Collection: Found ${unusedChunks} unused chunks to delete.",
        la: "Collectio quisquiliarum: ${unusedChunks} fragmenta non adhibita delenda inventa.",
        zh: "垃圾回收：发现 ${unusedChunks} 个未使用的 chunks 待删除。",
    },
    "Garbage Collection: Scanned ${scanned} / ~${docCount}": {
        def: "Garbage Collection: Scanned ${scanned} / ~${docCount}",
        la: "Collectio quisquiliarum: ${scanned} / ~${docCount} perlustrata",
        zh: "垃圾回收：已扫描 ${scanned} / ~${docCount}",
    },
    "Garbage Collection: Scanning completed. Total chunks: ${totalChunks}, Used chunks: ${usedChunks}": {
        def: "Garbage Collection: Scanning completed. Total chunks: ${totalChunks}, Used chunks: ${usedChunks}",
        la: "Collectio quisquiliarum: perlustratio perfecta. Fragmenta omnia: ${totalChunks}, fragmenta adhibita: ${usedChunks}",
        zh: "垃圾回收：扫描完成。总 chunks：${totalChunks}，已使用 chunks：${usedChunks}",
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
    "Generate Random ID": {
        def: "Generate Random ID",
        la: "Genera ID fortuitum",
        zh: "生成随机 ID",
    },
    "Get Configuration": {
        def: "Get Configuration",
        la: "Arcesse configurationem",
        zh: "获取配置",
    },
    "Group ID": {
        def: "Group ID",
        la: "ID gregis",
        zh: "组 ID",
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
    "Hidden file synchronization have been temporarily disabled. Please enable them after the fetching, if you need them.":
        {
            def: "Hidden file synchronization have been temporarily disabled. Please enable them after the fetching, if you need them.",
            la: "Synchronizatio plicarum occultarum ad tempus deactivata est. Quaeso eam post arcessionem activa, si ea indiges.",
            zh: "隐藏文件同步已被临时停用。获取完成后如需使用，请重新启用。",
        },
    "Hidden Files": {
        def: "Hidden Files",
        la: "Plicae occultae",
        zh: "隐藏文件",
    },
    Hide: {
        def: "Hide",
        la: "Cela",
        zh: "隐藏",
    },
    "Hide completely": {
        def: "Hide completely",
        la: "Omnino cela",
        zh: "完全隐藏",
    },
    "Hide not applicable items": {
        def: "Hide not applicable items",
        la: "Cela res non applicabiles",
        zh: "隐藏不适用项",
    },
    "Hide password": {
        def: "Hide password",
        la: "Cela tesseram",
        zh: "隐藏密码",
    },
    "Higher (${local} > ${remote})": {
        def: "Higher (${local} > ${remote})",
        la: "Superior (${local} > ${remote})",
        zh: "较高（${local} > ${remote}）",
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
    "How would you like to configure the connection to your server?": {
        def: "How would you like to configure the connection to your server?",
        la: "Quomodo conexionem ad ministratorem tuum configurare vis?",
        zh: "你希望如何配置与服务器的连接？",
    },
    "However, This should not be enabled if you want to increase your secrecy more.": {
        def: "However, This should not be enabled if you want to increase your secrecy more.",
        la: "Attamen hoc activandum non est si secretum tuum magis augere vis.",
        zh: "不过，如果你希望进一步提高保密性，则不应启用此项。",
    },
    "I am adding a device to an existing synchronisation setup": {
        def: "I am adding a device to an existing synchronisation setup",
        la: "Instrumentum ad synchronizationem iam constitutam addo",
        zh: "我要将设备加入现有同步配置",
    },
    "I am ready, unlock the database": {
        def: "I am ready, unlock the database",
        la: "Paratus sum, repositorium resera",
        zh: "我已准备好，立即解锁数据库",
    },
    "I am setting this up for the first time": {
        def: "I am setting this up for the first time",
        la: "Hoc primum constituo",
        zh: "我是第一次进行设置",
    },
    "I am setting up a new server for the first time / I want to reset my existing server.": {
        def: "I am setting up a new server for the first time / I want to reset my existing server.",
        la: "Novum ministratorem primum constituo / ministratorem meum exstantem restituere volo.",
        zh: "我是第一次设置新服务器／我想重置现有服务器。",
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
    "I have made a backup, mark this device as resolved": {
        def: "I have made a backup, mark this device as resolved",
        la: "Exemplar tutelare feci; hoc instrumentum ut resolutum nota",
        zh: "我已完成备份，将此设备标记为“已确认”",
    },
    "I know my server details, let me enter them": {
        def: "I know my server details, let me enter them",
        la: "Singula ministratoris mei novi; sine me ea inserere",
        zh: "我知道服务器详情，让我手动输入",
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
    'If "Auto Start P2P Connection" is enabled, the P2P connection will be started automatically when the plug-in launches.':
        {
            def: 'If "Auto Start P2P Connection" is enabled, the P2P connection will be started automatically when the plug-in launches.',
            la: "Si “Conexionem P2P automatice incipe” activum est, conexio P2P automatice incipietur cum additamentum initium capit.",
            zh: "如果启用了「自动启动 P2P 连接」，插件启动时会自动建立 P2P 连接。",
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
    "If this enabled, all chunks will be stored with the revision made from its content. (Previous behaviour)": {
        def: "If this enabled, all chunks will be stored with the revision made from its content. (Previous behaviour)",
        la: "Si hoc activum est, omnia fragmenta cum recensione ex contento eorum facta servabuntur. (Modus prior)",
        zh: "如果启用,所有 chunks 将使用根据其内容生成的修订版本存储(以前的行为)",
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
    "If you cannot avoid CORS issues, you might want to try this option. It uses Obsidian's internal API to communicate with the CouchDB server. Not compliant with web standards, but works. Note that this might break in future Obsidian versions.":
        {
            def: "If you cannot avoid CORS issues, you might want to try this option. It uses Obsidian's internal API to communicate with the CouchDB server. Not compliant with web standards, but works. Note that this might break in future Obsidian versions.",
            la: "Si difficultates CORS vitare non potes, hanc optionem temptare fortasse velis. API interno Obsidian utitur ad cum ministratore CouchDB communicandum. Normis interretialibus non congruit, sed operatur. Nota hoc in futuris versionibus Obsidian fortasse frangi posse.",
            zh: "如果无法避开 CORS 问题，可以试试此选项。它使用 Obsidian 的内部 API 与 CouchDB 服务器通信。不符合 Web 标准，但可用。请注意，未来的 Obsidian 版本可能会使其失效。",
        },
    "If you cannot avoid CORS issues, you might want to try this option. It uses Obsidian's internal API to communicate with the S3 server. Not compliant with web standards, but works. Note that this might break in future Obsidian versions.":
        {
            def: "If you cannot avoid CORS issues, you might want to try this option. It uses Obsidian's internal API to communicate with the S3 server. Not compliant with web standards, but works. Note that this might break in future Obsidian versions.",
            la: "Si difficultates CORS vitare non potes, hanc optionem temptare fortasse velis. API interno Obsidian utitur ad cum ministratore S3 communicandum. Normis interretialibus non congruit, sed operatur. Nota hoc in futuris versionibus Obsidian fortasse frangi posse.",
            zh: "如果无法避开 CORS 问题，可以试试此选项。它使用 Obsidian 的内部 API 与 S3 服务器通信。不符合 Web 标准，但可用。请注意，未来的 Obsidian 版本可能会使其失效。",
        },
    "If you have unsynchronised changes in your Vault on this device, they will likely diverge from the server's versions after the reset. This may result in a large number of file conflicts.":
        {
            def: "If you have unsynchronised changes in your Vault on this device, they will likely diverge from the server's versions after the reset. This may result in a large number of file conflicts.",
            la: "Si mutationes non synchronizatas in tabulario tuo in hoc instrumento habes, post restitutionem verisimiliter a versionibus ministratoris discedent. Hoc magnum numerum discrepantiarum plicarum efficere potest.",
            zh: "如果本设备的库中有未同步的更改，重置后它们很可能与服务器上的版本产生分歧。这可能导致大量文件冲突。",
        },
    "If you reached the payload size limit when using IBM Cloudant, please decrease batch size and batch limit to a lower value.":
        {
            def: "If you reached the payload size limit when using IBM Cloudant, please decrease batch size and batch limit to a lower value.",
            la: "Si ad limitem magnitudinis oneris IBM Cloudant utens pervenisti, quaeso magnitudinem acervi et limitem acervi ad valorem minorem minue.",
            zh: "如果在使用 IBM Cloudant 时达到载荷大小上限，请把批量大小和批量上限调低。",
        },
    "If you understand the risks and still wish to proceed, select so.": {
        def: "If you understand the risks and still wish to proceed, select so.",
        la: "Si pericula intellegis et tamen pergere vis, hoc elige.",
        zh: "如果你明白风险但仍希望继续，请选择此项。",
    },
    "If you want to store the data in a specific folder within the bucket, you can specify a folder prefix here. Otherwise, leave it blank to store data at the root of the bucket.":
        {
            def: "If you want to store the data in a specific folder within the bucket, you can specify a folder prefix here. Otherwise, leave it blank to store data at the root of the bucket.",
            la: "Si data in certa theca intra situlam servare vis, praefixum thecae hic indicare potes. Aliter vacuum relinque ut data in radice situlae serventur.",
            zh: "如果想把数据存放在存储桶内的指定文件夹中，可以在此指定文件夹前缀。否则留空，数据将存放在存储桶根目录。",
        },
    "If you want to use `LiveSync`, you should broadcast changes. All `watching` peers which detects this will start the replication for fetching.":
        {
            def: "If you want to use live sync, you should broadcast changes. All `watching` peers which detects this will start the replication for fetching.",
            la: "Si synchronizatione viva uti vis, mutationes divulgare debes. Omnes pares `watching` qui hoc animadvertunt replicationem ad arcessendum incipient.",
            zh: "如果要使用实时同步，你应当广播变更。所有检测到变更的 `watching` 对等方都会启动复制以获取数据。",
        },
    Ignore: {
        def: "Ignore",
        la: "Ignora",
        zh: "忽略",
    },
    "Ignore and Proceed": {
        def: "Ignore and Proceed",
        la: "Ignora et perge",
        zh: "忽略并继续",
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
    "Import connection": {
        def: "Import connection",
        la: "Importa conexionem",
        zh: "导入连接",
    },
    IMPORTANT: {
        def: "IMPORTANT",
        la: "MAGNI MOMENTI",
        zh: "重要",
    },
    "Important Notice": {
        def: "Important Notice",
        la: "Nuntius gravis",
        zh: "重要通知",
    },
    "In most cases, you should stick with the default algorithm (${algorithm}), This setting is only required if you have an existing Vault encrypted in a different format.":
        {
            def: "In most cases, you should stick with the default algorithm (${algorithm}), This setting is only required if you have an existing Vault encrypted in a different format.",
            la: "Plerumque algorithmo praedefinito (${algorithm}) uti debes. Haec optio solum requiritur si tabularium exstans alia forma cryptatum habes.",
            zh: "大多数情况下，你应当沿用默认算法（${algorithm}）。只有当你有以其他格式加密的现有库时，才需要此项设置。",
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
    "Initial Action": {
        def: "Initial Action",
        la: "Actio initialis",
        zh: "初始操作",
    },
    "Initialise all journal history, On the next sync, every item will be received and sent.": {
        def: "Initialise all journal history, On the next sync, every item will be received and sent.",
        la: "Omnem historiam diarii initializa. In proxima synchronizatione, omnis res accipietur et mittetur.",
        zh: "初始化所有日志历史。下次同步时，所有项目都会重新接收并发送。",
    },
    "Initialise journal received history. On the next sync, every item except this device sent will be downloaded again.":
        {
            def: "Initialise journal received history. On the next sync, every item except this device sent will be downloaded again.",
            la: "Historiam acceptorum diarii initializa. In proxima synchronizatione, omnis res praeter eas quas hoc instrumentum misit iterum deorsum feretur.",
            zh: "初始化日志的已接收历史。下次同步时，除本设备已发送的项外，其余都会重新下载。",
        },
    "Initialise journal sent history. On the next sync, every item except this device received will be sent again.": {
        def: "Initialise journal sent history. On the next sync, every item except this device received will be sent again.",
        la: "Historiam missorum diarii initializa. In proxima synchronizatione, omnis res praeter eas quas hoc instrumentum accepit iterum mittetur.",
        zh: "初始化日志的已发送历史。下次同步时，除本设备已接收的项外，其余都会重新发送。",
    },
    "Interval (sec)": {
        def: "Interval (sec)",
        la: "Intervallum (sec)",
        zh: "间隔(秒)",
    },
    INVERTED: {
        def: "INVERTED",
        la: "INVERSUM",
        zh: "已反转",
    },
    "Issue detection log:": {
        def: "Issue detection log:",
        la: "Acta detectionis quaestionum:",
        zh: "问题检测日志：",
    },
    "It is strongly advised to create a backup before proceeding. Continuing without a backup may lead to data loss.": {
        def: "It is strongly advised to create a backup before proceeding. Continuing without a backup may lead to data loss.",
        la: "Valde suadetur ut exemplar tutelare crees antequam pergas. Sine exemplari tutelari pergere ad datorum amissionem ducere potest.",
        zh: "强烈建议在继续之前先做备份。没有备份继续可能导致数据丢失。",
    },
    "Just for a minute, please!": {
        def: "Just for a minute, please!",
        la: "Unum modo momentum, quaeso!",
        zh: "请稍等一分钟！",
    },
    "JWT (JSON Web Token) authentication allows you to securely authenticate with the CouchDB server using tokens. Ensure that your CouchDB server is configured to accept JWTs and that the provided key and settings match the server's configuration. Incidentally, I have not verified it very thoroughly.":
        {
            def: "JWT (JSON Web Token) authentication allows you to securely authenticate with the CouchDB server using tokens. Ensure that your CouchDB server is configured to accept JWTs and that the provided key and settings match the server's configuration. Incidentally, I have not verified it very thoroughly.",
            la: "Authenticatio JWT (JSON Web Token) tibi permittit ut cum ministratore CouchDB per signa tuto authenticeris. Cura ut ministrator CouchDB tuus ad JWT accipienda configuratus sit et ut clavis et optiones praebitae configurationi ministratoris congruant. Obiter, hoc non admodum diligenter probavi.",
            zh: "JWT（JSON Web Token）身份验证让你可以用令牌安全地通过 CouchDB 服务器验证身份。请确保你的 CouchDB 服务器已配置为接受 JWT，且所提供的密钥和设置与服务器配置相符。顺带一提，我并没有非常彻底地验证过它。",
        },
    "JWT Algorithm": {
        def: "JWT Algorithm",
        la: "Algorithmus JWT",
        zh: "JWT 算法",
    },
    "JWT Expiration Duration (minutes)": {
        def: "JWT Expiration Duration (minutes)",
        la: "Duratio exspirationis JWT (minutae)",
        zh: "JWT 有效期（分钟）",
    },
    "JWT Key": {
        def: "JWT Key",
        la: "Clavis JWT",
        zh: "JWT 密钥",
    },
    "JWT Key ID (kid)": {
        def: "JWT Key ID (kid)",
        la: "ID clavis JWT (kid)",
        zh: "JWT 密钥 ID（kid）",
    },
    "JWT Subject (sub)": {
        def: "JWT Subject (sub)",
        la: "Subiectum JWT (sub)",
        zh: "JWT 主体（sub）",
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
    lang_def: {
        def: "English",
        la: "English",
        zh: "English",
    },
    "lang-auto": {
        def: "Default (follow Obsidian)",
        la: "Praedefinitum (Obsidian sequere)",
        zh: "默认（跟随 Obsidian）",
    },
    "lang-def": {
        def: "English",
        la: "English",
        zh: "English",
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
    "Legacy path identity": {
        def: "Legacy path identity",
        la: "Identitas viarum hereditaria",
        zh: "旧版路径标识",
    },
    "Limit: {datetime} ({timestamp})": {
        def: "Limit: {datetime} ({timestamp})",
        la: "Limes: {datetime} ({timestamp})",
        zh: "限制：{datetime}（{timestamp}）",
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
        la: "Iterum conare cum minore magnitudine fasciculi:${batch_size}/${batches_limit}",
        zh: "使用更小的批量大小重试：${batch_size}/${batches_limit}",
    },
    "liveSyncReplicator.unlockRemoteDb": {
        def: "Unlock remote database to prevent data corruption",
        la: "Resera repositorium remotum ne data corrumpantur",
        zh: "解锁远程数据库以防止数据损坏",
    },
    "liveSyncSetting.errorNoSuchSettingItem": {
        def: "No such setting item: ${key}",
        la: "Nulla talis optio: ${key}",
        zh: "没有此设置项：${key}",
    },
    "liveSyncSetting.originalValue": {
        def: "Original: ${value}",
        la: "Originale: ${value}",
        zh: "原始值：${value}",
    },
    "liveSyncSetting.valueShouldBeInRange": {
        def: "The value should ${min} < value < ${max}",
        la: "Valor esse debet ${min} < valor < ${max}",
        zh: "值应该在 ${min} < value < ${max} 之间",
    },
    "liveSyncSettings.btnApply": {
        def: "Apply",
        la: "Adhibe",
        zh: "应用",
    },
    "Loading old revisions...": {
        def: "Loading old revisions...",
        la: "Recensiones veteres onerantur...",
        zh: "正在加载旧版本...",
    },
    "Local Database Tweak": {
        def: "Local Database Tweak",
        la: "Accommodatio repositorii localis",
        zh: "本地数据库微调",
    },
    "Local only": {
        def: "Local only",
        la: "Solum localiter",
        zh: "仅本地",
    },
    Lock: {
        def: "Lock",
        la: "Obsera",
        zh: "锁定",
    },
    "Lock Server": {
        def: "Lock Server",
        la: "Obsera ministratorem",
        zh: "锁定服务器",
    },
    "Lock the remote server to prevent synchronization with other devices.": {
        def: "Lock the remote server to prevent synchronization with other devices.",
        la: "Ministratorem remotum obsera ne synchronizatio cum aliis instrumentis fiat.",
        zh: "锁定远端服务器，以阻止其他设备继续同步。",
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
    "Lower (${local} < ${remote})": {
        def: "Lower (${local} < ${remote})",
        la: "Inferior (${local} < ${remote})",
        zh: "较低（${local} < ${remote}）",
    },
    "Maintenance Commands": {
        def: "Maintenance Commands",
        la: "Mandata conservationis",
        zh: "维护命令",
    },
    "Maintenance mode": {
        def: "Maintenance mode",
        la: "Modus conservationis",
        zh: "维护模式",
    },
    "maintenancePrerequisites.apply": {
        def: "Apply and continue",
        la: "Applica et perge",
        zh: "应用并继续",
    },
    "maintenancePrerequisites.fetchChunksOff": {
        def: "- Fetch chunks on demand: Off (currently On)",
        la: "- Arcesse fragmenta ad postulatum: Deactivatum (nunc activum)",
        zh: "- 按需获取块：关闭（当前为开启）",
    },
    "maintenancePrerequisites.message": {
        def: "${operation} requires the following settings:\n\n${settings}\n\nApply these settings and continue?",
        la: "${operation} has optiones requirit:\n\n${settings}\n\nApplicarene has optiones et pergere?",
        zh: "${operation} 需要以下设置：\n\n${settings}\n\n是否应用这些设置并继续？",
    },
    "maintenancePrerequisites.title": {
        def: "${operation} prerequisites",
        la: "Praerequisita: ${operation}",
        zh: "${operation} 的前提条件",
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
    "moduleLiveSyncMain.logReadChangelog": {
        def: "Tabularium has updated, please read the changelog!",
        la: "Tabularium renovatum est, quaeso indicem mutationum lege!",
        zh: "Tabularium 已更新,请阅读更新日志！",
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
    "moduleLiveSyncMain.logVersionUpdate": {
        def: "Tabularium has been updated, In case of breaking updates, all automatic synchronization has been temporarily disabled. Ensure that all devices are up to date before enabling.",
        la: "Tabularium renovatum est. Propter renovationes fortasse incompatibiles, omnis synchronizatio automatica ad tempus deactivata est. Cura ut omnia instrumenta renovata sint antequam activas.",
        zh: "Tabularium 已更新,如果存在破坏性更新,所有自动同步已暂时禁用。请确保所有设备都更新到最新版本后再启用",
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
        la: "Plicae moram fasciculi exspectantes",
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
        def: 'Due to a recent bug (in v0.25.6), some files may not have been saved correctly in the sync database.\nWe have scanned our files and found some that need to be fixed.\n\n**Files ready to be fixed:**\n\n${files}\n\nThese files have size-matched original file on the storage, and are likely to be recoverable.\nWe can use them to fix the database, please click the "Fix" button below to fix them.\n\n${messageUnrecoverable}\n\nIf you want to run it again, you can do so from Hatch.\n',
        la: "Propter vitium recens (in v0.25.6), aliquae plicae in repositorio synchronizationis fortasse non recte servatae sunt.\nPlicas nostras perscrutati sumus et aliquas invenimus quae corrigendae sunt.\n\n**Plicae corrigendae paratae:**\n\n${files}\n\nHae plicae plicam originalem eiusdem magnitudinis in repositorio habent, et verisimiliter restitui possunt.\nEis uti possumus ad repositorium corrigendum; quaeso preme puncto “Corrige” infra ut eas corrigas.\n\n${messageUnrecoverable}\n\nSi iterum currere vis, ex Hatch facere potes.\n",
        zh: "由于最近的一个 bug（在 v0.25.6 版本中），某些文件可能未正确保存到同步数据库中\n我们已经扫描了文件，并发现一些需要修复的文件\n\n**准备修复的文件:**\n\n${files}\n\n这些文件在存储中与原文件的大小匹配，可能是可恢复的\n我们可以使用它们修复数据库，请点击下方的“修复”按钮进行修复\n\n${messageUnrecoverable}\n\n\n如果你希望再次执行此操作，可以前往 Hatch 页面进行操作\n",
    },
    "moduleMigration.fix0256.messageUnrecoverable": {
        def: "**Files cannot be fixed on this device:**\n\n${filesNotRecoverable}\n\nThese files have inconsistent metadata, and cannot be fixed on this device (mostly we cannot determine which is correct).\nTo restore them, please check your other devices (also by this feature) or restore them manually from a backup.\n",
        la: "**Plicae quae in hoc instrumento corrigi non possunt:**\n\n${filesNotRecoverable}\n\nHae plicae metadata inconstantia habent nec in hoc instrumento corrigi possunt (plerumque statuere non possumus quae recta sint).\nUt eas restituas, quaeso alia instrumenta tua inspice (etiam hac facultate) vel eas manu ex exemplo tutelari restitue.\n",
        zh: "**无法在此设备上修复的文件:**\n\n${filesNotRecoverable}\n\n这些文件的元数据不一致，无法在此设备上修复（大多数情况下我们无法确定哪一个是正确的）\n要恢复它们，请检查你的其他设备（同样使用此功能），或从备份中手动恢复\n",
    },
    "moduleMigration.fix0256.title": {
        def: "Broken files has been detected",
        la: "Plicae corruptae detectae sunt",
        zh: "检测到损坏的文件",
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
    "moduleMigration.logFetchRemoteTweakFailed": {
        def: "Failed to fetch remote tweak values",
        la: "Valores subtiles remoti arcessiri non potuerunt",
        zh: "获取远程调整值失败",
    },
    "moduleMigration.logLocalDatabaseNotReady": {
        def: "Something went wrong! The local database is not ready",
        la: "Aliquid erravit! Repositorium locale non paratum est",
        zh: "出错了！本地数据库尚未准备好",
    },
    "moduleMigration.logMigratedSameBehaviour": {
        def: "Migrated to db:${current} with the same behaviour as before",
        la: "Migratum ad db:${current} eodem modo quo antea",
        zh: "已迁移到 db:${current},行为与之前相同",
    },
    "moduleMigration.logMigrationFailed": {
        def: "Migration failed or cancelled from ${old} to ${current}",
        la: "Migratio ab ${old} ad ${current} defecit vel abrogata est",
        zh: "从 ${old} 到 ${current} 的迁移失败或已取消",
    },
    "moduleMigration.logRedflag2CreationFail": {
        def: "Failed to create redflag2",
        la: "redflag2 creari non potuit",
        zh: "创建 redflag2 失败",
    },
    "moduleMigration.logRemoteTweakUnavailable": {
        def: "Could not get remote tweak values",
        la: "Valores subtiles remoti obtineri non potuerunt",
        zh: "无法获取远程调整值",
    },
    "moduleMigration.logSetupCancelled": {
        def: "The setup has been cancelled, Tabularium waiting for your setup!",
        la: "Constitutio abrogata est; Tabularium constitutionem tuam exspectat!",
        zh: "设置已取消,Tabularium 正在等待您的设置！",
    },
    "moduleMigration.msgFetchRemoteAgain": {
        def: "As you may already know, the Tabularium has changed its default behaviour and database structure.\n\nAnd thankfully, with your time and efforts, the remote database appears to have already been migrated. Congratulations!\n\nHowever, we need a bit more. The configuration of this device is not compatible with the remote database. We will need to fetch the remote database again. Should we fetch from the remote again now?\n\n___Note: We cannot synchronise until the configuration has been changed and the database has been fetched again.___\n___Note2: The chunks are completely immutable, we can fetch only the metadata and difference.___",
        la: "Ut fortasse iam scis, Tabularium modum praedefinitum et structuram repositorii mutavit.\n\nEt feliciter, tempore et labore tuo, repositorium remotum iam migratum esse videtur. Gratulamur!\n\nAttamen paulo plus opus est. Configuratio huius instrumenti cum repositorio remoto non congruit. Repositorium remotum iterum arcessere necesse erit. Arcessamusne nunc iterum ex remoto?\n\n___Nota: Synchronizare non possumus donec configuratio mutata et repositorium iterum arcessitum sit.___\n___Nota 2: Fragmenta omnino immutabilia sunt; tantum metadata et differentiam arcessere possumus.___",
        zh: "您可能已经知道,Tabularium 更改了其默认行为和数据库结构。\n\n值得庆幸的是,在您的时间和努力下,远程数据库似乎已经迁移完成。恭喜！\n\n但是,我们还需要一点点操作。此设备的配置与远程数据库不兼容。我们需要再次从远程数据库获取。我们现在应该再次从远程获取吗？\n\n___注意:在更改配置并再次获取数据库之前,我们无法进行同步。___\n___注意2:chunks 是完全不可变的,我们只能获取元数据和差异",
    },
    "moduleMigration.msgSinceV02321": {
        def: "Since v0.23.21, the Tabularium has changed the default behaviour and database structure. The following changes have been made:\n\n1. **Case sensitivity of filenames**\n   The handling of filenames is now case-insensitive. This is a beneficial change for most platforms, other than Linux and iOS, which do not manage filename case sensitivity effectively.\n   (On These, a warning will be displayed for files with the same name but different cases).\n\n2. **Revision handling of the chunks**\n   Chunks are immutable, which allows their revisions to be fixed. This change will enhance the performance of file saving.\n\n___However, to enable either of these changes, both remote and local databases need to be rebuilt. This process takes a few minutes, and we recommend doing it when you have ample time.___\n\n- If you wish to maintain the previous behaviour, you can skip this process by using `${KEEP}`.\n- If you do not have enough time, please choose `${DISMISS}`. You will be prompted again later.\n- If you have rebuilt the database on another device, please select `${DISMISS}` and try synchronizing again. Since a difference has been detected, you will be prompted again.",
        la: "Ab v0.23.21, Tabularium modum praedefinitum et structuram repositorii mutavit. Hae mutationes factae sunt:\n\n1. **Discrimen litterarum maiuscularum in nominibus plicarum**\n   Tractatio nominum plicarum nunc litteras maiusculas et minusculas non discernit. Haec mutatio plerisque suggestibus utilis est, praeter Linux et iOS, quae discrimen litterarum in nominibus plicarum non bene administrant.\n   (In his, monitum monstrabitur pro plicis eodem nomine sed diversis litteris).\n\n2. **Tractatio recensionum fragmentorum**\n   Fragmenta immutabilia sunt, quod sinit recensiones eorum figi. Haec mutatio celeritatem servandi plicas augebit.\n\n___Attamen, ut utramvis harum mutationum actives, repositoria et remotum et locale reaedificanda sunt. Hic processus paucas minutas postulat, et suademus ut id facias cum satis temporis habes.___\n\n- Si modum priorem retinere vis, hunc processum per `${KEEP}` omittere potes.\n- Si satis temporis non habes, quaeso elige `${DISMISS}`. Postea iterum rogaberis.\n- Si repositorium in alio instrumento reaedificavisti, quaeso elige `${DISMISS}` et iterum synchronizare conare. Quia differentia detecta est, iterum rogaberis.",
        zh: "自 v0.23.21 起,Tabularium 更改了默认行为和数据库结构。进行了以下更改：\n\n1. **文件名的区分大小写**\n现在处理文件名时不区分大小写。这对于大多数平台来说是一个有益的更改,除了 Linux 和 iOS,它们不能有效地管理文件名的大小写敏感性。\n(在这些平台上,对于名称相同但大小写不同的文件将显示警告)。\n\n2. **chunks 的版本处理**\nchunks 是不可变的,这使得它们的版本可以固定。此更改将提高文件保存的性能。\n\n___然而,要启用这些更改中的任何一个,都需要重建远程和本地数据库。这个过程需要几分钟,我们建议您在有充足时间时进行。___\n\n- 如果您希望保持以前的行为,可以使用 `${KEEP}` 跳过此过程。\n- 如果您没有足够的时间,请选择 `${DISMISS}`。稍后会再次提示您。\n- 如果您已在另一台设备上重建了数据库,请选择 `${DISMISS}` 并尝试再次同步。由于检测到差异,系统会再次提示您",
    },
    "moduleMigration.optionAdjustRemote": {
        def: "Adjust to remote",
        la: "Accommoda ad remotum",
        zh: "调整到远程设置",
    },
    "moduleMigration.optionDecideLater": {
        def: "Decide it later",
        la: "Postea decerne",
        zh: "稍后决定",
    },
    "moduleMigration.optionEnableBoth": {
        def: "Enable both",
        la: "Activa utrumque",
        zh: "启用两者",
    },
    "moduleMigration.optionEnableFilenameCaseInsensitive": {
        def: "Enable only #1",
        la: "Activa tantum #1",
        zh: "仅启用 #1",
    },
    "moduleMigration.optionEnableFixedRevisionForChunks": {
        def: "Enable only #2",
        la: "Activa tantum #2",
        zh: "仅启用 #2",
    },
    "moduleMigration.optionKeepPreviousBehaviour": {
        def: "Keep previous behaviour",
        la: "Retine modum priorem",
        zh: "保持以前的行为",
    },
    "moduleMigration.optionNoAskAgain": {
        def: "No, please ask again",
        la: "Minime, quaeso iterum roga",
        zh: "不,请稍后再次询问",
    },
    "moduleMigration.optionYesFetchAgain": {
        def: "Yes, fetch again",
        la: "Ita, iterum arcesse",
        zh: "是的,再次获取",
    },
    "moduleMigration.titleCaseSensitivity": {
        def: "Case Sensitivity",
        la: "Discrimen litterarum",
        zh: "大小写敏感性",
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
    "Mostly Complete: Decision Required": {
        def: "Mostly Complete: Decision Required",
        la: "Paene perfectum: decisio requiritur",
        zh: "基本完成：需要你决定",
    },
    "Move remotely deleted files to the trash, instead of deleting.": {
        def: "Move remotely deleted files to the trash, instead of deleting.",
        la: "Plicas remote deletas in quisquilias move, pro eis delendis.",
        zh: "将远程删除的文件移至回收站,而不是直接删除",
    },
    "My remote server is already set up. I want to join this device.": {
        def: "My remote server is already set up. I want to join this device.",
        la: "Ministrator meus remotus iam constitutus est. Hoc instrumentum adiungere volo.",
        zh: "我的远端服务器已设置好，我想让本设备加入。",
    },
    Name: {
        def: "Name",
        la: "Nomen",
        zh: "名称",
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
    "New Remote": {
        def: "New Remote",
        la: "Novum remotum",
        zh: "新建远端",
    },
    "Newer (${diff})": {
        def: "Newer (${diff})",
        la: "Recentior (${diff})",
        zh: "较新（${diff}）",
    },
    Next: {
        def: "Next",
        la: "Sequens",
        zh: "下一步",
    },
    "No checks have been performed yet.": {
        def: "No checks have been performed yet.",
        la: "Nullae probationes adhuc factae sunt.",
        zh: "尚未执行任何检查。",
    },
    "No connected device information found. Cancelling Garbage Collection.": {
        def: "No connected device information found. Cancelling Garbage Collection.",
        la: "Nullae notitiae de instrumentis conexis inventae. Collectio purgamentorum abrogatur.",
        zh: "未找到已连接设备的信息。正在取消垃圾回收。",
    },
    "No Connection": {
        def: "No Connection",
        la: "Nulla conexio",
        zh: "未连接",
    },
    "No devices available. Waiting for other devices to connect...": {
        def: "No devices available. Waiting for other devices to connect...",
        la: "Nulla instrumenta praesto. Exspectatur dum alia instrumenta conectantur...",
        zh: "没有可用的设备。正在等待其他设备连接…",
    },
    "No Items.": {
        def: "No Items.",
        la: "Nulla elementa.",
        zh: "无项目。",
    },
    "No limit configured": {
        def: "No limit configured",
        la: "Nullus limes constitutus",
        zh: "未配置限制",
    },
    "NO PREVIEW": {
        def: "NO PREVIEW",
        la: "NULLA PRAEVISIO",
        zh: "无预览",
    },
    "No, please take me back": {
        def: "No, please take me back",
        la: "Minime, quaeso me reduc",
        zh: "不，返回上一步",
    },
    "Node ID": {
        def: "Node ID",
        la: "ID nodi",
        zh: "节点 ID",
    },
    "Node Information Missing": {
        def: "Node Information Missing",
        la: "Notitiae nodi desunt",
        zh: "节点信息缺失",
    },
    "Non-Synchronising files": {
        def: "Non-Synchronising files",
        la: "Plicae non synchronizandae",
        zh: "不同步的文件",
    },
    "Normal Files": {
        def: "Normal Files",
        la: "Plicae ordinariae",
        zh: "普通文件",
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
    "Not now": {
        def: "Not now",
        la: "Non nunc",
        zh: "暂不",
    },
    "Note that the Group ID is not limited to the generated format; you can use any string as the Group ID.": {
        def: "Note that the Group ID is not limited to the generated format; you can use any string as the Group ID.",
        la: "Nota ID gregis non ad formam generatam limitari; quamlibet catenam litterarum ut ID gregis adhibere potes.",
        zh: "请注意，组 ID 不限于生成的格式；你可以使用任意字符串作为组 ID。",
    },
    'Note that you can generate a new Setup URI by running the "Copy settings as a new Setup URI" command in the command palette.':
        {
            def: 'Note that you can generate a new Setup URI by running the "Copy settings as a new Setup URI" command in the command palette.',
            la: "Nota te novum Setup URI generare posse mandatum “Copy settings as a new Setup URI” in indice mandatorum exsequendo.",
            zh: "请注意，你可以在命令面板中运行「Copy settings as a new Setup URI」命令来生成新的设置 URI。",
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
            la: "Numerus fasciculorum simul tractandorum. Praedefinitum est 40. Minimum est 2. Hoc una cum magnitudine fasciculi moderatur quot documenta simul in memoria teneantur.",
            zh: "一次处理的批量数量。默认为 40。最小为 2。此设置与批量大小一起控制一次在内存中保留多少文档",
        },
    "Number of changes to sync at a time. Defaults to 50. Minimum is 2.": {
        def: "Number of changes to sync at a time. Defaults to 50. Minimum is 2.",
        la: "Numerus mutationum simul synchronizandarum. Praedefinitum est 50. Minimum est 2.",
        zh: "一次同步的更改数量。默认为 50。最小为 2。",
    },
    "Obfuscate Properties": {
        def: "Obfuscate Properties",
        la: "Obscura proprietates",
        zh: "混淆属性",
    },
    "Obfuscating properties (e.g., path of file, size, creation and modification dates) adds an additional layer of security by making it harder to identify the structure and names of your files and folders on the remote server. This helps protect your privacy and makes it more difficult for unauthorized users to infer information about your data.":
        {
            def: "Obfuscating properties (e.g., path of file, size, creation and modification dates) adds an additional layer of security by making it harder to identify the structure and names of your files and folders on the remote server. This helps protect your privacy and makes it more difficult for unauthorized users to infer information about your data.",
            la: "Proprietates obscurare (e.g., viam plicae, magnitudinem, dies creationis et mutationis) gradum securitatis addit, quia difficilius fit structuram et nomina plicarum thecarumque tuarum in ministratore remoto agnoscere. Hoc secretum tuum tuetur et usoribus non permissis difficilius reddit aliquid de datis tuis colligere.",
            zh: "混淆属性（例如文件路径、大小、创建和修改日期）通过让远端服务器上更难识别你文件和文件夹的结构与名称，增加了一层额外的安全保障。这有助于保护你的隐私，也让未授权用户更难推断出关于你数据的信息。",
        },
    "Obsidian version": {
        def: "Obsidian version",
        la: "Versio Obsidian",
        zh: "Obsidian 版本",
    },
    "obsidianLiveSyncSettingTab.btnApply": {
        def: "Apply",
        la: "Adhibe",
        zh: "应用",
    },
    "obsidianLiveSyncSettingTab.btnCheck": {
        def: "Check",
        la: "Inspice",
        zh: "检查",
    },
    "obsidianLiveSyncSettingTab.btnCopy": {
        def: "Copy",
        la: "Exscribe",
        zh: "复制",
    },
    "obsidianLiveSyncSettingTab.btnDisable": {
        def: "Disable",
        la: "Deactiva",
        zh: "禁用",
    },
    "obsidianLiveSyncSettingTab.btnDiscard": {
        def: "Discard",
        la: "Abice",
        zh: "丢弃",
    },
    "obsidianLiveSyncSettingTab.btnEnable": {
        def: "Enable",
        la: "Activa",
        zh: "启用",
    },
    "obsidianLiveSyncSettingTab.btnFix": {
        def: "Fix",
        la: "Corrige",
        zh: "修复",
    },
    "obsidianLiveSyncSettingTab.btnGotItAndUpdated": {
        def: "I got it and updated.",
        la: "Intellexi et renovavi.",
        zh: "我明白了并且已更新",
    },
    "obsidianLiveSyncSettingTab.btnStart": {
        def: "Start",
        la: "Incipe",
        zh: "开始",
    },
    "obsidianLiveSyncSettingTab.btnTest": {
        def: "Test",
        la: "Proba",
        zh: "测试",
    },
    "obsidianLiveSyncSettingTab.btnUse": {
        def: "Use",
        la: "Utere",
        zh: "使用",
    },
    "obsidianLiveSyncSettingTab.buttonFetch": {
        def: "Fetch",
        la: "Arcesse",
        zh: "获取",
    },
    "obsidianLiveSyncSettingTab.defaultLanguage": {
        def: "Default",
        la: "Praedefinitum",
        zh: "默认语言",
    },
    "obsidianLiveSyncSettingTab.descConnectSetupURI": {
        def: "This is the recommended method to set up Self-hosted Tabularium with a Setup URI.",
        la: "Haec est ratio commendata Tabularium per Setup URI constituendi.",
        zh: "这是使用设置 URI 设置 Tabularium 的推荐方法",
    },
    "obsidianLiveSyncSettingTab.descCopySetupURI": {
        def: "Perfect for setting up a new device!",
        la: "Aptissimum ad novum instrumentum constituendum!",
        zh: "非常适合设置新设备！",
    },
    "obsidianLiveSyncSettingTab.descEnableLiveSync": {
        def: "Only enable this after configuring either of the above two options or completing all configuration manually.",
        la: "Hoc tantum activa postquam alterutram ex duabus optionibus supra configuraveris vel omnem configurationem manu perfeceris.",
        zh: "仅在配置了上述两个选项之一或手动完成所有配置后启用此选项",
    },
    "obsidianLiveSyncSettingTab.descFetchConfigFromRemote": {
        def: "Fetch necessary settings from already configured remote server.",
        la: "Arcesse optiones necessarias ex ministratore remoto iam configurato.",
        zh: "从已配置的远程服务器获取必要的设置",
    },
    "obsidianLiveSyncSettingTab.descManualSetup": {
        def: "Not recommended, but useful if you don't have a Setup URI",
        la: "Non commendatur, sed utile si Setup URI non habes",
        zh: "不推荐,但如果您没有设置 URI 则很有用",
    },
    "obsidianLiveSyncSettingTab.descTestDatabaseConnection": {
        def: "Open database connection. If the remote database is not found and you have permission to create a database, the database will be created.",
        la: "Aperi conexionem repositorii. Si repositorium remotum non invenitur et licentiam repositorium creandi habes, repositorium creabitur.",
        zh: "打开数据库连接。如果未找到远程数据库并且您有创建数据库的权限,则将创建数据库",
    },
    "obsidianLiveSyncSettingTab.descValidateDatabaseConfig": {
        def: "Checks and fixes any potential issues with the database config.",
        la: "Inspicit et corrigit quaslibet difficultates in configuratione repositorii.",
        zh: "检查并修复数据库配置中的任何潜在问题",
    },
    "obsidianLiveSyncSettingTab.errAccessForbidden": {
        def: "✗ Access forbidden.",
        la: "✗ Accessus vetitus.",
        zh: "✗ 访问被禁止。",
    },
    "obsidianLiveSyncSettingTab.errCannotContinueTest": {
        def: "We could not continue the test.",
        la: "Probationem continuare non potuimus.",
        zh: "我们无法继续测试。",
    },
    "obsidianLiveSyncSettingTab.errCorsCredentials": {
        def: "✗ cors.credentials is wrong",
        la: "✗ cors.credentials falsum est",
        zh: "✗ cors.credentials 设置有误",
    },
    "obsidianLiveSyncSettingTab.errCorsNotAllowingCredentials": {
        def: "✗ CORS is not allowing credentials",
        la: "✗ CORS testimonia non permittit",
        zh: "✗ CORS 不允许凭据",
    },
    "obsidianLiveSyncSettingTab.errCorsOrigins": {
        def: "✗ cors.origins is wrong",
        la: "✗ cors.origins falsum est",
        zh: "✗ cors.origins 设置有误",
    },
    "obsidianLiveSyncSettingTab.errEnableCors": {
        def: "✗ httpd.enable_cors is wrong",
        la: "✗ httpd.enable_cors falsum est",
        zh: "✗ httpd.enable_cors 设置有误",
    },
    "obsidianLiveSyncSettingTab.errEnableCorsChttpd": {
        def: "✗ chttpd.enable_cors is wrong",
        la: "✗ chttpd.enable_cors falsum est",
        zh: "✗ chttpd.enable_cors 设置有误",
    },
    "obsidianLiveSyncSettingTab.errMaxDocumentSize": {
        def: "✗ couchdb.max_document_size is low)",
        la: "✗ couchdb.max_document_size nimis parvum est)",
        zh: "✗ couchdb.max_document_size 过低）",
    },
    "obsidianLiveSyncSettingTab.errMaxRequestSize": {
        def: "✗ chttpd.max_http_request_size is low)",
        la: "✗ chttpd.max_http_request_size nimis parvum est)",
        zh: "✗ chttpd.max_http_request_size 过低）",
    },
    "obsidianLiveSyncSettingTab.errMissingWwwAuth": {
        def: "✗ httpd.WWW-Authenticate is missing",
        la: "✗ httpd.WWW-Authenticate deest",
        zh: "✗ 缺少 httpd.WWW-Authenticate",
    },
    "obsidianLiveSyncSettingTab.errRequireValidUser": {
        def: "✗ chttpd.require_valid_user is wrong.",
        la: "✗ chttpd.require_valid_user falsum est.",
        zh: "✗ chttpd.require_valid_user 设置有误。",
    },
    "obsidianLiveSyncSettingTab.errRequireValidUserAuth": {
        def: "✗ chttpd_auth.require_valid_user is wrong.",
        la: "✗ chttpd_auth.require_valid_user falsum est.",
        zh: "✗ chttpd_auth.require_valid_user 设置有误。",
    },
    "obsidianLiveSyncSettingTab.labelDisabled": {
        def: "Status: Disabled",
        la: "Status: Deactivatum",
        zh: "状态：已停用",
    },
    "obsidianLiveSyncSettingTab.labelEnabled": {
        def: "Status: Enabled",
        la: "Status: Activum",
        zh: "状态：已启用",
    },
    "obsidianLiveSyncSettingTab.levelAdvanced": {
        def: " (Advanced)",
        la: " (Provectum)",
        zh: "(进阶)",
    },
    "obsidianLiveSyncSettingTab.levelEdgeCase": {
        def: " (Edge Case)",
        la: " (Casus rarus)",
        zh: "(边缘情况)",
    },
    "obsidianLiveSyncSettingTab.levelPowerUser": {
        def: " (Power User)",
        la: " (Usor peritus)",
        zh: "(高级用户)",
    },
    "obsidianLiveSyncSettingTab.linkOpenInBrowser": {
        def: "Open in browser",
        la: "Aperi in navigatro",
        zh: "在浏览器中打开",
    },
    "obsidianLiveSyncSettingTab.linkPageTop": {
        def: "Page Top",
        la: "Summa pagina",
        zh: "页面顶部",
    },
    "obsidianLiveSyncSettingTab.linkTipsAndTroubleshooting": {
        def: "Tips and Troubleshooting",
        la: "Consilia et solutio difficultatum",
        zh: "提示和故障排除",
    },
    "obsidianLiveSyncSettingTab.linkTroubleshooting": {
        def: "/docs/troubleshooting.md",
        la: "/docs/troubleshooting.md",
        zh: "/docs/troubleshooting.md",
    },
    "obsidianLiveSyncSettingTab.logCannotUseCloudant": {
        def: "This feature cannot be used with IBM Cloudant.",
        la: "Haec facultas cum IBM Cloudant adhiberi non potest.",
        zh: "此功能不能与 IBM Cloudant 一起使用 ",
    },
    "obsidianLiveSyncSettingTab.logCheckingConfigDone": {
        def: "Checking configuration done",
        la: "Inspectio configurationis perfecta",
        zh: "配置检查完成",
    },
    "obsidianLiveSyncSettingTab.logCheckingConfigFailed": {
        def: "Checking configuration failed",
        la: "Inspectio configurationis defecit",
        zh: "配置检查失败",
    },
    "obsidianLiveSyncSettingTab.logCheckingDbConfig": {
        def: "Checking database configuration",
        la: "Configuratio repositorii inspicitur",
        zh: "正在检查数据库配置",
    },
    "obsidianLiveSyncSettingTab.logCheckPassphraseFailed": {
        def: "ERROR: Failed to check passphrase with the remote server:\n${db}.",
        la: "ERROR: Tessera arcana cum ministratore remoto inspici non potuit:\n${db}.",
        zh: "错误：无法使用远程服务器检查密码：\n${db}",
    },
    "obsidianLiveSyncSettingTab.logConfiguredDisabled": {
        def: "Configured synchronization mode: DISABLED",
        la: "Modus synchronizationis configuratus: DEACTIVATUS",
        zh: "已配置的同步模式：已禁用",
    },
    "obsidianLiveSyncSettingTab.logConfiguredLiveSync": {
        def: "Configured synchronization mode: live sync",
        la: "Modus synchronizationis configuratus: synchronizatio viva",
        zh: "已配置的同步模式：实时同步",
    },
    "obsidianLiveSyncSettingTab.logConfiguredPeriodic": {
        def: "Configured synchronization mode: Periodic",
        la: "Modus synchronizationis configuratus: Periodicus",
        zh: "已配置的同步模式：定期同步",
    },
    "obsidianLiveSyncSettingTab.logCouchDbConfigFail": {
        def: "CouchDB Configuration: ${title} failed",
        la: "Configuratio CouchDB: ${title} defecit",
        zh: "CouchDB 配置：${title} 失败",
    },
    "obsidianLiveSyncSettingTab.logCouchDbConfigSet": {
        def: "CouchDB Configuration: ${title} -> Set ${key} to ${value}",
        la: "Configuratio CouchDB: ${title} -> Pone ${key} ad ${value}",
        zh: "CouchDB 配置：${title} -> 设置 ${key} 为 ${value}",
    },
    "obsidianLiveSyncSettingTab.logCouchDbConfigUpdated": {
        def: "CouchDB Configuration: ${title} successfully updated",
        la: "Configuratio CouchDB: ${title} feliciter renovata",
        zh: "CouchDB 配置：${title} 成功更新",
    },
    "obsidianLiveSyncSettingTab.logDatabaseConnected": {
        def: "Database connected",
        la: "Repositorium conexum",
        zh: "数据库已连接",
    },
    "obsidianLiveSyncSettingTab.logEncryptionNoPassphrase": {
        def: "You cannot enable encryption without a passphrase",
        la: "Cryptationem sine tessera arcana activare non potes",
        zh: "没有密码无法启用加密",
    },
    "obsidianLiveSyncSettingTab.logEncryptionNoSupport": {
        def: "Your device does not support encryption.",
        la: "Instrumentum tuum cryptationem non sustinet.",
        zh: "您的设备不支持加密 ",
    },
    "obsidianLiveSyncSettingTab.logErrorOccurred": {
        def: "An error occurred!!",
        la: "Error accidit!!",
        zh: "发生错误！！",
    },
    "obsidianLiveSyncSettingTab.logEstimatedSize": {
        def: "Estimated size: ${size}",
        la: "Magnitudo aestimata: ${size}",
        zh: "估计大小：${size}",
    },
    "obsidianLiveSyncSettingTab.logPassphraseInvalid": {
        def: "Passphrase is not valid, please fix it.",
        la: "Tessera arcana non valida est; quaeso eam corrige.",
        zh: "密码无效,请修正",
    },
    "obsidianLiveSyncSettingTab.logPassphraseNotCompatible": {
        def: "ERROR: Passphrase is not compatible with the remote server! Please check it again!",
        la: "ERROR: Tessera arcana cum ministratore remoto non congruit! Quaeso eam iterum inspice!",
        zh: "错误：密码与远程服务器不兼容！请再次检查！",
    },
    "obsidianLiveSyncSettingTab.logRebuildNote": {
        def: "Syncing has been disabled, fetch and re-enabled if desired.",
        la: "Synchronizatio deactivata est; arcesse et, si vis, iterum activa.",
        zh: "同步已禁用,如果需要,请获取并重新启用",
    },
    "obsidianLiveSyncSettingTab.logSelectAnyPreset": {
        def: "Select any preset.",
        la: "Elige quodlibet praeformatum.",
        zh: "请选择任一预设。",
    },
    "obsidianLiveSyncSettingTab.logServerConfigurationCheck": {
        def: "Server configuration check",
        la: "Inspectio configurationis ministratoris",
        zh: "服务器配置检查",
    },
    "obsidianLiveSyncSettingTab.msgAreYouSureProceed": {
        def: "Are you sure to proceed?",
        la: "Certusne es te pergere velle?",
        zh: "您确定要继续吗？",
    },
    "obsidianLiveSyncSettingTab.msgChangesNeedToBeApplied": {
        def: "Changes need to be applied!",
        la: "Mutationes adhibendae sunt!",
        zh: "需要应用更改！",
    },
    "obsidianLiveSyncSettingTab.msgConfigCheck": {
        def: "--Config check--",
        la: "--Inspectio configurationis--",
        zh: "--配置检查--",
    },
    "obsidianLiveSyncSettingTab.msgConfigCheckFailed": {
        def: "The configuration check has failed. Do you want to continue anyway?",
        la: "Inspectio configurationis defecit. Visne nihilominus pergere?",
        zh: "配置检查失败。仍要继续吗？",
    },
    "obsidianLiveSyncSettingTab.msgConnectionCheck": {
        def: "--Connection check--",
        la: "--Inspectio conexionis--",
        zh: "--连接检查--",
    },
    "obsidianLiveSyncSettingTab.msgConnectionProxyNote": {
        def: "If you're having trouble with the Connection-check (even after checking config), please check your reverse proxy configuration.",
        la: "Si difficultates cum inspectione conexionis habes (etiam post configurationem inspectam), quaeso configurationem procuratoris inversi (reverse proxy) inspice.",
        zh: "如果您在连接检查时遇到问题(即使检查了配置后),请检查您的反向代理配置",
    },
    "obsidianLiveSyncSettingTab.msgCurrentOrigin": {
        def: "Current origin: ${origin}",
        la: "Origo praesens: ${origin}",
        zh: "当前源: {origin}",
    },
    "obsidianLiveSyncSettingTab.msgDiscardConfirmation": {
        def: "Do you really want to discard existing settings and databases?",
        la: "Visne vere optiones et repositoria exstantia abicere?",
        zh: "您真的要丢弃现有的设置和数据库吗？",
    },
    "obsidianLiveSyncSettingTab.msgDone": {
        def: "--Done--",
        la: "--Factum--",
        zh: "--完成--",
    },
    "obsidianLiveSyncSettingTab.msgEnableCors": {
        def: "Set httpd.enable_cors",
        la: "Pone httpd.enable_cors",
        zh: "设置 httpd.enable_cors",
    },
    "obsidianLiveSyncSettingTab.msgEnableCorsChttpd": {
        def: "Set chttpd.enable_cors",
        la: "Pone chttpd.enable_cors",
        zh: "设置 chttpd.enable_cors",
    },
    "obsidianLiveSyncSettingTab.msgEnableEncryptionRecommendation": {
        def: "We recommend enabling End-To-End Encryption, and Path Obfuscation. Are you sure you want to continue without encryption?",
        la: "Cryptationem ab extremo ad extremum et obscurationem viarum activare suademus. Certusne es te sine cryptatione pergere velle?",
        zh: "建议启用端到端加密和路径混淆。你确定要在未加密的情况下继续吗？",
    },
    "obsidianLiveSyncSettingTab.msgFetchConfigFromRemote": {
        def: "Do you want to fetch the config from the remote server?",
        la: "Visne configurationem ex ministratore remoto arcessere?",
        zh: "要从远端服务器获取配置吗？",
    },
    "obsidianLiveSyncSettingTab.msgIfConfigNotPersistent": {
        def: "If the server configuration is not persistent (e.g., running on docker), the values here may change. Once you are able to connect, please update the settings in the server's local.ini.",
        la: "Si configuratio ministratoris non perpetua est (e.g., in docker currens), valores hic mutari possunt. Simul ac conecti poteris, quaeso optiones in local.ini ministratoris renova.",
        zh: "如果服务器配置不是持久的(例如,在 docker 上运行),此处的值可能会更改。一旦能够连接,请更新服务器 local.ini 中的设置",
    },
    "obsidianLiveSyncSettingTab.msgInvalidPassphrase": {
        def: "Your encryption passphrase might be invalid. Are you sure you want to continue?",
        la: "Tessera arcana cryptationis tua fortasse non valida est. Certusne es te pergere velle?",
        zh: "你的加密密码短语可能无效。你确定要继续吗？",
    },
    "obsidianLiveSyncSettingTab.msgNewVersionNote": {
        def: "Here due to an upgrade notification? Please review the version history. If you're satisfied, click the button. A new update will prompt this again.",
        la: "Hic propter notificationem renovationis? Quaeso historiam versionum recense. Si contentus es, preme puncto. Nova renovatio hoc iterum rogabit.",
        zh: "因为升级通知来到这里？请查看版本历史。如果您满意,请点击按钮。新的更新将再次提示此信息",
    },
    "obsidianLiveSyncSettingTab.msgNonHTTPSInfo": {
        def: "Configured as non-HTTPS URI. Be warned that this may not work on mobile devices.",
        la: "Ut URI sine HTTPS configuratum. Cave ne hoc in instrumentis mobilibus non funget.",
        zh: "配置为非 HTTPS URI。请注意,这可能在移动设备上无法工作",
    },
    "obsidianLiveSyncSettingTab.msgNonHTTPSWarning": {
        def: "Cannot connect to non-HTTPS URI. Please update your config and try again.",
        la: "Ad URI sine HTTPS conecti non potest. Quaeso configurationem tuam renova et iterum conare.",
        zh: "无法连接到非 HTTPS URI。请更新您的配置并重试",
    },
    "obsidianLiveSyncSettingTab.msgNotice": {
        def: "---Notice---",
        la: "---Nota---",
        zh: "---注意---",
    },
    "obsidianLiveSyncSettingTab.msgObjectStorageWarning": {
        def: "WARNING: This feature is a Work In Progress, so please keep in mind the following:\n- Append only architecture. A rebuild is required to shrink the storage.\n- A bit fragile.\n- When first syncing, all history will be transferred from the remote. Be mindful of data caps and slow speeds.\n- Only differences are synced live.\n\nIf you run into any issues, or have ideas about this feature, please create a issue on GitHub.\nI appreciate you for your great dedication.",
        la: "MONITUM: Haec facultas adhuc in opere est; quaeso haec memento:\n- Architectura tantum addendi. Reaedificatio necessaria est ut repositorium contrahatur.\n- Aliquantum fragilis.\n- Prima synchronizatione, tota historia ex remoto transferetur. Memento limitum datorum et celeritatis tardae.\n- Tantum differentiae continue synchronizantur.\n\nSi in difficultates incidis, aut ideas de hac facultate habes, quaeso quaestionem (issue) in GitHub crea.\nTibi pro magna tua diligentia gratias ago.",
        zh: "警告：此功能仍在开发中,请注意以下几点：\n- 仅追加架构。需要重建才能缩小存储空间。\n- 有点脆弱。\n- 首次同步时,所有历史记录将从远程传输。注意数据上限和慢速。\n- 只有差异会实时同步。\n\n如果您遇到任何问题,或对此功能有任何想法,请在 GitHub 上创建 issue。\n感谢您的巨大贡献",
    },
    "obsidianLiveSyncSettingTab.msgOriginCheck": {
        def: "Origin check: ${org}",
        la: "Inspectio originis: ${org}",
        zh: "源检查: {org}",
    },
    "obsidianLiveSyncSettingTab.msgRebuildRequired": {
        def: "Rebuilding Databases are required to apply the changes.. Please select the method to apply the changes.\n\n<details>\n<summary>Legends</summary>\n\n| Symbol | Meaning |\n|: ------ :| ------- |\n| ⇔ | Up to Date |\n| ⇄ | Synchronise to balance |\n| ⇐,⇒ | Transfer to overwrite |\n| ⇠,⇢ | Transfer to overwrite from other side |\n\n</details>\n\n## ${OPTION_REBUILD_BOTH}\nAt a glance: Files ⇒¹ Local DB ⇒² Remote ⇢ⁿ Local DB ⇄ⁿ⁺¹ Files\nReconstruct both the local and remote databases using existing files from this device.\nThis causes a lockout other devices, and they need to perform fetching.\n## ${OPTION_FETCH}\nAt a glance: Files ⇄² Local DB ⇐¹ Remote ⇔ Local DB ⇔ Files\nInitialise the local database and reconstruct it using data fetched from the remote database.\nThis case includes the case which you have rebuilt the remote database.\n## ${OPTION_ONLY_SETTING}\nStore only the settings. **Caution: This may lead to data corruption**; database reconstruction is generally necessary.",
        la: "Repositoria reaedificanda sunt ut mutationes applicentur.. Quaeso modum elige quo mutationes applicentur.\n\n<details>\n<summary>Legenda</summary>\n\n| Signum | Significatio |\n|: ------ :| ------- |\n| ⇔ | Recens |\n| ⇄ | Synchroniza ad aequandum |\n| ⇐,⇒ | Transfer ad superscribendum |\n| ⇠,⇢ | Transfer ad superscribendum ex altera parte |\n\n</details>\n\n## ${OPTION_REBUILD_BOTH}\nUno conspectu: Plicae ⇒¹ Repositorium locale ⇒² Remotum ⇢ⁿ Repositorium locale ⇄ⁿ⁺¹ Plicae\nRepositoria et localia et remota ex plicis exstantibus huius instrumenti reconstrue.\nHoc alia instrumenta excludit, quae arcessere debebunt.\n## ${OPTION_FETCH}\nUno conspectu: Plicae ⇄² Repositorium locale ⇐¹ Remotum ⇔ Repositorium locale ⇔ Plicae\nRepositorium locale initia et ex datis a repositorio remoto arcessitis reconstrue.\nHic casus etiam casum includit quo repositorium remotum reaedificavisti.\n## ${OPTION_ONLY_SETTING}\nOptiones tantum serva. **Cautio: Hoc ad data corrupta ducere potest**; reconstructio repositorii plerumque necessaria est.",
        zh: "需要重建数据库才能应用这些更改。请选择应用更改的方式。\n\n<details>\n<summary>图例</summary>\n\n| 符号 | 含义 |\n|: ------ :| ------- |\n| ⇔ | 已是最新 |\n| ⇄ | 双向同步以达成一致 |\n| ⇐,⇒ | 传输并覆盖 |\n| ⇠,⇢ | 从另一端传输并覆盖 |\n\n</details>\n\n## ${OPTION_REBUILD_BOTH}\n概览：文件 ⇒¹ 本地数据库 ⇒² 远程 ⇢ⁿ 本地数据库 ⇄ⁿ⁺¹ 文件\n使用此设备上的现有文件重建本地和远程数据库。\n这会锁定其他设备，它们需要执行获取。\n## ${OPTION_FETCH}\n概览：文件 ⇄² 本地数据库 ⇐¹ 远程 ⇔ 本地数据库 ⇔ 文件\n初始化本地数据库，并使用从远程数据库获取的数据重建它。\n如果你已经重建了远程数据库，也属于这种情况。\n## ${OPTION_ONLY_SETTING}\n仅保存设置。**注意：这可能导致数据损坏**；通常需要重建数据库。",
    },
    "obsidianLiveSyncSettingTab.msgSetCorsCredentials": {
        def: "Set cors.credentials",
        la: "Pone cors.credentials",
        zh: "设置 cors.credentials",
    },
    "obsidianLiveSyncSettingTab.msgSetCorsOrigins": {
        def: "Set cors.origins",
        la: "Pone cors.origins",
        zh: "设置 cors.origins",
    },
    "obsidianLiveSyncSettingTab.msgSetMaxDocSize": {
        def: "Set couchdb.max_document_size",
        la: "Pone couchdb.max_document_size",
        zh: "设置 couchdb.max_document_size",
    },
    "obsidianLiveSyncSettingTab.msgSetMaxRequestSize": {
        def: "Set chttpd.max_http_request_size",
        la: "Pone chttpd.max_http_request_size",
        zh: "设置 chttpd.max_http_request_size",
    },
    "obsidianLiveSyncSettingTab.msgSetRequireValidUser": {
        def: "Set chttpd.require_valid_user = true",
        la: "Pone chttpd.require_valid_user = true",
        zh: "设置 chttpd.require_valid_user = true",
    },
    "obsidianLiveSyncSettingTab.msgSetRequireValidUserAuth": {
        def: "Set chttpd_auth.require_valid_user = true",
        la: "Pone chttpd_auth.require_valid_user = true",
        zh: "设置 chttpd_auth.require_valid_user = true",
    },
    "obsidianLiveSyncSettingTab.msgSettingModified": {
        def: 'The setting "${setting}" was modified from another device. Click {HERE} to reload settings. Click elsewhere to ignore changes.',
        la: "Optio “${setting}” ex alio instrumento mutata est. Preme {HERE} ut optiones iterum oneres. Alibi preme ut mutationes neglegas.",
        zh: '设置 "${setting}" 已从另一台设备修改。点击 {HERE} 重新加载设置。点击其他地方忽略更改',
    },
    "obsidianLiveSyncSettingTab.msgSettingsUnchangeableDuringSync": {
        def: 'These settings are unable to be changed during synchronization. Please disable all syncing in the "Sync Settings" to unlock.',
        la: "Hae optiones dum synchronizatio fit mutari non possunt. Quaeso omnem synchronizationem in “Optionibus synchronizationis” deactiva ut eas reseres.",
        zh: "这些设置在同步期间无法更改。请在“同步设置”中禁用所有同步以解锁",
    },
    "obsidianLiveSyncSettingTab.msgSetWwwAuth": {
        def: "Set httpd.WWW-Authenticate",
        la: "Pone httpd.WWW-Authenticate",
        zh: "设置 httpd.WWW-Authenticate",
    },
    "obsidianLiveSyncSettingTab.nameApplySettings": {
        def: "Apply Settings",
        la: "Adhibe optiones",
        zh: "应用设置",
    },
    "obsidianLiveSyncSettingTab.nameConnectSetupURI": {
        def: "Connect with Setup URI",
        la: "Conecte per Setup URI",
        zh: "使用设置 URI 连接",
    },
    "obsidianLiveSyncSettingTab.nameCopySetupURI": {
        def: "Copy the current settings to a Setup URI",
        la: "Exscribe optiones praesentes in Setup URI",
        zh: "将当前设置复制为设置 URI",
    },
    "obsidianLiveSyncSettingTab.nameDisableHiddenFileSync": {
        def: "Disable Hidden files sync",
        la: "Deactiva synchronizationem plicarum occultarum",
        zh: "禁用隐藏文件同步",
    },
    "obsidianLiveSyncSettingTab.nameDiscardSettings": {
        def: "Discard existing settings and databases",
        la: "Abice optiones et repositoria exstantia",
        zh: "丢弃现有设置和数据库",
    },
    "obsidianLiveSyncSettingTab.nameEnableHiddenFileSync": {
        def: "Enable Hidden files sync",
        la: "Activa synchronizationem plicarum occultarum",
        zh: "启用隐藏文件同步",
    },
    "obsidianLiveSyncSettingTab.nameEnableLiveSync": {
        def: "Enable live sync",
        la: "Activa synchronizationem vivam",
        zh: "启用实时同步",
    },
    "obsidianLiveSyncSettingTab.nameHiddenFileSynchronization": {
        def: "Hidden file synchronization",
        la: "Synchronizatio plicarum occultarum",
        zh: "隐藏文件同步",
    },
    "obsidianLiveSyncSettingTab.nameManualSetup": {
        def: "Manual Setup",
        la: "Constitutio manualis",
        zh: "手动设置",
    },
    "obsidianLiveSyncSettingTab.nameTestConnection": {
        def: "Test Connection",
        la: "Proba conexionem",
        zh: "测试连接",
    },
    "obsidianLiveSyncSettingTab.nameTestDatabaseConnection": {
        def: "Test Database Connection",
        la: "Proba conexionem repositorii",
        zh: "测试数据库连接",
    },
    "obsidianLiveSyncSettingTab.nameValidateDatabaseConfig": {
        def: "Validate Database Configuration",
        la: "Confirma configurationem repositorii",
        zh: "验证数据库配置",
    },
    "obsidianLiveSyncSettingTab.okAdminPrivileges": {
        def: "✓ You have administrator privileges.",
        la: "✓ Privilegia administratoris habes.",
        zh: "✓ 你拥有管理员权限。",
    },
    "obsidianLiveSyncSettingTab.okCorsCredentials": {
        def: "✓ cors.credentials is ok.",
        la: "✓ cors.credentials rectum est.",
        zh: "✓ cors.credentials 正常。",
    },
    "obsidianLiveSyncSettingTab.okCorsCredentialsForOrigin": {
        def: "CORS credentials OK",
        la: "Testimonia CORS recta",
        zh: "CORS 凭据正常",
    },
    "obsidianLiveSyncSettingTab.okCorsOriginMatched": {
        def: "✓ CORS origin OK",
        la: "✓ Origo CORS recta",
        zh: "✓ CORS 来源正常",
    },
    "obsidianLiveSyncSettingTab.okCorsOrigins": {
        def: "✓ cors.origins is ok.",
        la: "✓ cors.origins rectum est.",
        zh: "✓ cors.origins 正常。",
    },
    "obsidianLiveSyncSettingTab.okEnableCors": {
        def: "✓ httpd.enable_cors is ok.",
        la: "✓ httpd.enable_cors rectum est.",
        zh: "✓ httpd.enable_cors 正常。",
    },
    "obsidianLiveSyncSettingTab.okEnableCorsChttpd": {
        def: "✓ chttpd.enable_cors is ok.",
        la: "✓ chttpd.enable_cors rectum est.",
        zh: "✓ chttpd.enable_cors 正常。",
    },
    "obsidianLiveSyncSettingTab.okMaxDocumentSize": {
        def: "✓ couchdb.max_document_size is ok.",
        la: "✓ couchdb.max_document_size rectum est.",
        zh: "✓ couchdb.max_document_size 正常。",
    },
    "obsidianLiveSyncSettingTab.okMaxRequestSize": {
        def: "✓ chttpd.max_http_request_size is ok.",
        la: "✓ chttpd.max_http_request_size rectum est.",
        zh: "✓ chttpd.max_http_request_size 正常。",
    },
    "obsidianLiveSyncSettingTab.okRequireValidUser": {
        def: "✓ chttpd.require_valid_user is ok.",
        la: "✓ chttpd.require_valid_user rectum est.",
        zh: "✓ chttpd.require_valid_user 正常。",
    },
    "obsidianLiveSyncSettingTab.okRequireValidUserAuth": {
        def: "✓ chttpd_auth.require_valid_user is ok.",
        la: "✓ chttpd_auth.require_valid_user rectum est.",
        zh: "✓ chttpd_auth.require_valid_user 正常。",
    },
    "obsidianLiveSyncSettingTab.okWwwAuth": {
        def: "✓ httpd.WWW-Authenticate is ok.",
        la: "✓ httpd.WWW-Authenticate rectum est.",
        zh: "✓ httpd.WWW-Authenticate 正常。",
    },
    "obsidianLiveSyncSettingTab.optionApply": {
        def: "Apply",
        la: "Adhibe",
        zh: "应用",
    },
    "obsidianLiveSyncSettingTab.optionCancel": {
        def: "Cancel",
        la: "Abroga",
        zh: "取消",
    },
    "obsidianLiveSyncSettingTab.optionCouchDB": {
        def: "CouchDB",
        la: "CouchDB",
        zh: "CouchDB",
    },
    "obsidianLiveSyncSettingTab.optionDisableAllAutomatic": {
        def: "Disable all automatic",
        la: "Deactiva omnia automatica",
        zh: "禁用所有自动同步",
    },
    "obsidianLiveSyncSettingTab.optionFetchFromRemote": {
        def: "Fetch from Remote",
        la: "Arcesse ex remoto",
        zh: "从远程获取",
    },
    "obsidianLiveSyncSettingTab.optionHere": {
        def: "HERE",
        la: "HIC",
        zh: "这里",
    },
    "obsidianLiveSyncSettingTab.optionLiveSync": {
        def: "Live sync",
        la: "Synchronizatio viva",
        zh: "实时同步",
    },
    "obsidianLiveSyncSettingTab.optionMinioS3R2": {
        def: "Minio,S3,R2",
        la: "Minio,S3,R2",
        zh: "Minio, S3, R2",
    },
    "obsidianLiveSyncSettingTab.optionOkReadEverything": {
        def: "OK, I have read everything.",
        la: "Bene, omnia legi.",
        zh: "好的,我已经阅读了所有内容 ",
    },
    "obsidianLiveSyncSettingTab.optionOnEvents": {
        def: "On events",
        la: "Ad eventus",
        zh: "事件触发时",
    },
    "obsidianLiveSyncSettingTab.optionPeriodicAndEvents": {
        def: "Periodic and on events",
        la: "Periodice et ad eventus",
        zh: "定期与事件触发",
    },
    "obsidianLiveSyncSettingTab.optionPeriodicWithBatch": {
        def: "Periodic w/ batch",
        la: "Periodice cum fasciculis",
        zh: "定期（批处理）",
    },
    "obsidianLiveSyncSettingTab.optionRebuildBoth": {
        def: "Rebuild Both from This Device",
        la: "Reaedifica utrumque ex hoc instrumento",
        zh: "从此设备重建两者",
    },
    "obsidianLiveSyncSettingTab.optionSaveOnlySettings": {
        def: "(Danger) Save Only Settings",
        la: "(Periculum) Serva tantum optiones",
        zh: "(危险)仅保存设置",
    },
    "obsidianLiveSyncSettingTab.panelAdvanced": {
        def: "Advanced",
        la: "Provecta",
        zh: "高级",
    },
    "obsidianLiveSyncSettingTab.panelChangeLog": {
        def: "Change Log",
        la: "Index mutationum",
        zh: "更新日志",
    },
    "obsidianLiveSyncSettingTab.panelCustomisationSync": {
        def: "Customisation sync",
        la: "Synchronizatio optionum propriarum",
        zh: "自定义同步",
    },
    "obsidianLiveSyncSettingTab.panelGeneralSettings": {
        def: "General Settings",
        la: "Optiones generales",
        zh: "常规设置",
    },
    "obsidianLiveSyncSettingTab.panelHatch": {
        def: "Hatch",
        la: "Hatch",
        zh: "Hatch",
    },
    "obsidianLiveSyncSettingTab.panelMaintenance": {
        def: "Maintenance",
        la: "Conservatio",
        zh: "维护",
    },
    "obsidianLiveSyncSettingTab.panelPatches": {
        def: "Patches",
        la: "Emendationes",
        zh: "补丁",
    },
    "obsidianLiveSyncSettingTab.panelPowerUsers": {
        def: "Power users",
        la: "Usores periti",
        zh: "专家",
    },
    "obsidianLiveSyncSettingTab.panelPrivacyEncryption": {
        def: "Privacy & Encryption",
        la: "Secretum et cryptatio",
        zh: "隐私与加密",
    },
    "obsidianLiveSyncSettingTab.panelRemoteConfiguration": {
        def: "Remote Configuration",
        la: "Configuratio remoti",
        zh: "远程配置",
    },
    "obsidianLiveSyncSettingTab.panelSelector": {
        def: "Selector",
        la: "Electio",
        zh: "选择器",
    },
    "obsidianLiveSyncSettingTab.panelSetup": {
        def: "Setup",
        la: "Constitutio",
        zh: "设置",
    },
    "obsidianLiveSyncSettingTab.serverVersion": {
        def: "Server info: ${info}",
        la: "Notitia ministratoris: ${info}",
        zh: "服务器信息: ${info}",
    },
    "obsidianLiveSyncSettingTab.titleActiveRemoteServer": {
        def: "Active Remote Server",
        la: "Ministrator remotus activus",
        zh: "活动远程服务器",
    },
    "obsidianLiveSyncSettingTab.titleAdvancedSettings": {
        def: "Advanced settings",
        la: "Optiones provectae",
        zh: "高级设置",
    },
    "obsidianLiveSyncSettingTab.titleAppearance": {
        def: "Appearance",
        la: "Species",
        zh: "外观",
    },
    "obsidianLiveSyncSettingTab.titleConflictResolution": {
        def: "Conflict resolution",
        la: "Resolutio discrepantiarum",
        zh: "冲突处理",
    },
    "obsidianLiveSyncSettingTab.titleCouchDB": {
        def: "CouchDB",
        la: "CouchDB",
        zh: "CouchDB 服务器",
    },
    "obsidianLiveSyncSettingTab.titleDeletionPropagation": {
        def: "Deletion Propagation",
        la: "Propagatio deletionum",
        zh: "删除传播",
    },
    "obsidianLiveSyncSettingTab.titleEncryptionNotEnabled": {
        def: "Encryption is not enabled",
        la: "Cryptatio non activa est",
        zh: "尚未启用加密",
    },
    "obsidianLiveSyncSettingTab.titleEncryptionPassphraseInvalid": {
        def: "Encryption Passphrase Invalid",
        la: "Tessera arcana cryptationis non valida",
        zh: "加密密码短语无效",
    },
    "obsidianLiveSyncSettingTab.titleExtraFeatures": {
        def: "Enable extra and advanced features",
        la: "Activa facultates additas et provectas",
        zh: "启用额外和高级功能",
    },
    "obsidianLiveSyncSettingTab.titleExtraFeaturesGroup": {
        def: "Extra features",
        la: "Facultates additae",
        zh: "扩展功能",
    },
    "obsidianLiveSyncSettingTab.titleExtraMenus": {
        def: "Extra menus",
        la: "Menus additae",
        zh: "扩展菜单",
    },
    "obsidianLiveSyncSettingTab.titleFetchConfig": {
        def: "Fetch Config",
        la: "Arcesse configurationem",
        zh: "获取配置",
    },
    "obsidianLiveSyncSettingTab.titleFetchConfigFromRemote": {
        def: "Fetch config from remote server",
        la: "Arcesse configurationem ex ministratore remoto",
        zh: "从远程服务器获取配置",
    },
    "obsidianLiveSyncSettingTab.titleFetchSettings": {
        def: "Fetch Settings",
        la: "Arcesse optiones",
        zh: "获取设置",
    },
    "obsidianLiveSyncSettingTab.titleHelpAndInformation": {
        def: "Help and information",
        la: "Auxilium et notitia",
        zh: "帮助与信息",
    },
    "obsidianLiveSyncSettingTab.titleHelpAndTroubleshooting": {
        def: "Help and troubleshooting",
        la: "Auxilium et solutio difficultatum",
        zh: "帮助与疑难解答",
    },
    "obsidianLiveSyncSettingTab.titleHiddenFiles": {
        def: "Hidden Files",
        la: "Plicae occultae",
        zh: "隐藏文件",
    },
    "obsidianLiveSyncSettingTab.titleLogging": {
        def: "Logging",
        la: "Acta",
        zh: "日志",
    },
    "obsidianLiveSyncSettingTab.titleMaintenanceAndRecovery": {
        def: "Maintenance and recovery",
        la: "Conservatio et restitutio",
        zh: "维护与恢复",
    },
    "obsidianLiveSyncSettingTab.titleMinioS3R2": {
        def: "Minio,S3,R2",
        la: "Minio,S3,R2",
        zh: "MinIO、S3、R2",
    },
    "obsidianLiveSyncSettingTab.titleNotification": {
        def: "Notification",
        la: "Notificatio",
        zh: "通知",
    },
    "obsidianLiveSyncSettingTab.titleOnlineTips": {
        def: "Online Tips",
        la: "Consilia interretialia",
        zh: "在线提示",
    },
    "obsidianLiveSyncSettingTab.titleQuickSetup": {
        def: "Quick Setup",
        la: "Constitutio celeris",
        zh: "快速设置",
    },
    "obsidianLiveSyncSettingTab.titleRebuildRequired": {
        def: "Rebuild Required",
        la: "Reaedificatio necessaria",
        zh: "需要重建",
    },
    "obsidianLiveSyncSettingTab.titleRemoteConfigCheckFailed": {
        def: "Remote Configuration Check Failed",
        la: "Inspectio configurationis remoti defecit",
        zh: "远端配置检查失败",
    },
    "obsidianLiveSyncSettingTab.titleRemoteServer": {
        def: "Remote Server",
        la: "Ministrator remotus",
        zh: "远端服务器",
    },
    "obsidianLiveSyncSettingTab.titleReset": {
        def: "Reset",
        la: "Restitue",
        zh: "重置",
    },
    "obsidianLiveSyncSettingTab.titleSetupOtherDevices": {
        def: "Set up other devices",
        la: "Constitue alia instrumenta",
        zh: "设置其他设备",
    },
    "obsidianLiveSyncSettingTab.titleSynchronisation": {
        def: "Synchronisation",
        la: "Synchronizatio",
        zh: "同步",
    },
    "obsidianLiveSyncSettingTab.titleSynchronizationMethod": {
        def: "Synchronization Method",
        la: "Ratio synchronizationis",
        zh: "同步方式",
    },
    "obsidianLiveSyncSettingTab.titleSynchronizationPreset": {
        def: "Synchronization Preset",
        la: "Praeformatum synchronizationis",
        zh: "同步预设",
    },
    "obsidianLiveSyncSettingTab.titleSyncSettings": {
        def: "Sync Settings",
        la: "Optiones synchronizationis",
        zh: "同步设置",
    },
    "obsidianLiveSyncSettingTab.titleSyncSettingsViaMarkdown": {
        def: "Sync Settings via Markdown",
        la: "Synchroniza optiones per Markdown",
        zh: "通过 Markdown 同步设置",
    },
    "obsidianLiveSyncSettingTab.titleUpdateThinning": {
        def: "Update Thinning",
        la: "Extenuatio renovationum",
        zh: "更新精简",
    },
    "obsidianLiveSyncSettingTab.warnCorsOriginUnmatched": {
        def: "CORS Origin is unmatched ${from}->${to}",
        la: "Origo CORS non congruit ${from}->${to}",
        zh: "CORS 来源不匹配 ${from}->${to}",
    },
    "obsidianLiveSyncSettingTab.warnNoAdmin": {
        def: "You do not have administrator privileges.",
        la: "Privilegia administratoris non habes.",
        zh: "你没有管理员权限。",
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
    "Old Algorithm": {
        def: "Old Algorithm",
        la: "Algorithmus vetus",
        zh: "旧算法",
    },
    "Old content copied to clipboard": {
        def: "Old content copied to clipboard",
        la: "Contentum vetus in tabellam exscriptum",
        zh: "旧内容已复制到剪贴板",
    },
    "Older (${diff})": {
        def: "Older (${diff})",
        la: "Vetustior (${diff})",
        zh: "较旧（${diff}）",
    },
    "Older fallback (Slow, W/O WebAssembly)": {
        def: "Older fallback (Slow, W/O WebAssembly)",
        la: "Subsidium vetustius (lentum, sine WebAssembly)",
        zh: "旧版回退（较慢，无 WebAssembly）",
    },
    On: {
        def: "On",
        la: "Activum",
        zh: "开启",
    },
    "On the source device, from the command palette, run the 'Show settings as a QR code' command.": {
        def: "On the source device, from the command palette, run the 'Show settings as a QR code' command.",
        la: "In instrumento fontis, ex indice mandatorum, mandatum 'Show settings as a QR code' exsequere.",
        zh: "在源设备上，从命令面板运行「Show settings as a QR code」命令。",
    },
    "On the source device, open Obsidian.": {
        def: "On the source device, open Obsidian.",
        la: "In instrumento fontis, Obsidian aperi.",
        zh: "在源设备上打开 Obsidian。",
    },
    "On this device, please keep this Vault open.": {
        def: "On this device, please keep this Vault open.",
        la: "In hoc instrumento, quaeso hoc tabularium apertum tene.",
        zh: "请在本设备上保持此库处于打开状态。",
    },
    "On this device, switch to the camera app or use a QR code scanner to scan the displayed QR code.": {
        def: "On this device, switch to the camera app or use a QR code scanner to scan the displayed QR code.",
        la: "In hoc instrumento, ad applicationem camerae transi vel lectore QR codicum utere ut codicem QR monstratum legas.",
        zh: "在本设备上切换到相机应用，或使用二维码扫描器扫描显示的二维码。",
    },
    "Only Fetch": {
        def: "Only Fetch",
        la: "Arcesse tantum",
        zh: "仅获取",
    },
    "Only Send": {
        def: "Only Send",
        la: "Mitte tantum",
        zh: "仅发送",
    },
    Open: {
        def: "Open",
        la: "Aperi",
        zh: "打开",
    },
    "Open connection": {
        def: "Open connection",
        la: "Aperi conexionem",
        zh: "打开连接",
    },
    "Open P2P Setup...": {
        def: "Open P2P Setup...",
        la: "Aperi constitutionem P2P...",
        zh: "打开 P2P 设置…",
    },
    "Open review harness": {
        def: "Open review harness",
        la: "Aperi instrumentum recensionis",
        zh: "打开审查工具",
    },
    "Open the dialog": {
        def: "Open the dialog",
        la: "Aperi dialogum",
        zh: "打开对话框",
    },
    "Other files": {
        def: "Other files",
        la: "Aliae plicae",
        zh: "其他文件",
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
    "Overwrite patterns": {
        def: "Overwrite patterns",
        la: "Formae superscribendi",
        zh: "覆盖模式",
    },
    "Overwrite remote": {
        def: "Overwrite remote",
        la: "Superscribe remotum",
        zh: "覆盖远端",
    },
    "Overwrite remote with local DB and passphrase.": {
        def: "Overwrite remote with local DB and passphrase.",
        la: "Superscribe remotum repositorio locali et tessera arcana.",
        zh: "使用本地数据库和密码短语覆盖远端。",
    },
    "Overwrite Server Data with This Device's Files": {
        def: "Overwrite Server Data with This Device's Files",
        la: "Superscribe data ministratoris plicis huius instrumenti",
        zh: "用本设备文件覆盖服务器数据",
    },
    "P2P Configuration": {
        def: "P2P Configuration",
        la: "Configuratio P2P",
        zh: "P2P 配置",
    },
    "P2P Status": {
        def: "P2P Status",
        la: "Status P2P",
        zh: "P2P 状态",
    },
    "P2P Sync : Open P2P Status": {
        def: "P2P Sync : Open P2P Status",
        la: "Synchronizatio P2P: aperi statum P2P",
        zh: "P2P 同步：打开 P2P 状态",
    },
    "P2P: Sync with targets": {
        def: "P2P: Sync with targets",
        la: "P2P: synchroniza cum destinationibus",
        zh: "P2P：与目标同步",
    },
    "P2P.ApplyRemoteConfig.AskRebuildByP2P": {
        def: 'Do you want to set the remote type to "P2P Sync" to rebuild by "P2P replication"?',
        la: "Visne genus remoti ad “P2P Sync” ponere ut per “replicationem P2P” reaedifices?",
        zh: "是否将远程类型设置为「P2P Sync」，以通过「P2P 复制」进行重建？",
    },
    "P2P.ApplyRemoteConfig.Buttons.Cancel": {
        def: "No, cancel",
        la: "Minime, abroga",
        zh: "不，取消",
    },
    "P2P.ApplyRemoteConfig.Buttons.Drop": {
        def: "Yes, and drop local database",
        la: "Ita, et repositorium locale abice",
        zh: "是，并丢弃本地数据库",
    },
    "P2P.ApplyRemoteConfig.Buttons.Keep": {
        def: "Yes, but keep local database",
        la: "Ita, sed repositorium locale retine",
        zh: "是，但保留本地数据库",
    },
    "P2P.ApplyRemoteConfig.Cancelled": {
        def: "Cancelled\nRemote config for ${name} is not applied",
        la: "Abrogatum\nConfiguratio remota ${name} non applicata est",
        zh: "已取消\n未应用 ${name} 的远程配置",
    },
    "P2P.ApplyRemoteConfig.Message": {
        def: "Do you really want to apply the remote config? This will overwrite your current config immediately and restart.\nAnd you can also drop the local database to rebuild from the remote device.",
        la: "Visne vere configurationem remotam applicare? Haec configurationem tuam praesentem statim superscribet et additamentum iterum incipiet.\nEtiam repositorium locale abicere potes ut ex instrumento remoto reaedifices.",
        zh: "确定要应用远程配置吗？这将立即覆盖当前配置并重启。\n你也可以丢弃本地数据库，从远程设备重建。",
    },
    "P2P.ApplyRemoteConfig.RebuildTitle": {
        def: "Rebuild from remote device",
        la: "Reaedifica ex instrumento remoto",
        zh: "从远程设备重建",
    },
    "P2P.ApplyRemoteConfig.Requesting": {
        def: "Requesting remote config for ${name}. Please input the passphrase on the remote device",
        la: "Configuratio remota ${name} petitur. Quaeso tesseram arcanam in instrumento remoto insere",
        zh: "正在请求 ${name} 的远程配置。请在远程设备上输入口令",
    },
    "P2P.ApplyRemoteConfig.Retrieved": {
        def: "Remote config for ${name} is retrieved successfully",
        la: "Configuratio remota ${name} feliciter arcessita est",
        zh: "已成功获取 ${name} 的远程配置",
    },
    "P2P.ApplyRemoteConfig.RetrieveFailed": {
        def: "Cannot retrieve remote config for ${peerId}",
        la: "Configuratio remota ${peerId} arcessi non potest",
        zh: "无法获取 ${peerId} 的远程配置",
    },
    "P2P.ApplyRemoteConfig.Title": {
        def: "Apply Remote Config",
        la: "Applica configurationem remotam",
        zh: "应用远程配置",
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
    "P2P.FailedToOpen": {
        def: "Failed to open P2P connection to the signalling server.",
        la: "Conexio P2P ad ministratorem signorum aperiri non potuit.",
        zh: "无法打开 P2P 连接到信令服务器",
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
    "P2P.Note.description": {
        def: " This replicator allows us to synchronise our vault with other devices\nusing a peer-to-peer connection. We can use this to synchronise our vault with our other devices without using a cloud service.\nThis replicator is based on Trystero. It also uses a signalling server to establish a connection between devices. The signalling server is used to exchange connection information between devices. It does (or,should) not know or store any of our data.\n\nThe signalling server can be hosted by anyone. This is just a Nostr relay. For the sake of simplicity and checking the behaviour of the replicator, an instance of the signalling server is hosted by vrtmrz. You can use the experimental server provided by vrtmrz, or you can use any other server.\n\nBy the way, even if the signalling server does not store our data, it can see the connection information of some of our devices. Please be aware of this. Also, be cautious when using the server provided by someone else.",
        la: " Hic replicator nobis permittit tabularium nostrum cum aliis instrumentis synchronizare\nper conexionem inter pares (peer-to-peer). Hoc uti possumus ut tabularium nostrum cum aliis instrumentis nostris sine servitio nubis synchronizemus.\nHic replicator in Trystero fundatur. Etiam ministratore signorum utitur ut conexionem inter instrumenta constituat. Ministrator signorum adhibetur ut notitiae conexionis inter instrumenta commutentur. Nulla data nostra cognoscit neque servat (vel servare non debet).\n\nMinistratorem signorum quilibet hospitari potest. Est merus nuntius (relay) Nostr. Simplicitatis causa et ut agendi ratio replicatoris probetur, exemplar ministratoris signorum a vrtmrz hospitatur. Ministratore experimentali a vrtmrz praebito uti potes, vel quolibet alio ministratore.\n\nCeterum, etsi ministrator signorum data nostra non servat, notitias conexionis quorundam instrumentorum nostrorum videre potest. Quaeso hoc animadverte. Item cave cum ministratore ab alio praebito uteris.",
        zh: " This replicator allows us to synchronise our vault with other devices\nusing a peer-to-peer connection. We can        use this to synchronise our vault with our other devices without using a cloud service.\nThis replicator is based on Trystero. It also uses a signaling server to establish a connection between devices. The signaling server is used to exchange connection information between devices. It does (or,should) not know or store any of our data.\n\nThe signaling server can be hosted by anyone. This is just a Nostr relay. For the sake of simplicity and checking the behaviour of the replicator, an instance of the signaling server is hosted by vrtmrz. You can use the experimental server provided by vrtmrz, or you can use any other server.\n\nBy the way, even if the signaling server does not store our data, it can see the connection information of some of our devices. Please be aware of this. Also, be cautious when using the server provided by someone else.",
    },
    "P2P.Note.important_note": {
        def: "Peer-to-Peer Replicator.",
        la: "Replicator inter pares.",
        zh: "The Experimental Implementation of the Peer-to-Peer Replicator.",
    },
    "P2P.Note.important_note_sub": {
        def: "This feature is still on the bleeding edge. Please be aware that ensure your data is backed up before using this feature. And, we would be so happy if you could contribute to the development of this feature.",
        la: "Haec facultas adhuc in acie novitatis est. Quaeso cura ut data tua exemplo tutelae servata sint antequam hac facultate uteris. Et gaudebimus valde si ad hanc facultatem excolendam conferre poteris.",
        zh: "This feature is still in the experimental stage. Please be aware that this feature may not work as expected. Furthermore, it may have some bugs, security issues, and other issues. Please use this feature at your own risk. Please contribute to the development of this feature.",
    },
    "P2P.Note.Summary": {
        def: "What is this feature? (and some important notes, please read once)",
        la: "Quid est haec facultas? (et quaedam monita gravia, quaeso semel lege)",
        zh: "What is this  feature? (and some important notes, please read once)",
    },
    "P2P.NotEnabled": {
        def: "Peer-to-Peer Sync is not enabled. We cannot open a new connection.",
        la: "Synchronizatio inter pares non activum est. Novam conexionem aperire non possumus.",
        zh: "Peer-to-Peer同步 is not enabled. We cannot open a new connection.",
    },
    "P2P.P2PReplication": {
        def: "Peer-to-Peer Replication",
        la: "Replicatio Par ad Par",
        zh: "Peer-to-Peer Replication",
    },
    "P2P.PaneTitle": {
        def: "Peer-to-Peer Sync",
        la: "Synchronizatio inter pares",
        zh: "Peer-to-Peer同步 (实验性)",
    },
    "P2P.ReplicatorInstanceMissing": {
        def: "P2P Sync replicator is not found, possibly not have been configured or enabled.",
        la: "Replicator synchronizationis P2P non inventus est; fortasse non constitutus vel non activatus est.",
        zh: "P2P Sync replicator is not found, possibly not have been configured or enabled.",
    },
    "P2P.ReplicatorViewTitle": {
        def: "Peer-to-Peer Replicator",
        la: "Replicator inter pares",
        zh: "点对点复制器",
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
    "paneMaintenance.markDeviceResolvedAfterBackup": {
        def: "paneMaintenance.markDeviceResolvedAfterBackup",
        la: "paneMaintenance.markDeviceResolvedAfterBackup",
        zh: "请在完成备份后将此设备标记为已处理。",
    },
    "paneMaintenance.remoteLockedAndDeviceNotAccepted": {
        def: "paneMaintenance.remoteLockedAndDeviceNotAccepted",
        la: "paneMaintenance.remoteLockedAndDeviceNotAccepted",
        zh: "远端数据库已锁定，且此设备尚未被接受。",
    },
    "paneMaintenance.remoteLockedResolvedDevice": {
        def: "paneMaintenance.remoteLockedResolvedDevice",
        la: "paneMaintenance.remoteLockedResolvedDevice",
        zh: "远端数据库已锁定，但此设备已被接受。",
    },
    "paneMaintenance.unlockDatabaseReady": {
        def: "paneMaintenance.unlockDatabaseReady",
        la: "paneMaintenance.unlockDatabaseReady",
        zh: "现在可以解锁数据库。",
    },
    "Parse setting file": {
        def: "Parse setting file",
        la: "Interpretare plicam configurationis",
        zh: "解析设置文件",
    },
    Passphrase: {
        def: "Passphrase",
        la: "Tessera arcana",
        zh: "密码",
    },
    "Passphrase is required.": {
        def: "Passphrase is required.",
        la: "Tessera arcana requiritur.",
        zh: "密码短语是必填项。",
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
    "Paste a connection string": {
        def: "Paste a connection string",
        la: "Insere catenam conexionis",
        zh: "粘贴连接字符串",
    },
    "Paste the Setup URI generated from one of your active devices.": {
        def: "Paste the Setup URI generated from one of your active devices.",
        la: "Insere Setup URI ex uno ex instrumentis tuis activis generatum.",
        zh: "粘贴从一台已在使用的设备上生成的 Setup URI。",
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
    "Path Obfuscation": {
        def: "Path Obfuscation",
        la: "Obscuratio viarum",
        zh: "路径混淆",
    },
    "Patterns to match files for overwriting instead of merging": {
        def: "Patterns to match files for overwriting instead of merging",
        la: "Formae plicarum superscribendarum potius quam conflandarum",
        zh: "用于匹配需覆盖而非合并文件的模式",
    },
    "Patterns to match files for syncing": {
        def: "Patterns to match files for syncing",
        la: "Formae plicarum synchronizandarum",
        zh: "用于匹配同步文件的模式",
    },
    "Peer ID:": {
        def: "Peer ID:",
        la: "ID paris:",
        zh: "对等方 ID：",
    },
    "Peer to Peer Replicator": {
        def: "Peer to Peer Replicator",
        la: "Replicator inter pares",
        zh: "点对点复制器",
    },
    "Peer-to-Peer only": {
        def: "Peer-to-Peer only",
        la: "Inter pares tantum",
        zh: "仅 Peer-to-Peer",
    },
    "Peer-to-Peer Synchronisation": {
        def: "Peer-to-Peer Synchronisation",
        la: "Synchronizatio inter pares",
        zh: "点对点同步",
    },
    Peers: {
        def: "Peers",
        la: "Pares",
        zh: "对等方",
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
    "Perform cleanup": {
        def: "Perform cleanup",
        la: "Exsequere purgationem",
        zh: "执行清理",
    },
    "Perform Garbage Collection": {
        def: "Perform Garbage Collection",
        la: "Exsequere collectionem purgamentorum",
        zh: "执行垃圾回收",
    },
    "Perform Garbage Collection to remove unused chunks and reduce database size.": {
        def: "Perform Garbage Collection to remove unused chunks and reduce database size.",
        la: "Exsequere collectionem purgamentorum ut fragmenta non adhibita removeantur et magnitudo repositorii minuatur.",
        zh: "执行垃圾回收以清理未使用的 chunks 并减小数据库体积。",
    },
    "Periodic Sync interval": {
        def: "Periodic Sync interval",
        la: "Intervallum synchronizationis periodicae",
        zh: "定期同步间隔",
    },
    PERMANENT: {
        def: "PERMANENT",
        la: "PERPETUUM",
        zh: "永久",
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
    "Please be aware that the End-to-End Encryption passphrase is not validated until the synchronisation process actually commences. This is a security measure designed to protect your data.":
        {
            def: "Please be aware that the End-to-End Encryption passphrase is not validated until the synchronisation process actually commences. This is a security measure designed to protect your data.",
            la: "Quaeso animadverte tesseram arcanam cryptationis ab extremo ad extremum non probari donec processus synchronizationis re vera incipiat. Haec est mensura securitatis ad data tua tuenda destinata.",
            zh: "请注意，端到端加密密码短语要等到同步过程真正开始后才会被校验。这是为保护你的数据而设计的安全措施。",
        },
    "Please configure your end-to-end encryption settings.": {
        def: "Please configure your end-to-end encryption settings.",
        la: "Quaeso optiones cryptationis ab extremo ad extremum constitue.",
        zh: "请配置你的端到端加密设置。",
    },
    "Please Confirm the Following": {
        def: "Please Confirm the Following",
        la: "Quaeso sequentia confirma",
        zh: "请确认以下内容",
    },
    "Please disable 'Read chunks online' in settings to use Garbage Collection.": {
        def: "Please disable 'Read chunks online' in settings to use Garbage Collection.",
        la: "Quaeso 'Read chunks online' in optionibus deactiva ut collectione purgamentorum utaris.",
        zh: "要使用垃圾回收，请在设置中禁用“Read chunks online”。",
    },
    "Please enable 'Compute revisions for chunks' in settings to use Garbage Collection.": {
        def: "Please enable 'Compute revisions for chunks' in settings to use Garbage Collection.",
        la: "Quaeso 'Compute revisions for chunks' in optionibus activa ut collectione purgamentorum utaris.",
        zh: "要使用垃圾回收，请在设置中启用“Compute revisions for chunks”。",
    },
    "Please enter the CouchDB server information below.": {
        def: "Please enter the CouchDB server information below.",
        la: "Quaeso notitias ministratoris CouchDB infra insere.",
        zh: "请在下方填写 CouchDB 服务器信息。",
    },
    "Please enter the details required to connect to your S3/MinIO/R2 compatible object storage service.": {
        def: "Please enter the details required to connect to your S3/MinIO/R2 compatible object storage service.",
        la: "Quaeso insere singula quae requiruntur ut ad servitium repositorii obiectorum cum S3/MinIO/R2 congruens conectaris.",
        zh: "请填写连接到你的 S3/MinIO/R2 兼容对象存储服务所需的信息。",
    },
    "Please enter the Peer-to-Peer Synchronisation information below.": {
        def: "Please enter the Peer-to-Peer Synchronisation information below.",
        la: "Quaeso notitias synchronizationis inter pares infra insere.",
        zh: "请在下方填写点对点同步信息。",
    },
    "Please enter the Setup URI that was generated during server installation or on another device, along with the vault passphrase.":
        {
            def: "Please enter the Setup URI that was generated during server installation or on another device, along with the vault passphrase.",
            la: "Quaeso insere Setup URI quod in ministratore instituendo vel in alio instrumento generatum est, una cum tessera arcana tabularii.",
            zh: "请输入在服务器安装时或在其他设备上生成的设置 URI，以及库的密码短语。",
        },
    "Please follow the steps below to import settings from your existing device.": {
        def: "Please follow the steps below to import settings from your existing device.",
        la: "Quaeso gradus infra sequere ut optiones ex instrumento tuo exstante importes.",
        zh: "请按以下步骤从你现有的设备导入设置。",
    },
    "PLEASE NOTE": {
        def: "PLEASE NOTE",
        la: "QUAESO NOTA",
        zh: "请注意",
    },
    "Please select 'Cancel' explicitly to cancel this operation.": {
        def: "Please select 'Cancel' explicitly to cancel this operation.",
        la: "Quaeso 'Cancel' expresse elige ut hanc operationem abroges.",
        zh: "如需取消此操作，请明确选择“取消”。",
    },
    "Please select a method to import the settings from another device.": {
        def: "Please select a method to import the settings from another device.",
        la: "Quaeso modum elige quo optiones ex alio instrumento importentur.",
        zh: "请选择一种从其他设备导入设置的方法。",
    },
    "Please select an active P2P remote configuration to change P2P sync targets.": {
        def: "Please select an active P2P remote configuration to change P2P sync targets.",
        la: "Quaeso configurationem remotam P2P activam elige ut destinationes synchronizationis P2P mutes.",
        zh: "请选择一个生效的 P2P 远端配置以更改 P2P 同步目标。",
    },
    "Please select an option to proceed": {
        def: "Please select an option to proceed",
        la: "Quaeso optionem elige ut pergas",
        zh: "请选择一个选项以继续",
    },
    "Please select the button below to restart and proceed to the data fetching confirmation.": {
        def: "Please select the button below to restart and proceed to the data fetching confirmation.",
        la: "Quaeso globulum infra elige ut denuo incipias et ad confirmationem datorum arcessendorum pergas.",
        zh: "请点击下方按钮重启，然后进入数据获取确认。",
    },
    "Please select the button below to restart and proceed to the final confirmation.": {
        def: "Please select the button below to restart and proceed to the final confirmation.",
        la: "Quaeso globulum infra elige ut denuo incipias et ad confirmationem ultimam pergas.",
        zh: "请点击下方按钮重启，然后进入最终确认。",
    },
    "Please select the type of server to which you are connecting.": {
        def: "Please select the type of server to which you are connecting.",
        la: "Quaeso genus ministratoris elige ad quem conecteris.",
        zh: "请选择你要连接的服务器类型。",
    },
    "Please select your situation.": {
        def: "Please select your situation.",
        la: "Quaeso condicionem tuam elige.",
        zh: "请选择你的情况。",
    },
    "Please set device name to identify this device. This name should be unique among your devices. While not configured, we cannot enable this feature.":
        {
            def: "Please set device name to identify this device. This name should be unique among your devices. While not configured, we cannot enable this feature.",
            la: "Quaeso nomen instrumenti constitue ut hoc instrumentum agnoscatur. Hoc nomen inter instrumenta tua unicum esse debet. Dum non constitutum est, hanc facultatem activare non possumus.",
            zh: "请设置设备名称以标识此设备。该名称在你的所有设备之间应保持唯一；未配置前无法启用此功能。",
        },
    "Please set this device name": {
        def: "Please set this device name",
        la: "Quaeso nomen huius instrumenti constitue",
        zh: "请设置此设备名称",
    },
    "Please understand that this is intended behaviour.": {
        def: "Please understand that this is intended behaviour.",
        la: "Quaeso intellege hoc consulto ita agere.",
        zh: "请注意这是预期行为。",
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
    "Prepare the 'report' to create an issue": {
        def: "Prepare the 'report' to create an issue",
        la: "Para 'relationem' ad quaestionem (issue) creandam",
        zh: "准备 '报告' 以创建问题单",
    },
    Presets: {
        def: "Presets",
        la: "Praeconstituta",
        zh: "预设",
    },
    "Prevent fetching configuration from server": {
        def: "Prevent fetching configuration from server",
        la: "Prohibe ne configuratio ex ministratore arcessatur",
        zh: "阻止从服务器获取配置",
    },
    Proceed: {
        def: "Proceed",
        la: "Perge",
        zh: "继续",
    },
    "Proceed Garbage Collection": {
        def: "Proceed Garbage Collection",
        la: "Perge collectione purgamentorum",
        zh: "继续执行垃圾回收",
    },
    "Proceed to the next step.": {
        def: "Proceed to the next step.",
        la: "Ad gradum proximum perge.",
        zh: "继续下一步。",
    },
    "Proceed with Setup URI": {
        def: "Proceed with Setup URI",
        la: "Perge cum Setup URI",
        zh: "继续使用 Setup URI",
    },
    "Proceeding with Garbage Collection, ignoring missing nodes.": {
        def: "Proceeding with Garbage Collection, ignoring missing nodes.",
        la: "Collectio purgamentorum procedit, nodis absentibus neglectis.",
        zh: "正在继续执行垃圾回收，并忽略缺失节点。",
    },
    "Proceeding with Garbage Collection.": {
        def: "Proceeding with Garbage Collection.",
        la: "Collectio purgamentorum procedit.",
        zh: "正在执行垃圾回收。",
    },
    "Process small files in the foreground": {
        def: "Process small files in the foreground",
        la: "Tracta parvas plicas in proscaenio",
        zh: "在前台处理小文件",
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
    "PureJS fallback  (Fast, W/O WebAssembly)": {
        def: "PureJS fallback  (Fast, W/O WebAssembly)",
        la: "Subsidium PureJS  (celere, sine WebAssembly)",
        zh: "PureJS 回退（快速，无 WebAssembly）",
    },
    "Purge all download/upload cache.": {
        def: "Purge all download/upload cache.",
        la: "Purga omnem cache deorsum ferendi et sursum mittendi.",
        zh: "清除所有下载／上传缓存。",
    },
    "Purge all journal counter": {
        def: "Purge all journal counter",
        la: "Purga omnes numeratores diarii",
        zh: "清除所有日志计数器",
    },
    "Reboot to re-run the process": {
        def: "Reboot to re-run the process",
        la: "Denuo incipe ut processus iterum curratur",
        zh: "重启以重新运行此流程",
    },
    "Rebuild local and remote database with local files.": {
        def: "Rebuild local and remote database with local files.",
        la: "Reaedifica repositorium locale et remotum plicis localibus.",
        zh: "使用本地文件重建本地和远端数据库。",
    },
    "Rebuilding Operations (Remote Only)": {
        def: "Rebuilding Operations (Remote Only)",
        la: "Operationes reaedificandi (solum remotum)",
        zh: "重建操作（仅远端）",
    },
    "Recovery and Repair": {
        def: "Recovery and Repair",
        la: "Restitutio et reparatio",
        zh: "恢复与修复",
    },
    "Recreate all": {
        def: "Recreate all",
        la: "Omnia recrea",
        zh: "全部重建",
    },
    "Recreate missing chunks for all files": {
        def: "Recreate missing chunks for all files",
        la: "Recrea fragmenta deficientia omnium plicarum",
        zh: "为所有文件重建缺失的 chunks",
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
    "RedFlag.Fetch.Method.Desc": {
        def: "How do you want to fetch?\n- Create a local database once before fetching.\n  **Low Traffic**, **High CPU**, **Low Risk**\n  Recommended if ...\n  - Files possibly inconsistent\n  - Files were not so much\n- Create local file chunks before fetching.\n  **Low Traffic**, **Moderate CPU**, **Low to Moderate Risk**\n  Recommended if ...\n  - Files probably consistent\n  - You have a lot of files.\n- Fetch everything from the remote.\n  **High Traffic**, **Low CPU**, **Low to Moderate Risk**\n\n>[!INFO]- Details\n> ## Create a local database once before fetching.\n> **Low Traffic**, **High CPU**, **Low Risk**\n> This option first creates a local database using existing local files before fetching data from the remote source.\n> If matching files exist both locally and remotely, only the differences between them will be transferred.\n> However, files present in both locations will initially be handled as conflicted files. They will be resolved automatically if they are not actually conflicted, but this process may take time.\n> This is generally the safest method, minimizing data loss risk.\n> ## Create local file chunks before fetching.\n> **Low Traffic**, **Moderate CPU**, **Low to Moderate Risk** (depending operation)\n> This option first creates chunks from local files for the database, then fetches data. Consequently, only chunks missing locally are transferred. However, all metadata is taken from the remote source.\n> Local files are then compared against this metadata at launch. The content considered newer will overwrite the older one (by modified time). This outcome is then synchronised back to the remote database.\n> This is generally safe if local files are genuinely the latest timestamp. However, it can cause problems if a file has a newer timestamp but older content (like the initial `welcome.md`).\n> This uses less CPU and faster than \"Create a local database once before fetching\", but it may lead to data loss if not used carefully.\n> ## Fetch everything from the remote.\n> **High Traffic**, **Low CPU**, **Low to Moderate Risk** (depending operation)\n> All things will be fetched from the remote.\n> Similar to the Create local file chunks before fetching, but all chunks are fetched from the remote source.\n> This is the most traditional way to fetch, typically consuming the most network traffic and time. It also carries a similar risk of overwriting remote files to the 'Create local file chunks before fetching' option.\n> However, it is often considered the most stable method because it is the longest-established and most straightforward approach.",
        la: "Quomodo arcessere vis?\n- Crea repositorium locale semel antequam arcessas.\n  **Commeatus parvus**, **CPU magnus**, **Periculum parvum**\n  Commendatur si ...\n  - Plicae fortasse inconstantes sunt\n  - Plicae non tam multae erant\n- Crea fragmenta plicarum localium antequam arcessas.\n  **Commeatus parvus**, **CPU modicus**, **Periculum parvum vel modicum**\n  Commendatur si ...\n  - Plicae probabiliter constantes sunt\n  - Plurimas plicas habes.\n- Arcesse omnia ex remoto.\n  **Commeatus magnus**, **CPU parvus**, **Periculum parvum vel modicum**\n\n>[!INFO]- Singula\n> ## Crea repositorium locale semel antequam arcessas.\n> **Commeatus parvus**, **CPU magnus**, **Periculum parvum**\n> Haec optio primum repositorium locale ex plicis localibus exstantibus creat antequam data ex fonte remoto arcessit.\n> Si plicae congruentes et localiter et remote exstant, solae differentiae inter eas transferentur.\n> Plicae tamen in utroque loco praesentes primo ut plicae discrepantes tractabuntur. Automatice solventur si re vera non discrepant, sed hic processus tempus requirere potest.\n> Hic plerumque modus tutissimus est, periculum datorum amittendorum minimum reddens.\n> ## Crea fragmenta plicarum localium antequam arcessas.\n> **Commeatus parvus**, **CPU modicus**, **Periculum parvum vel modicum** (pro operatione)\n> Haec optio primum fragmenta ex plicis localibus pro repositorio creat, deinde data arcessit. Itaque sola fragmenta quae localiter desunt transferuntur. Omnia tamen metadata ex fonte remoto sumuntur.\n> Plicae locales deinde in initio cum his metadatis comparantur. Contentum quod recentius habetur vetustius superscribet (secundum tempus mutationis). Hic exitus deinde ad repositorium remotum rursus synchronizatur.\n> Hoc plerumque tutum est si plicae locales re vera notam temporis recentissimam habent. Difficultates tamen afferre potest si plica notam temporis recentiorem sed contentum vetustius habet (ut `welcome.md` initialis).\n> Hoc minus CPU adhibet et celerius est quam “Crea repositorium locale semel antequam arcessas”, sed ad data amittenda ducere potest nisi caute adhibetur.\n> ## Arcesse omnia ex remoto.\n> **Commeatus magnus**, **CPU parvus**, **Periculum parvum vel modicum** (pro operatione)\n> Omnia ex remoto arcessentur.\n> Simile Crea fragmenta plicarum localium antequam arcessas, sed omnia fragmenta ex fonte remoto arcessuntur.\n> Hic est modus arcessendi maxime traditus, qui plerumque plurimum commeatus retis et temporis consumit. Simile quoque periculum plicarum remotarum superscribendarum habet atque optio 'Crea fragmenta plicarum localium antequam arcessas'.\n> Saepe tamen modus stabilissimus habetur, quia diutissime constitutus et simplicissimus est.",
        zh: "How do you want to fetch?\n- Create a local database once before fetching.\n  **Low Traffic**, **High CPU**, **Low Risk**\n  Recommended if ...\n  - Files possibly inconsistent\n  - Files were not so much\n- Create local file chunks before fetching.\n  **Low Traffic**, **Moderate CPU**, **Low to Moderate Risk**\n  Recommended if ...\n  - Files probably consistent\n  - You have a lot of files.\n- Fetch everything from the remote.\n  **High Traffic**, **Low CPU**, **Low to Moderate Risk**\n\n>[!INFO]- Details\n> ## Create a local database once before fetching.\n> **Low Traffic**, **High CPU**, **Low Risk**\n> This option first creates a local database using existing local files before fetching data from the remote source.\n> If matching files exist both locally and remotely, only the differences between them will be transferred.\n> However, files present in both locations will initially be handled as conflicted files. They will be resolved automatically if they are not actually conflicted, but this process may take time.\n> This is generally the safest method, minimizing data loss risk.\n> ## Create local file chunks before fetching.\n> **Low Traffic**, **Moderate CPU**, **Low to Moderate Risk** (depending operation)\n> This option first creates chunks from local files for the database, then fetches data. Consequently, only chunks missing locally are transferred. However, all metadata is taken from the remote source.\n> Local files are then compared against this metadata at launch. The content considered newer will overwrite the older one (by modified time). This outcome is then synchronised back to the remote database.\n> This is generally safe if local files are genuinely the latest timestamp. However, it can cause problems if a file has a newer timestamp but older content (like the initial `welcome.md`).\n> This uses less CPU and faster than \"Create a local database once before fetching\", but it may lead to data loss if not used carefully.\n> ## Fetch everything from the remote.\n> **High Traffic**, **Low CPU**, **Low to Moderate Risk** (depending operation)\n> All things will be fetched from the remote.\n> Similar to the Create local file chunks before fetching, but all chunks are fetched from the remote source.\n> This is the most traditional way to fetch, typically consuming the most network traffic and time. It also carries a similar risk of overwriting remote files to the 'Create local file chunks before fetching' option.\n> However, it is often considered the most stable method because it is the longest-established and most straightforward approach.",
    },
    "RedFlag.Fetch.Method.FetchSafer": {
        def: "Create a local database once before fetching",
        la: "Crea repositorium locale semel antequam arcessas",
        zh: "Create a local database once before fetching",
    },
    "RedFlag.Fetch.Method.FetchSmoother": {
        def: "Create local file chunks before fetching",
        la: "Crea fragmenta plicarum localium antequam arcessas",
        zh: "Create local file chunks before fetching",
    },
    "RedFlag.Fetch.Method.FetchTraditional": {
        def: "Fetch everything from the remote",
        la: "Arcesse omnia ex remoto",
        zh: "Fetch everything from the remote",
    },
    "RedFlag.Fetch.Method.Title": {
        def: "How do you want to fetch?",
        la: "Quomodo arcessere vis?",
        zh: "How do you want to fetch?",
    },
    "RedFlag.Fetch.Starting": {
        def: "Fetching everything with settings: makeLocalChunkBeforeSync=${makeLocalChunkBeforeSync}, makeLocalFilesBeforeSync=${makeLocalFilesBeforeSync}",
        la: "Omnia arcessuntur his optionibus: makeLocalChunkBeforeSync=${makeLocalChunkBeforeSync}, makeLocalFilesBeforeSync=${makeLocalFilesBeforeSync}",
        zh: "正在使用以下设置获取全部内容：makeLocalChunkBeforeSync=${makeLocalChunkBeforeSync}，makeLocalFilesBeforeSync=${makeLocalFilesBeforeSync}",
    },
    "RedFlag.FetchRemoteConfig.Buttons.Cancel": {
        def: "No, use local settings",
        la: "Minime, optiones locales adhibe",
        zh: "No, use local settings",
    },
    "RedFlag.FetchRemoteConfig.Buttons.Fetch": {
        def: "Yes, fetch and apply remote settings",
        la: "Ita, arcesse et applica optiones remotas",
        zh: "Yes, fetch and apply remote settings",
    },
    "RedFlag.FetchRemoteConfig.Message": {
        def: "Do you want to fetch and apply remotely stored preference settings to the device?",
        la: "Visne optiones remote servatas arcessere et huic instrumento applicare?",
        zh: "Do you want to fetch and apply remotely stored preference settings to the device?",
    },
    "RedFlag.FetchRemoteConfig.Title": {
        def: "Fetch Remote Configuration",
        la: "Arcesse configurationem remotam",
        zh: "Fetch Remote Configuration",
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
    "Reduces storage space by discarding all non-latest revisions. This requires the same amount of free space on the remote server and the local client.":
        {
            def: "Reduces storage space by discarding all non-latest revisions. This requires the same amount of free space on the remote server and the local client.",
            la: "Spatium repositorii minuit omnes recensiones praeter recentissimas abiciendo. Hoc idem spatium liberum in ministratore remoto et in cliente locali requirit.",
            zh: "通过丢弃所有非最新版本来减少存储空间。这需要远程服务器和本地客户端具备相同数量的可用空间。",
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
    Region: {
        def: "Region",
        la: "Regio",
        zh: "区域",
    },
    "Relay settings": {
        def: "Relay settings",
        la: "Optiones nuntii (relay)",
        zh: "中继设置",
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
    "Remediation Setting Changed": {
        def: "Remediation Setting Changed",
        la: "Optio remedii mutata",
        zh: "修复设置已更改",
    },
    "Remote Database Tweak (In sunset)": {
        def: "Remote Database Tweak (In sunset)",
        la: "Accommodatio repositorii remoti (in occasu)",
        zh: "远端数据库调优（逐步淘汰）",
    },
    "Remote Databases": {
        def: "Remote Databases",
        la: "Repositoria remota",
        zh: "远端数据库",
    },
    "Remote name": {
        def: "Remote name",
        la: "Nomen remoti",
        zh: "远端名称",
    },
    "Remote only": {
        def: "Remote only",
        la: "Remotum tantum",
        zh: "仅远端",
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
    "Replicate now": {
        def: "Replicate now",
        la: "Replica nunc",
        zh: "立即复制",
    },
    "Replicate now by P2P": {
        def: "Replicate now by P2P",
        la: "Replica nunc per P2P",
        zh: "立即通过 P2P 同步",
    },
    "Replicate P2P to default peer": {
        def: "Replicate P2P to default peer",
        la: "Replica per P2P cum socio praedefinito",
        zh: "通过 P2P 与默认对端同步",
    },
    Replicating: {
        def: "Replicating",
        la: "Replicatio fit",
        zh: "复制中",
    },
    "Replicating...": {
        def: "Replicating...",
        la: "Replicatio fit...",
        zh: "复制中…",
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
    "Rerun Onboarding Wizard": {
        def: "Rerun Onboarding Wizard",
        la: "Iterum curre ducem initialem",
        zh: "重新运行引导向导",
    },
    "Rerun the onboarding wizard to set up Self-hosted LiveSync again.": {
        def: "Rerun the onboarding wizard to set up Tabularium again.",
        la: "Iterum curre ducem initialem ut Tabularium denuo constituas.",
        zh: "重新运行引导向导以再次设置 Tabularium。",
    },
    "Rerun Wizard": {
        def: "Rerun Wizard",
        la: "Iterum curre ducem",
        zh: "重新运行向导",
    },
    Resend: {
        def: "Resend",
        la: "Iterum mitte",
        zh: "重新发送",
    },
    "Resend all chunks to the remote.": {
        def: "Resend all chunks to the remote.",
        la: "Omnia fragmenta ad remotum iterum mitte.",
        zh: "将所有 chunks 重新发送到远端。",
    },
    Reset: {
        def: "Reset",
        la: "Restitue",
        zh: "重置",
    },
    "Reset all": {
        def: "Reset all",
        la: "Omnia restitue",
        zh: "全部重置",
    },
    "Reset all journal counter": {
        def: "Reset all journal counter",
        la: "Restitue omnes numeratores diarii",
        zh: "重置所有日志计数器",
    },
    "Reset and Resume Synchronisation": {
        def: "Reset and Resume Synchronisation",
        la: "Restitue et resume synchronizationem",
        zh: "重置并恢复同步",
    },
    "Reset journal received history": {
        def: "Reset journal received history",
        la: "Restitue historiam diarii accepti",
        zh: "重置日志接收历史",
    },
    "Reset journal sent history": {
        def: "Reset journal sent history",
        la: "Restitue historiam diarii missi",
        zh: "重置日志发送历史",
    },
    "Reset notification threshold and check the remote database usage": {
        def: "Reset notification threshold and check the remote database usage",
        la: "Restitue limitem nuntiandi et usum repositorii remoti inspice",
        zh: "重置通知阈值并检查远程数据库使用情况",
    },
    "Reset received": {
        def: "Reset received",
        la: "Restitue accepta",
        zh: "重置接收记录",
    },
    "Reset sent history": {
        def: "Reset sent history",
        la: "Restitue historiam missorum",
        zh: "重置发送历史",
    },
    "Reset Synchronisation information": {
        def: "Reset Synchronisation information",
        la: "Restitue notitias synchronizationis",
        zh: "重置同步信息",
    },
    "Reset Synchronisation on This Device": {
        def: "Reset Synchronisation on This Device",
        la: "Restitue synchronizationem in hoc instrumento",
        zh: "重置此设备上的同步",
    },
    "Reset the remote storage size threshold and check the remote storage size again.": {
        def: "Reset the remote storage size threshold and check the remote storage size again.",
        la: "Restitue limitem magnitudinis repositorii remoti et magnitudinem eius iterum inspice.",
        zh: "重置远程存储大小阈值并再次检查远程存储大小。",
    },
    "Resolve All": {
        def: "Resolve All",
        la: "Omnia solve",
        zh: "全部处理",
    },
    "Resolve all conflicted files": {
        def: "Resolve all conflicted files",
        la: "Solve omnes plicas discrepantes",
        zh: "解决所有冲突文件",
    },
    "Resolve All conflicted files by the newer one": {
        def: "Resolve All conflicted files by the newer one",
        la: "Solve omnes plicas discrepantes recentiore",
        zh: "将所有冲突文件解析为较新的版本",
    },
    "Resolve all conflicted files by the newer one. Caution: This will overwrite the older one, and cannot resurrect the overwritten one.":
        {
            def: "Resolve all conflicted files by the newer one. Caution: This will overwrite the older one, and cannot resurrect the overwritten one.",
            la: "Solve omnes plicas discrepantes recentiore. Cave: hoc vetustiorem superscribet, nec superscriptam resuscitare poterit.",
            zh: "将所有冲突文件统一保留较新的版本。注意：这会覆盖较旧的版本，且被覆盖的内容无法恢复。",
        },
    "Resolve if conflicted.": {
        def: "Resolve if conflicted.",
        la: "Solve si discrepat",
        zh: "如有冲突则解决",
    },
    "Restart and Fetch Data": {
        def: "Restart and Fetch Data",
        la: "Denuo incipe et data arcesse",
        zh: "重启并获取数据",
    },
    "Restart and Initialise Server": {
        def: "Restart and Initialise Server",
        la: "Denuo incipe et ministratorem initia",
        zh: "重启并初始化服务器",
    },
    "Restart Now": {
        def: "Restart Now",
        la: "Nunc denuo incipe",
        zh: "立即重启",
    },
    "Restarting Obsidian is strongly recommended. Until restart, some changes may not take effect, and display may be inconsistent. Are you sure to restart now?":
        {
            def: "Restarting Obsidian is strongly recommended. Until restart, some changes may not take effect, and display may be inconsistent. Are you sure to restart now?",
            la: "Obsidian denuo incipere valde commendatur. Donec denuo incipiat, quaedam mutationes fortasse effectum non habebunt et ostensio inconstans esse potest. Certusne es te nunc denuo incipere velle?",
            zh: "强烈建议重启 Obsidian。在重启之前，部分更改可能不会生效，显示也可能不一致。确定现在重启吗？",
        },
    "Restore or reconstruct local database from remote.": {
        def: "Restore or reconstruct local database from remote.",
        la: "Restitue vel reconstrue repositorium locale ex remoto.",
        zh: "从远端恢复或重建本地数据库。",
    },
    Rev: {
        def: "Rev",
        la: "Rec.",
        zh: "修订",
    },
    Revert: {
        def: "Revert",
        la: "Reverte",
        zh: "还原",
    },
    "Revert changes": {
        def: "Revert changes",
        la: "Muta revoca",
        zh: "还原更改",
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
    "Room ID suffix:": {
        def: "Room ID suffix:",
        la: "Suffixum ID conclavis:",
        zh: "房间 ID 后缀：",
    },
    "Run Doctor": {
        def: "Run Doctor",
        la: "Curre medicum",
        zh: "立即诊断",
    },
    "S3/MinIO/R2 Configuration": {
        def: "S3/MinIO/R2 Configuration",
        la: "Configuratio S3/MinIO/R2",
        zh: "S3/MinIO/R2 配置",
    },
    "S3/MinIO/R2 Object Storage": {
        def: "S3/MinIO/R2 Object Storage",
        la: "Repositorium obiectorum S3/MinIO/R2",
        zh: "S3/MinIO/R2 对象存储",
    },
    Same: {
        def: "Same",
        la: "Idem",
        zh: "相同",
    },
    "Same or local only": {
        def: "Same or local only",
        la: "Idem vel localis tantum",
        zh: "相同或仅本地",
    },
    "Save and Apply": {
        def: "Save and Apply",
        la: "Serva et applica",
        zh: "保存并应用",
    },
    "Save settings to a markdown file. You will be notified when new settings arrive. You can set different files by the platform.":
        {
            def: "Save settings to a markdown file. You will be notified when new settings arrive. You can set different files by the platform.",
            la: "Optiones in plicam markdown serva. Certior fies cum novae optiones advenient. Plicas diversas pro suggestu constituere potes.",
            zh: "将设置保存到一个 Markdown 文件中。当新设置到达时,您将收到通知。您可以根据平台设置不同的文件 ",
        },
    "Save without connecting": {
        def: "Save without connecting",
        la: "Serva sine conexione",
        zh: "不连接直接保存",
    },
    "Saving will be performed forcefully after this number of seconds.": {
        def: "Saving will be performed forcefully after this number of seconds.",
        la: "Servatio vi perficietur post hunc numerum secundorum.",
        zh: "在此秒数后将强制执行保存 ",
    },
    "Saving without a successful connection test keeps this profile, but automatic synchronisation may fail until the connection is corrected.":
        {
            def: "Saving without a successful connection test keeps this profile, but automatic synchronisation may fail until the connection is corrected.",
            la: "Servatio sine probatione conexionis prospera hanc rationem conexionis (profile) servat, sed synchronizatio automatica deficere potest donec conexio corrigatur.",
            zh: "未通过连接测试就保存会保留此档案，但在连接修正之前，自动同步可能会失败。",
        },
    "Scan a QR Code (Recommended for mobile)": {
        def: "Scan a QR Code (Recommended for mobile)",
        la: "Lege codicem QR (commendatur pro instrumentis mobilibus)",
        zh: "扫描二维码（移动端推荐）",
    },
    "Scan and apply all offline hidden-file changes": {
        def: "Scan and apply all offline hidden-file changes",
        la: "Perlustra et applica omnes mutationes plicarum occultarum extra lineam factas",
        zh: "扫描并应用所有离线时的隐藏文件变更",
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
    "Scan for Broken files": {
        def: "Scan for Broken files",
        la: "Quaere plicas corruptas",
        zh: "扫描损坏文件",
    },
    "Scan for hidden files before replication": {
        def: "Scan for hidden files before replication",
        la: "Quaere plicas occultas ante replicationem",
        zh: "复制前扫描隐藏文件",
    },
    "Scan hidden file changes on the local database": {
        def: "Scan hidden file changes on the local database",
        la: "Perlustra mutationes plicarum occultarum in repositorio locali",
        zh: "扫描本地数据库中隐藏文件的变更",
    },
    "Scan hidden file changes on the storage": {
        def: "Scan hidden file changes on the storage",
        la: "Perlustra mutationes plicarum occultarum in repositorio plicarum",
        zh: "扫描存储中隐藏文件的变更",
    },
    "Scan hidden files periodically": {
        def: "Scan hidden files periodically",
        la: "Perscrutare plicas occultas periodice",
        zh: "定期扫描隐藏文件",
    },
    "Scan QR Code": {
        def: "Scan QR Code",
        la: "Lege codicem QR",
        zh: "扫描二维码",
    },
    "Scan storage and database again": {
        def: "Scan storage and database again",
        la: "Perlustra iterum repositorium plicarum et repositorium",
        zh: "重新扫描存储与数据库",
    },
    "Scan the QR code displayed on an active device using this device's camera.": {
        def: "Scan the QR code displayed on an active device using this device's camera.",
        la: "Lege codicem QR in instrumento activo monstratum camera huius instrumenti.",
        zh: "使用当前设备的摄像头扫描另一台已在使用设备上显示的二维码。",
    },
    "Schedule and Restart": {
        def: "Schedule and Restart",
        la: "Constitue et denuo incipe",
        zh: "安排并重启",
    },
    "Scram Switches": {
        def: "Scram Switches",
        la: "Commutatores subitae interruptionis",
        zh: "紧急开关",
    },
    "Scram!": {
        def: "Scram!",
        la: "Siste subito!",
        zh: "紧急处置",
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
    "Secret Access Key": {
        def: "Secret Access Key",
        la: "Secret Access Key",
        zh: "私有访问密钥",
    },
    "Secret Key": {
        def: "Secret Key",
        la: "Clavis secreta",
        zh: "Secret Key",
    },
    SELECT: {
        def: "SELECT",
        la: "ELIGE",
        zh: "选择",
    },
    "Select active P2P remote": {
        def: "Select active P2P remote",
        la: "Elige remotum P2P activum",
        zh: "选择生效的 P2P 远端",
    },
    "Select All Shiny": {
        def: "Select All Shiny",
        la: "Elige omnia recentissima",
        zh: "全选 Shiny",
    },
    "Select Flagged Shiny": {
        def: "Select Flagged Shiny",
        la: "Elige recentissima notata",
        zh: "选择已标记的 Shiny",
    },
    "Select P2P remote...": {
        def: "Select P2P remote...",
        la: "Elige remotum P2P...",
        zh: "选择 P2P 远端…",
    },
    "Select the database adapter to use.": {
        def: "Select the database adapter to use.",
        la: "Elige adaptatorem repositorii adhibendum.",
        zh: "选择要使用的数据库适配器。",
    },
    "Selecting this option will result in the current data on this device being used to initialise the server. Any existing data on the server will be completely overwritten.":
        {
            def: "Selecting this option will result in the current data on this device being used to initialise the server. Any existing data on the server will be completely overwritten.",
            la: "Hac optione electa, data huius instrumenti currentia ad ministratorem initiandum adhibebuntur. Omnia data in ministratore exstantia penitus superscribentur.",
            zh: "选择此选项后，将用本设备的当前数据来初始化服务器。服务器上现有的数据将被完全覆盖。",
        },
    "Selecting this option will result in this device joining the existing server. You need to fetching the existing synchronisation data from the server to this device.":
        {
            def: "Selecting this option will result in this device joining the existing server. You need to fetching the existing synchronisation data from the server to this device.",
            la: "Hac optione electa, hoc instrumentum ministratori exstanti adiungetur. Data synchronizationis exstantia ex ministratore in hoc instrumentum arcessere debes.",
            zh: "选择此选项后，本设备将加入现有服务器。你需要把服务器上已有的同步数据获取到本设备。",
        },
    Selective: {
        def: "Selective",
        la: "Selectivum",
        zh: "选择性",
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
    "Send chunks": {
        def: "Send chunks",
        la: "Mitte fragmenta",
        zh: "发送 chunks",
    },
    SENDING: {
        def: "SENDING",
        la: "MITTITUR",
        zh: "发送中",
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
    "Setting.GenerateKeyPair.Desc": {
        def: 'We have generated a key pair!\n\nNote: This key pair will never be shown again. Please save it in a safe place. If you have lost it, you need to generate a new key pair.\nNote 2: The public key is in spki format, and the Private key is in pkcs8 format. For the sake of convenience, newlines are converted to `\\n` in public key.\nNote 3: The public key should be configured in the remote database, and the private key should be configured in local devices.\n\n>[!FOR YOUR EYES ONLY]-\n> <div class="sls-keypair">\n>\n> ### Public Key\n> ```\n${public_key}\n> ```\n>\n> ### Private Key\n> ```\n${private_key}\n> ```\n>\n> </div>\n\n>[!Both for copying]-\n>\n> <div class="sls-keypair">\n>\n> ```\n${public_key}\n${private_key}\n> ```\n>\n> </div>\n\n',
        la: 'Par clavium generavimus!\n\nNota: hoc par clavium numquam iterum monstrabitur. Quaeso id in loco tuto serva. Si id amiseris, novum par clavium generare debebis.\nNota 2: clavis publica in forma spki est, clavis privata in forma pkcs8. Commoditatis causa, lineae novae in clave publica in `\\n` convertuntur.\nNota 3: clavis publica in repositorio remoto constituenda est, clavis privata in instrumentis localibus.\n\n>[!FOR YOUR EYES ONLY]-\n> <div class="sls-keypair">\n>\n> ### Clavis publica\n> ```\n${public_key}\n> ```\n>\n> ### Clavis privata\n> ```\n${private_key}\n> ```\n>\n> </div>\n\n>[!Both for copying]-\n>\n> <div class="sls-keypair">\n>\n> ```\n${public_key}\n${private_key}\n> ```\n>\n> </div>\n\n',
        zh: '我们已经生成了一组密钥对！\n\n注意：这组密钥对之后将不会再次显示。请务必妥善保管；如果丢失，你需要重新生成新的密钥对。\n注意 2：公钥采用 spki 格式，私钥采用 pkcs8 格式。为方便复制，公钥中的换行会被转换为 `\\n`。\n注意 3：公钥应配置在远端数据库中，私钥应配置在本地设备上。\n\n>[!仅限本人查看]-\n> <div class="sls-keypair">\n>\n> ### 公钥\n> ```\n${public_key}\n> ```\n>\n> ### 私钥\n> ```\n${private_key}\n> ```\n>\n> </div>\n\n>[!整段复制]-\n>\n> <div class="sls-keypair">\n>\n> ```\n${public_key}\n${private_key}\n> ```\n>\n> </div>',
    },
    "Setting.GenerateKeyPair.Title": {
        def: "New key pair has been generated!",
        la: "Novum par clavium generatum est!",
        zh: "已生成新的密钥对！",
    },
    "Setting.TroubleShooting": {
        def: "TroubleShooting",
        la: "Difficultates solvendae",
        zh: "故障排除",
    },
    "Setting.TroubleShooting.Doctor": {
        def: "Setting Doctor",
        la: "Medicus optionum",
        zh: "设置诊断",
    },
    "Setting.TroubleShooting.Doctor.Desc": {
        def: "Detects non optimal settings. (Same as during migration)",
        la: "Optiones non optimas detegit. (Idem ac in migratione)",
        zh: "检测系统中不合理的设置。（与迁移期间逻辑相同）",
    },
    "Setting.TroubleShooting.ScanBrokenFiles": {
        def: "Scan for broken files",
        la: "Quaere plicas corruptas",
        zh: "扫描损坏或异常的文件",
    },
    "Setting.TroubleShooting.ScanBrokenFiles.Desc": {
        def: "Scans for files that are not stored correctly in the database.",
        la: "Quaerit plicas quae in repositorio recte non servatae sunt.",
        zh: "扫描数据库中未正确存储的文件。",
    },
    "SettingTab.Message.AskRebuild": {
        def: "Your changes require fetching from the remote database. Do you want to proceed?",
        la: "Mutationes tuae arcessendum ex repositorio remoto requirunt. Visne pergere?",
        zh: "Your changes require fetching from the remote database. Do you want to proceed?",
    },
    "Setup Complete: Preparing to Fetch Synchronisation Data": {
        def: "Setup Complete: Preparing to Fetch Synchronisation Data",
        la: "Constitutio perfecta: data synchronizationis arcessenda parantur",
        zh: "设置完成：正在准备获取同步数据",
    },
    "Setup Complete: Preparing to Initialise Server": {
        def: "Setup Complete: Preparing to Initialise Server",
        la: "Constitutio perfecta: initiatio ministratoris paratur",
        zh: "设置完成：正在准备初始化服务器",
    },
    "Setup URI dialog cancelled.": {
        def: "Setup URI dialog cancelled.",
        la: "Dialogus Setup URI abrogatus.",
        zh: "Setup URI 对话框已取消。",
    },
    "Setup-URI": {
        def: "Setup-URI",
        la: "Setup-URI",
        zh: "设置 URI",
    },
    "Setup.Apply.Buttons.ApplyAndFetch": {
        def: "Apply and Fetch",
        la: "Applica et arcesse",
        zh: "Apply and Fetch",
    },
    "Setup.Apply.Buttons.ApplyAndMerge": {
        def: "Apply and Merge",
        la: "Applica et confla",
        zh: "Apply and Merge",
    },
    "Setup.Apply.Buttons.ApplyAndRebuild": {
        def: "Apply and Rebuild",
        la: "Applica et reaedifica",
        zh: "Apply and Rebuild",
    },
    "Setup.Apply.Buttons.Cancel": {
        def: "Discard and Cancel",
        la: "Abice et abroga",
        zh: "Discard and Cancel",
    },
    "Setup.Apply.Buttons.OnlyApply": {
        def: "Only Apply",
        la: "Applica tantum",
        zh: "Only Apply",
    },
    "Setup.Apply.Message": {
        def: "The new configuration is ready. Let us proceed to apply it.\nThere are several ways to apply this:\n\n- Apply and Fetch\n  Configure this device as a new client. After applying, synchronise from the remote server.\n- Apply and Merge\n  Configure on a device that already has the file. It processes the local files and transfers the differences. Conflicts may arise.\n- Apply and Rebuild\n  Rebuild the remote using local files. This is typically done if the server becomes corrupted or we wish to start from scratch.\n  Other devices will be locked and required to re-fetch.\n- Only Apply\n  Apply only. Conflicts may arise if a rebuild is required.",
        la: "Nova configuratio parata est. Eam applicemus.\nPluribus modis applicari potest:\n\n- Applica et arcesse\n  Hoc instrumentum ut novum clientem constitue. Post applicationem, ex ministratore remoto synchroniza.\n- Applica et confla\n  Constitue in instrumento quod plicas iam habet. Plicas locales tractat et differentias transfert. Discrepantiae oriri possunt.\n- Applica et reaedifica\n  Remotum plicis localibus reaedifica. Hoc plerumque fit si ministrator corruptus est vel ab initio incipere volumus.\n  Alia instrumenta obserabuntur et denuo arcessere debebunt.\n- Applica tantum\n  Applica tantum. Discrepantiae oriri possunt si reaedificatio requiritur.",
        zh: "The new configuration is ready. Let us proceed to apply it.\nThere are several ways to apply this:\n\n- Apply and Fetch\n  Configure this device as a new client. After applying, synchronise from the remote server.\n- Apply and Merge\n  Configure on a device that already has the file. It processes the local files and transfers the differences. Conflicts may arise.\n- Apply and Rebuild\n  Rebuild the remote using local files. This is typically done if the server becomes corrupted or we wish to start from scratch.\n  Other devices will be locked and required to re-fetch.\n- Only Apply\n  Apply only. Conflicts may arise if a rebuild is required.",
    },
    "Setup.Apply.Title": {
        def: "Apply new configuration from the ${method}",
        la: "Applica novam configurationem ex ${method}",
        zh: "Apply new configuration from the ${method}",
    },
    "Setup.Apply.WarningRebuildRecommended": {
        def: "NOTE: after adjusting the settings, it has been determined that a rebuild is required; Just Import is not recommended.",
        la: "NOTA: optionibus accommodatis, constitutum est reaedificationem requiri; Just Import non commendatur.",
        zh: "NOTE: after adjusting the settings, it has been determined that a rebuild is required; Just Import is not recommended.",
    },
    "Setup.CopySetupURI.CommandCopy": {
        def: "Copy settings as a new setup URI",
        la: "Exscribe optiones ut novum Setup URI",
        zh: "将设置复制为新的 Setup URI",
    },
    "Setup.CopySetupURI.CommandCopyFull": {
        def: "Copy settings as a new setup URI (Full)",
        la: "Exscribe optiones ut novum Setup URI (plenum)",
        zh: "将设置复制为新的 Setup URI（完整）",
    },
    "Setup.CopySetupURI.CommandCopyWithCustomizationSync": {
        def: "Copy settings as a new setup URI (With customization sync)",
        la: "Exscribe optiones ut novum Setup URI (cum synchronizatione optionum propriarum)",
        zh: "将设置复制为新的 Setup URI（包含自定义同步）",
    },
    "Setup.CopySetupURI.Copied": {
        def: "Setup URI copied to clipboard",
        la: "Setup URI in tabellam exscriptum",
        zh: "Setup URI 已复制到剪贴板",
    },
    "Setup.CopySetupURI.ModeCompatible": {
        def: "Compatible (no time limit)",
        la: "Compatibile (sine termino temporis)",
        zh: "兼容（无时间限制）",
    },
    "Setup.CopySetupURI.ModeMessage": {
        def: "Time-bound Setup URIs can be opened until ${until}. This is the end of the current fixed seven-day UTC window, not seven days from now. Compatible URIs have no time limit and work with older clients.",
        la: "Setup URI temporaria usque ad ${until} aperiri possunt. Hic est finis fenestrae UTC fixae septem dierum currentis, non septem dies ab hoc momento. URI compatibilia terminum temporis non habent et cum clientibus vetustioribus operantur.",
        zh: "限时 Setup URI 可在 ${until} 之前打开。这是当前固定的七天 UTC 时间窗口的结束时间，而不是从现在起七天。兼容 URI 没有时间限制，并可用于旧版客户端。",
    },
    "Setup.CopySetupURI.ModeMessageNoClock": {
        def: "Time-bound Setup URIs require a valid device clock. Compatible URIs have no time limit and work with older clients.",
        la: "Setup URI temporaria horologium instrumenti validum requirunt. URI compatibilia terminum temporis non habent et cum clientibus vetustioribus operantur.",
        zh: "限时 Setup URI 需要设备时钟准确。兼容 URI 没有时间限制，并可用于旧版客户端。",
    },
    "Setup.CopySetupURI.ModeTimeBound": {
        def: "Time-bound",
        la: "Temporarium",
        zh: "限时",
    },
    "Setup.CopySetupURI.ModeTitle": {
        def: "Setup URI availability",
        la: "Spatium validitatis Setup URI",
        zh: "Setup URI 有效期",
    },
    "Setup.CopySetupURI.PassphraseLabel": {
        def: "The passphrase to encrypt the setup URI",
        la: "Tessera arcana ad Setup URI cryptandum",
        zh: "用于加密 Setup URI 的口令",
    },
    "Setup.CopySetupURI.PassphraseTitle": {
        def: "Encrypt your settings",
        la: "Crypta optiones tuas",
        zh: "加密你的设置",
    },
    "Setup.Doctor.Buttons.No": {
        def: "No, please use the settings in the URI as is",
        la: "Minime, quaeso optiones in URI ut sunt adhibe",
        zh: "No, please use the settings in the URI as is",
    },
    "Setup.Doctor.Buttons.Yes": {
        def: "Yes, please consult the doctor",
        la: "Ita, quaeso medicum consule",
        zh: "Yes, please consult the doctor",
    },
    "Setup.Doctor.Message": {
        def: "Tabularium has gradually become longer in history and some recommended settings have changed.\n\nNow, setup is a very good time to do this.\n\nDo you want to run Doctor to check if the imported settings are optimal compared to the latest state?",
        la: "Tabularium paulatim longiorem historiam habet, et quaedam optiones commendatae mutatae sunt.\n\nNunc, in constitutione, tempus optimum est ad hoc faciendum.\n\nVisne medicum currere ut inspicias num optiones importatae, cum statu novissimo comparatae, optimae sint?",
        zh: "Tabularium has gradually become longer in history and some recommended settings have changed.\n\nNow, setup is a very good time to do this.\n\nDo you want to run Doctor to check if the imported settings are optimal compared to the latest state?",
    },
    "Setup.Doctor.Title": {
        def: "Do you want to consult the doctor?",
        la: "Visne medicum consulere?",
        zh: "Do you want to consult the doctor?",
    },
    "Setup.FetchRemoteConf.Buttons.Fetch": {
        def: "Yes, please fetch the configuration",
        la: "Ita, quaeso configurationem arcesse",
        zh: "Yes, please fetch the configuration",
    },
    "Setup.FetchRemoteConf.Buttons.Skip": {
        def: "No, please use the settings in the URI",
        la: "Minime, quaeso optiones in URI adhibe",
        zh: "No, please use the settings in the URI",
    },
    "Setup.FetchRemoteConf.Message": {
        def: "If we have already synchronised once with another device, the remote database stores the suitable configuration values between the synchronised devices. The plug-in would like to retrieve them for robust configuration.\n\nHowever, we have to make sure the one thing. Are we currently in a situation where we can access the network safely and retrieve the settings?\n\nNote: Mostly, you are safe to do this, that your remote database is hosted with a SSL certificate, and your network is not compromised.",
        la: "Si iam semel cum alio instrumento synchronizavimus, repositorium remotum valores configurationis aptos inter instrumenta synchronizata servat. Additamentum eos recipere velit ad configurationem firmam.\n\nUnum tamen certum habere debemus. Suntne nunc condiciones in quibus rete tuto adire et optiones recipere possumus?\n\nNota: plerumque hoc tuto facere potes, si repositorium tuum remotum cum certificato SSL hospitatur et rete tuum non violatum est.",
        zh: "If we have already synchronised once with another device, the remote database stores the suitable configuration values between the synchronised devices. The plug-in would like to retrieve them for robust configuration.\n\nHowever, we have to make sure the one thing. Are we currently in a situation where we can access the network safely and retrieve the settings?\n\nNote: Mostly, you are safe to do this, that your remote database is hosted with a SSL certificate, and your network is not compromised.",
    },
    "Setup.FetchRemoteConf.Title": {
        def: "Fetch configuration from remote database?",
        la: "Visne configurationem ex repositorio remoto arcessere?",
        zh: "Fetch configuration from remote database?",
    },
    "Setup.Manager.applyCancelled": {
        def: "User cancelled applying settings from wizard.",
        la: "Usor applicationem optionum ex ductore abrogavit.",
        zh: "用户已取消应用向导中的设置。",
    },
    "Setup.Manager.e2eeConfigurationCancelled": {
        def: "E2EE configuration cancelled.",
        la: "Configuratio E2EE abrogata.",
        zh: "已取消 E2EE 配置。",
    },
    "Setup.Manager.EncryptInternalMetadata.Buttons.Proceed": {
        def: "Enable without rebuilding — update every other device first",
        la: "Activa sine reaedificatione — prius omnia alia instrumenta renova",
        zh: "不重建直接启用——请先更新其他所有设备",
    },
    "Setup.Manager.EncryptInternalMetadata.Message": {
        def: "A manual remote Rebuild is strongly recommended to protect existing file properties. Before continuing without rebuilding, update every other synchronising device to a version which supports this option, including devices currently running Tabularium. Existing properties remain unchanged until they are rewritten or rebuilt.",
        la: "Reaedificatio remoti manualis vehementer commendatur ut proprietates plicarum exstantes protegantur. Antequam sine reaedificatione pergas, omnia alia instrumenta synchronizantia ad versionem quae hanc optionem sustinet renova, etiam instrumenta quae nunc Tabularium exsequuntur. Proprietates exstantes immutatae manent donec rescribantur vel reaedificentur.",
        zh: "强烈建议手动重建远程，以保护已有的文件属性。如果不重建就继续，请先将其他所有正在同步的设备更新到支持此选项的版本，包括当前运行 Tabularium 的设备。已有属性在被重写或重建之前保持不变。",
    },
    "Setup.Manager.EncryptInternalMetadata.Title": {
        def: "Encrypt internal file Properties",
        la: "Crypta proprietates internas plicarum",
        zh: "加密内部文件属性",
    },
    "Setup.Manager.manualConfigurationCancelled": {
        def: "Manual configuration cancelled.",
        la: "Configuratio manualis abrogata.",
        zh: "已取消手动配置。",
    },
    "Setup.Manager.noChangesDetected": {
        def: "No changes in settings detected. Skipping applying settings from wizard.",
        la: "Nullae mutationes optionum inventae. Applicatio optionum ex ductore omittitur.",
        zh: "未检测到设置变更。跳过应用向导中的设置。",
    },
    "Setup.Manager.onboardingCancelled": {
        def: "Onboarding cancelled by user.",
        la: "Introductio ab usore abrogata.",
        zh: "用户已取消初始设置。",
    },
    "Setup.Manager.qrDecodeFailed": {
        def: "The QR configuration could not be decoded or contains unsupported settings.",
        la: "Configuratio QR decodari non potuit vel optiones non sustentas continet.",
        zh: "无法解码该二维码配置，或其中包含不受支持的设置。",
    },
    "Setup.Manager.settingApplied": {
        def: "Setting Applied",
        la: "Optio applicata",
        zh: "设置已应用",
    },
    "Setup.Manager.wizardSettingsApplied": {
        def: "Settings from wizard applied.",
        la: "Optiones ex ductore applicatae.",
        zh: "已应用向导中的设置。",
    },
    "Setup.QRCode": {
        def: 'We have generated a QR code to transfer the settings. Please scan the QR code with your phone or other device.\nNote: The QR code is not encrypted, so be careful to open this.\n\n>[!FOR YOUR EYES ONLY]-\n> <div class="sls-qr">${qr_image}</div>',
        la: 'Codicem QR ad optiones transferendas generavimus. Quaeso codicem QR telephono tuo vel alio instrumento lege.\nNota: codex QR non cryptatus est, ergo cave cum hoc aperis.\n\n>[!FOR YOUR EYES ONLY]-\n> <div class="sls-qr">${qr_image}</div>',
        zh: 'We have generated a QR code to transfer the settings. Please scan the QR code with your phone or other device.\nNote: The QR code is not encrypted, so be careful to open this.\n\n>[!FOR YOUR EYES ONLY]-\n> <div class="sls-qr">${qr_image}</div>',
    },
    "Setup.QRCodeAggregated": {
        def: "The setting is too large for a single QR code.\nWe are using the aggregator to combine multiple QR codes.\nYour settings will not be sent to any server; they will be processed only on your device.\nPlease scan this QR code with your mobile's camera, and open the page in your browser.\nAfter all parts are collected, the page will navigate you back to Obsidian with the aggregated settings.\n\nProgress: ${current} / ${total}\n${part}",
        la: "Optio nimis magna est pro uno codice QR.\nAggregatore utimur ut plures codices QR coniungamus.\nOptiones tuae ad nullum ministratorem mittentur; in instrumento tuo tantum tractabuntur.\nQuaeso hunc codicem QR camera instrumenti mobilis tui perlege, et paginam in navigatro tuo aperi.\nPostquam omnes partes collectae sunt, pagina te ad Obsidian cum optionibus aggregatis reducet.\n\nProgressus: ${current} / ${total}\n${part}",
        zh: "设置内容过大，无法放入单个二维码。\n我们将使用聚合器组合多个二维码。\n你的设置不会发送到任何服务器，只会在你的设备上处理。\n请用手机相机扫描此二维码，并在浏览器中打开页面。\n收集完所有部分后，该页面会带着聚合后的设置跳转回 Obsidian。\n\n进度：${current} / ${total}\n${part}",
    },
    "Setup.QRCodeAggregatedTitle": {
        def: "Settings QR Code (Aggregated)",
        la: "Codex QR optionum (aggregatus)",
        zh: "设置二维码（聚合）",
    },
    "Setup.QRCodeTitle": {
        def: "Settings QR Code",
        la: "Codex QR optionum",
        zh: "设置二维码",
    },
    "Setup.RemoteE2EE.AdvancedTitle": {
        def: "Advanced",
        la: "Provecta",
        zh: "高级",
    },
    "Setup.RemoteE2EE.AlgorithmWarning": {
        def: "Changing the encryption algorithm will prevent access to any data previously encrypted with a different algorithm. Ensure that all your devices are configured to use the same algorithm to maintain access to your data.",
        la: "Algorithmum cryptationis mutare accessum ad omnia data antea alio algorithmo cryptata impediet. Cura ut omnia instrumenta tua eodem algorithmo utantur, ut accessum ad data tua serves.",
        zh: "更改加密算法会导致之前使用其他算法加密的数据无法访问。请确保所有设备都配置为使用同一算法，以保持对数据的访问能力。",
    },
    "Setup.RemoteE2EE.ButtonCancel": {
        def: "Cancel",
        la: "Abroga",
        zh: "取消",
    },
    "Setup.RemoteE2EE.ButtonProceed": {
        def: "Proceed",
        la: "Perge",
        zh: "继续",
    },
    "Setup.RemoteE2EE.DefaultAlgorithmDesc": {
        def: "In most cases, you should stick with the default algorithm (${algorithm}). This setting is only required if you have an existing Vault encrypted in a different format.",
        la: "Plerumque algorithmum praedefinitum (${algorithm}) retinere debes. Haec optio solum requiritur si tabularium exstans in alia forma cryptatum habes.",
        zh: "在大多数情况下，你应继续使用默认算法（${algorithm}）。只有当你已有一个采用不同格式加密的 Vault 时，才需要调整此设置。",
    },
    "Setup.RemoteE2EE.Guidance": {
        def: "Please configure your end-to-end encryption settings.",
        la: "Quaeso optiones cryptationis ab extremo ad extremum constitue.",
        zh: "请配置你的端到端加密设置。",
    },
    "Setup.RemoteE2EE.LabelEncrypt": {
        def: "End-to-End Encryption",
        la: "Cryptatio ab extremo ad extremum",
        zh: "端到端加密",
    },
    "Setup.RemoteE2EE.LabelEncryptionAlgorithm": {
        def: "Encryption Algorithm",
        la: "Algorithmus cryptationis",
        zh: "加密算法",
    },
    "Setup.RemoteE2EE.LabelObfuscateProperties": {
        def: "Obfuscate Properties",
        la: "Obscura proprietates",
        zh: "混淆属性",
    },
    "Setup.RemoteE2EE.MultiDestinationWarning": {
        def: "This setting must be the same even when connecting to multiple synchronisation destinations.",
        la: "Haec optio eadem esse debet etiam cum ad plures destinationes synchronizationis conecteris.",
        zh: "即使连接到多个同步目标，此设置也必须保持一致。",
    },
    "Setup.RemoteE2EE.ObfuscatePropertiesDesc": {
        def: "Obfuscating properties (e.g., path of file, size, creation and modification dates) adds an additional layer of security by making it harder to identify the structure and names of your files and folders on the remote server. This helps protect your privacy and makes it more difficult for unauthorized users to infer information about your data.",
        la: "Proprietates obscurare (e.g., viam plicae, magnitudinem, dies creationis et mutationis) gradum securitatis addit, quia difficilius fit structuram et nomina plicarum thecarumque tuarum in ministratore remoto agnoscere. Hoc secretum tuum tuetur et usoribus non permissis difficilius reddit aliquid de datis tuis colligere.",
        zh: "混淆属性（例如文件路径、大小、创建和修改日期）可以增加一层额外保护，使远程服务器上的文件与文件夹结构及名称更难被识别。这有助于保护你的隐私，也让未授权用户更难推断你的数据相关信息。",
    },
    "Setup.RemoteE2EE.PassphraseValidationLine1": {
        def: "Please be aware that the End-to-End Encryption passphrase is not validated until the synchronisation process actually commences. This is a security measure designed to protect your data.",
        la: "Quaeso animadverte tesseram arcanam cryptationis ab extremo ad extremum non probari donec processus synchronizationis re vera incipiat. Haec est mensura securitatis ad data tua tuenda destinata.",
        zh: "请注意，在同步过程真正开始之前，端到端加密密码短语不会被校验。这是一项用于保护你数据的安全措施。",
    },
    "Setup.RemoteE2EE.PassphraseValidationLine2": {
        def: "Therefore, we ask that you exercise extreme caution when configuring server information manually. If an incorrect passphrase is entered, the data on the server will become corrupted. Please understand that this is intended behaviour.",
        la: "Itaque rogamus ut summa cum cautela notitias ministratoris manu constituas. Si tessera arcana falsa inseritur, data in ministratore corrumpentur. Quaeso intellege hoc consulto ita agere.",
        zh: "因此，在手动配置服务器信息时请务必格外小心。如果输入了错误的密码短语，服务器上的数据将会损坏。请理解这属于预期行为。",
    },
    "Setup.RemoteE2EE.PlaceholderPassphrase": {
        def: "Enter your passphrase",
        la: "Insere tesseram arcanam tuam",
        zh: "输入你的密码短语",
    },
    "Setup.RemoteE2EE.StronglyRecommendedLine1": {
        def: "Enabling end-to-end encryption ensures that your data is encrypted on your device before being sent to the remote server. This means that even if someone gains access to the server, they won't be able to read your data without the passphrase. Make sure to remember your passphrase, as it will be required to decrypt your data on other devices.",
        la: "Cryptatio ab extremo ad extremum activata efficit ut data tua in instrumento tuo cryptentur antequam ad ministratorem remotum mittantur. Hoc significat, etiam si quis accessum ad ministratorem obtineat, eum data tua sine tessera arcana legere non posse. Cura ut tesseram arcanam memineris, nam ad data tua in aliis instrumentis decryptanda requiretur.",
        zh: "启用端到端加密后，数据会先在你的设备上加密，再发送到远程服务器。这意味着即使有人获得了服务器访问权限，没有密码短语也无法读取你的数据。请务必记住你的密码短语，因为在其他设备上解密数据时也需要它。",
    },
    "Setup.RemoteE2EE.StronglyRecommendedLine2": {
        def: "Also, please note that if you are using Peer-to-Peer synchronization, this configuration will be used when you switch to other methods and connect to a remote server in the future.",
        la: "Item, quaeso nota, si synchronizatione inter pares uteris, hanc configurationem adhibitum iri cum in futuro ad alios modos transibis et ad ministratorem remotum conecteris.",
        zh: "另外请注意，如果你正在使用 Peer-to-Peer 同步，当你以后切换到其他同步方式并连接远程服务器时，也会使用这组配置。",
    },
    "Setup.RemoteE2EE.StronglyRecommendedTitle": {
        def: "Strongly Recommended",
        la: "Valde commendatur",
        zh: "强烈推荐",
    },
    "Setup.RemoteE2EE.Title": {
        def: "End-to-End Encryption",
        la: "Cryptatio ab extremo ad extremum",
        zh: "端到端加密",
    },
    "Setup.ScanQRCode.ButtonClose": {
        def: "Close this dialog",
        la: "Claude hunc dialogum",
        zh: "关闭此对话框",
    },
    "Setup.ScanQRCode.Guidance": {
        def: "Please follow the steps below to import settings from your existing device.",
        la: "Quaeso gradus infra sequere ut optiones ex instrumento tuo exstante importes.",
        zh: "请按照以下步骤从现有设备导入设置。",
    },
    "Setup.ScanQRCode.Step1": {
        def: "On this device, please keep this Vault open.",
        la: "In hoc instrumento, quaeso hoc tabularium apertum tene.",
        zh: "在这台设备上，请保持此 Vault 处于打开状态。",
    },
    "Setup.ScanQRCode.Step2": {
        def: "On the source device, open Obsidian.",
        la: "In instrumento fontis, Obsidian aperi.",
        zh: "在源设备上打开 Obsidian。",
    },
    "Setup.ScanQRCode.Step3": {
        def: "On the source device, from the command palette, run the 'Show settings as a QR code' command.",
        la: "In instrumento fontis, ex indice mandatorum, mandatum 'Show settings as a QR code' exsequere.",
        zh: "在源设备上，从命令面板运行“将设置显示为二维码”命令。",
    },
    "Setup.ScanQRCode.Step4": {
        def: "On this device, switch to the camera app or use a QR code scanner to scan the displayed QR code.",
        la: "In hoc instrumento, ad applicationem camerae transi vel lectore QR codicum utere ut codicem QR monstratum legas.",
        zh: "在这台设备上，切换到相机应用或使用二维码扫描器扫描显示出的二维码。",
    },
    "Setup.ScanQRCode.Title": {
        def: "Scan QR Code",
        la: "Lege codicem QR",
        zh: "扫描二维码",
    },
    "Setup.ShowQRCode": {
        def: "Show QR code",
        la: "Monstra codicem QR",
        zh: "使用QR码",
    },
    "Setup.ShowQRCode.Desc": {
        def: "Show QR code to transfer the settings.",
        la: "Monstra codicem QR ad optiones transferendas.",
        zh: "使用QR码来传递配置",
    },
    "Setup.UseSetupURI.ButtonCancel": {
        def: "Cancel",
        la: "Abroga",
        zh: "取消",
    },
    "Setup.UseSetupURI.ButtonProceed": {
        def: "Test Settings and Continue",
        la: "Proba optiones et perge",
        zh: "测试设置并继续",
    },
    "Setup.UseSetupURI.ErrorFailedToParse": {
        def: "Failed to parse the Setup URI. Please check the URI and passphrase.",
        la: "Setup URI resolvi non potuit. Quaeso URI et tesseram arcanam inspice.",
        zh: "无法解析 Setup URI，请检查 URI 和密码短语。",
    },
    "Setup.UseSetupURI.ErrorPassphraseRequired": {
        def: "Please enter the vault passphrase.",
        la: "Quaeso tesseram arcanam tabularii insere.",
        zh: "请输入 Vault 密码短语。",
    },
    "Setup.UseSetupURI.GuidanceLine1": {
        def: "Please enter the Setup URI that was generated during server installation or on another device, along with the vault passphrase.",
        la: "Quaeso insere Setup URI quod in ministratore instituendo vel in alio instrumento generatum est, una cum tessera arcana tabularii.",
        zh: "请输入在服务器安装期间或另一台设备上生成的 Setup URI，以及 Vault 密码短语。",
    },
    "Setup.UseSetupURI.GuidanceLine2": {
        def: 'Note that you can generate a new Setup URI by running the "Copy settings as a new Setup URI" command in the command palette.',
        la: "Nota te novum Setup URI generare posse mandatum “Copy settings as a new Setup URI” in indice mandatorum exsequendo.",
        zh: "你可以在命令面板中运行“将设置复制为新的 Setup URI”命令来生成新的 Setup URI。",
    },
    "Setup.UseSetupURI.InvalidInfo": {
        def: "The Setup URI is invalid. Please check it and try again.",
        la: "Setup URI invalidum est. Quaeso id inspice et iterum conare.",
        zh: "Setup URI 无效，请检查后重试。",
    },
    "Setup.UseSetupURI.LabelPassphrase": {
        def: "Vault passphrase",
        la: "Tessera arcana tabularii",
        zh: "Vault 密码短语",
    },
    "Setup.UseSetupURI.LabelSetupURI": {
        def: "Setup URI",
        la: "Setup URI",
        zh: "Setup URI",
    },
    "Setup.UseSetupURI.PlaceholderPassphrase": {
        def: "Enter your vault passphrase",
        la: "Insere tesseram arcanam tabularii tui",
        zh: "输入 Vault 密码短语",
    },
    "Setup.UseSetupURI.Title": {
        def: "Enter Setup URI",
        la: "Insere Setup URI",
        zh: "输入 Setup URI",
    },
    "Setup.UseSetupURI.ValidInfo": {
        def: "The Setup URI is valid and ready to use.",
        la: "Setup URI validum et ad usum paratum est.",
        zh: "Setup URI 有效，可以使用。",
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
    "Show customization sync dialog": {
        def: "Show customization sync dialog",
        la: "Monstra dialogum synchronizationis personalizationis",
        zh: "显示自定义同步对话框",
    },
    "Show full banner": {
        def: "Show full banner",
        la: "Monstra vexillum plenum",
        zh: "显示完整横幅",
    },
    "Show history": {
        def: "Show history",
        la: "Monstra historiam",
        zh: "显示历史记录",
    },
    "Show icon only": {
        def: "Show icon only",
        la: "Monstra iconem tantum",
        zh: "仅显示图标",
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
    "Show password": {
        def: "Show password",
        la: "Monstra tesseram",
        zh: "显示密码",
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
    "Signaling Server Connection": {
        def: "Signaling Server Connection",
        la: "Conexio ministratoris signorum",
        zh: "信令服务器连接",
    },
    "Signalling Status": {
        def: "Signalling Status",
        la: "Status signorum",
        zh: "信令状态",
    },
    "Since you have chosen to overwrite all local files with remote data, **how would you like to handle local files that are not present in the remote database?**\n\n- **${DELETE_ALL}**: Local-only files and remote-deleted files will be removed.\n  This option will make your local vault exactly the same as the remote database, but please make sure you have a backup if there is any important data in your vault.\n- **${DELETE_NONE}**: All existing local files will be preserved.\n  This option will keep all your local files, but it may cause duplicates if there are files that exist on local but not on remote. You can clean up these duplicates manually after the synchronisation.":
        {
            def: "Since you have chosen to overwrite all local files with remote data, **how would you like to handle local files that are not present in the remote database?**\n\n- **${DELETE_ALL}**: Local-only files and remote-deleted files will be removed.\n  This option will make your local vault exactly the same as the remote database, but please make sure you have a backup if there is any important data in your vault.\n- **${DELETE_NONE}**: All existing local files will be preserved.\n  This option will keep all your local files, but it may cause duplicates if there are files that exist on local but not on remote. You can clean up these duplicates manually after the synchronisation.",
            la: "Quoniam omnes plicas locales datis remotis superscribere elegisti, **quomodo plicas locales tractare vis quae in repositorio remoto non adsunt?**\n\n- **${DELETE_ALL}**: plicae solum locales et plicae remote deletae removebuntur.\n  Haec optio tabularium tuum locale prorsus idem ac repositorium remotum reddet, sed quaeso cura ut exemplar tutelae habeas si qua data gravia in tabulario tuo sunt.\n- **${DELETE_NONE}**: omnes plicae locales exstantes servabuntur.\n  Haec optio omnes plicas tuas locales servabit, sed duplicata efficere potest si plicae localiter sed non remote exstant. Haec duplicata post synchronizationem manu purgare potes.",
            zh: "由于你选择了用远程数据覆盖所有本地文件，**远程数据库中不存在的本地文件应如何处理？**\n\n- **${DELETE_ALL}**：删除仅存在于本地的文件和远程已删除的文件。\n  此选项会让本地笔记库与远程数据库完全一致，但如果笔记库中有重要数据，请确保已做好备份。\n- **${DELETE_NONE}**：保留所有现有的本地文件。\n  此选项会保留所有本地文件，但如果有文件只存在于本地而不在远程，可能会产生重复。同步完成后可以手动清理这些重复文件。",
        },
    "Skip and close": {
        def: "Skip and close",
        la: "Praetermitte et claude",
        zh: "跳过并关闭",
    },
    Snippets: {
        def: "Snippets",
        la: "Excerpta",
        zh: "代码片段",
    },
    "Some devices have differing progress values (max: ${maxProgress}, min: ${minProgress}).\nThis may indicate that some devices have not completed synchronisation, which could lead to conflicts. Strongly recommend confirming that all devices are synchronised before proceeding.":
        {
            def: "Some devices have differing progress values (max: ${maxProgress}, min: ${minProgress}).\nThis may indicate that some devices have not completed synchronisation, which could lead to conflicts. Strongly recommend confirming that all devices are synchronised before proceeding.",
            la: "Quaedam instrumenta valores progressus diversos habent (max: ${maxProgress}, min: ${minProgress}).\nHoc indicare potest quaedam instrumenta synchronizationem non perfecisse, quod ad discrepantias ducere potest. Valde commendatur ut confirmes omnia instrumenta synchronizata esse antequam pergas.",
            zh: "某些设备的进度值不同（最大：${maxProgress}，最小：${minProgress}）。\n这可能表示某些设备尚未完成同步，从而可能引发冲突。强烈建议在继续之前先确认所有设备都已同步。",
        },
    "Some files failed to synchronise. What would you like to do?": {
        def: "Some files failed to synchronise. What would you like to do?",
        la: "Quaedam plicae synchronizari non potuerunt. Quid facere vis?",
        zh: "部分文件同步失败。你想怎么做？",
    },
    "Start Broadcasting": {
        def: "Start Broadcasting",
        la: "Incipe emittere",
        zh: "开始广播",
    },
    "Start change-broadcasting on Connect": {
        def: "Start change-broadcasting on Connect",
        la: "Incipe mutationes emittere cum conectitur",
        zh: "连接时开始广播变更",
    },
    "Start live": {
        def: "Start live",
        la: "Incipe continuam",
        zh: "开始实时",
    },
    "Start Sync & Close": {
        def: "Start Sync & Close",
        la: "Incipe synchronizationem et claude",
        zh: "开始同步并关闭",
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
    "Stop Broadcasting": {
        def: "Stop Broadcasting",
        la: "Desine emittere",
        zh: "停止广播",
    },
    "Stop live": {
        def: "Stop live",
        la: "Siste continuam",
        zh: "停止实时",
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
    "Storage -> Database": {
        def: "Storage -> Database",
        la: "Repositorium plicarum -> Repositorium datorum",
        zh: "存储 → 数据库",
    },
    "Strongly Recommended": {
        def: "Strongly Recommended",
        la: "Valde commendatur",
        zh: "强烈推荐",
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
    "Switch to IDB": {
        def: "Switch to IDB",
        la: "Transi ad IDB",
        zh: "切换到 IDB",
    },
    "Switch to IndexedDB": {
        def: "Switch to IndexedDB",
        la: "Transi ad IndexedDB",
        zh: "切换到 IndexedDB",
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
    "Sync once": {
        def: "Sync once",
        la: "Synchroniza semel",
        zh: "同步一次",
    },
    "Synchronisation Issues Detected": {
        def: "Synchronisation Issues Detected",
        la: "Difficultates synchronizationis detectae",
        zh: "检测到同步问题",
    },
    "Synchronisation utilising journal files. You must have set up an S3/MinIO/R2 compatible object storage.": {
        def: "Synchronisation utilising journal files. You must have set up an S3/MinIO/R2 compatible object storage.",
        la: "Synchronizatio plicis diarii utens. Repositorium obiectorum cum S3/MinIO/R2 congruens constituisse debes.",
        zh: "通过日志文件进行同步。你需要事先部署好兼容 S3/MinIO/R2 的对象存储服务。",
    },
    "Synchronising files": {
        def: "Synchronising files",
        la: "Plicae synchronizantur",
        zh: "同步文件",
    },
    Syncing: {
        def: "Syncing",
        la: "Synchronizatio fit",
        zh: "同步中",
    },
    "Syncing...": {
        def: "Syncing...",
        la: "Synchronizatio fit...",
        zh: "同步中…",
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
        la: "Statum traditionis Kindle inspice. Commentarios vel thecas in indice plicarum dextro puncto preme (plures eligi possunt) ut mittas.",
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
        def: "The server has no mail delivery configured.",
        la: "Ministrator nullam traditionem epistularum configuratam habet.",
        zh: "服务器尚未配置发信。",
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
    "tabularium.sorting.command": {
        def: "Open file sorting settings",
        la: "Aperi optiones ordinandi plicas",
        zh: "打开文件排序设置",
    },
    "tabularium.sorting.pause": {
        def: "Pause",
        la: "Intermitte",
        zh: "暂停",
    },
    "tabularium.sorting.settingDesc": {
        def: "Arrange notes and folders using sorting rules or bookmarks.",
        la: "Commentarios et thecas secundum regulas ordinandi vel signacula dispone.",
        zh: "按排序规则或书签排列笔记和文件夹。",
    },
    "tabularium.sorting.standalone": {
        def: "Disable the standalone Custom Sort plug-in, then reload Tabularium to use its built-in file sorting.",
        la: "Deactiva additamentum separatum Custom Sort, deinde Tabularium iterum onera ut ordinatione plicarum interna utaris.",
        zh: "请先停用独立的 Custom Sort 插件，然后重新加载 Tabularium 以使用内置的文件排序。",
    },
    "tabularium.sorting.title": {
        def: "Tabularium file sorting",
        la: "Ordinatio plicarum Tabularium",
        zh: "Tabularium 文件排序",
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
    "Target patterns": {
        def: "Target patterns",
        la: "Exemplaria quaerenda",
        zh: "目标模式",
    },
    "Test connection and save": {
        def: "Test connection and save",
        la: "Proba conexionem et serva",
        zh: "测试连接并保存",
    },
    "Test Settings and Continue": {
        def: "Test Settings and Continue",
        la: "Proba optiones et perge",
        zh: "测试设置并继续",
    },
    "Testing only - Resolve file conflicts by syncing newer copies of the file, this can overwrite modified files. Be Warned.":
        {
            def: "Testing only - Resolve file conflicts by syncing newer copies of the file, this can overwrite modified files. Be Warned.",
            la: "Probationi tantum - Discrepantias plicarum solve synchronizando recentiora plicarum exemplaria; hoc plicas mutatas superscribere potest. Cave.",
            zh: "仅供测试 - 通过同步文件的较新副本来解决文件冲突,这可能会覆盖修改过的文件。请注意 ",
        },
    "The connection test cannot add a signalling relay while P2P is active. Use the active relay settings, or disconnect P2P before testing.":
        {
            def: "The connection test cannot add a signalling relay while P2P is active. Use the active relay settings, or disconnect P2P before testing.",
            la: "Probatio conexionis relay signorum addere non potest dum P2P activum est. Optiones relay activi adhibe, aut P2P ante probationem disiunge.",
            zh: "P2P 处于活动状态时，连接测试无法添加信令中继。请使用当前生效的中继设置，或先断开 P2P 再测试。",
        },
    "The connection to the server has been configured successfully. As the next step,": {
        def: "The connection to the server has been configured successfully. As the next step,",
        la: "Conexio cum ministratore feliciter constituta est. Proximo gradu,",
        zh: "与服务器的连接已配置成功。下一步，",
    },
    "The delay for consecutive on-demand fetches": {
        def: "The delay for consecutive on-demand fetches",
        la: "Mora inter arcessiones postulatas continuas",
        zh: "连续按需获取的延迟",
    },
    "The files in this Vault are almost identical to the server's.": {
        def: "The files in this Vault are almost identical to the server's.",
        la: "Plicae in hoc tabulario fere eaedem sunt atque eae ministratoris.",
        zh: "本库中的文件与服务器上的几乎一致。",
    },
    "The following accepted nodes are missing its node information:\n- ${missingNodes}\n\nThis indicates that they have not been connected for some time or have been left on an older version.\nIt is preferable to update all devices if possible. If you have any devices that are no longer in use, you can clear all accepted nodes by locking the remote once.":
        {
            def: "The following accepted nodes are missing its node information:\n- ${missingNodes}\n\nThis indicates that they have not been connected for some time or have been left on an older version.\nIt is preferable to update all devices if possible. If you have any devices that are no longer in use, you can clear all accepted nodes by locking the remote once.",
            la: "Nodis acceptis sequentibus notitia nodi deest:\n- ${missingNodes}\n\nHoc significat eos aliquamdiu non conexos esse aut in versione vetustiore relictos.\nPraestat, si fieri potest, omnia instrumenta renovare. Si qua instrumenta iam non adhibes, omnes nodos acceptos purgare potes remotum semel obserando.",
            zh: "以下已接受节点缺少节点信息：\n- ${missingNodes}\n\n这表示它们已有一段时间未连接，或仍停留在较旧版本。\n如有可能，建议先更新所有设备。如果有已不再使用的设备，可以先锁定一次远程端以清除全部已接受节点。",
        },
    "The Group ID and passphrase are used to identify your group of devices. Make sure to use the same Group ID and passphrase on all devices you want to synchronise.":
        {
            def: "The Group ID and passphrase are used to identify your group of devices. Make sure to use the same Group ID and passphrase on all devices you want to synchronise.",
            la: "Identificatio gregis et tessera arcana ad gregem instrumentorum tuorum agnoscendum adhibentur. Cura ut eadem identificatio gregis et eadem tessera arcana in omnibus instrumentis quae synchronizare vis adhibeantur.",
            zh: "组 ID 和密码短语用于标识你的设备组。请确保所有要同步的设备都使用相同的组 ID 和密码短语。",
        },
    "The Hash algorithm for chunk IDs": {
        def: "The Hash algorithm for chunk IDs",
        la: "Algorithmus hash ad identificationes fragmentorum",
        zh: "块 ID 的哈希算法(实验性)",
    },
    "The IndexedDB adapter often offers superior performance in certain scenarios, but it has been found to cause memory leaks when used with LiveSync mode. When using LiveSync mode, please use IDB adapter instead.":
        {
            def: "The IndexedDB adapter often offers superior performance in certain scenarios, but it has been found to cause memory leaks when used with Tabularium mode. When using Tabularium mode, please use IDB adapter instead.",
            la: "Adaptator IndexedDB in quibusdam condicionibus saepe celerius operatur, sed repertum est eum, cum synchronizatio viva adhibetur, memoriam perdere. Cum synchronizatione viva uteris, adaptatorem IDB potius adhibe.",
            zh: "IndexedDB 适配器在某些场景下性能更好，但已发现与实时同步模式同用时会造成内存泄漏。使用实时同步模式时，请改用 IDB 适配器。",
        },
    "the latest synchronisation data will be downloaded from the server to this device.": {
        def: "the latest synchronisation data will be downloaded from the server to this device.",
        la: "data synchronizationis novissima ex ministratore in hoc instrumentum deorsum ferentur.",
        zh: "最新的同步数据将从服务器下载到本设备。",
    },
    "the local database, that is to say the synchronisation information, must be reconstituted.": {
        def: "the local database, that is to say the synchronisation information, must be reconstituted.",
        la: "repositorium locale, id est notitia synchronizationis, reconstituendum est.",
        zh: "本地数据库（即同步信息）必须重建。",
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
    "The remote database is locked for synchronisation to prevent vault corruption because this device is not marked as 'resolved'. Please back up your vault, reset the local database, and select 'Mark this device as resolved'. This warning will persist until replication confirms the device is resolved.":
        {
            def: "The remote database is locked for synchronisation to prevent vault corruption because this device is not marked as 'resolved'. Please back up your vault, reset the local database, and select 'Mark this device as resolved'. This warning will persist until replication confirms the device is resolved.",
            la: "Repositorium remotum ad synchronizationem obseratum est ne tabularium corrumpatur, quia hoc instrumentum ut 'resolved' notatum non est. Tabularium tuum tuto exscribe, repositorium localem restitue, et 'Mark this device as resolved' selige. Hoc monitum manebit donec replicatio confirmet instrumentum resolutum esse.",
            zh: "为防止数据仓库损坏，由于此设备尚未标记为“已确认”，远程数据库已被锁定，暂停同步。请先备份你的仓库、重置本地数据库，然后选择“将此设备标记为已确认”。在复制过程确认此设备已完成确认之前，此警告会持续显示。",
        },
    "The remote is already set up, and the configuration is compatible (or got compatible by this operation).": {
        def: "The remote is already set up, and the configuration is compatible (or got compatible by this operation).",
        la: "Remotum iam paratum est, et configuratio congruit (aut hac operatione congruens facta est).",
        zh: "远端已设置好，且配置兼容（或经此操作后已兼容）。",
    },
    "The Setup-URI does not appear to be valid. Please check that you have copied it correctly.": {
        def: "The Setup-URI does not appear to be valid. Please check that you have copied it correctly.",
        la: "Setup-URI validum esse non videtur. Inspice num recte id exscripseris.",
        zh: "设置 URI 似乎无效。请检查是否完整复制。",
    },
    "The Setup-URI is valid and ready to use.": {
        def: "The Setup-URI is valid and ready to use.",
        la: "Setup-URI validum est et ad usum paratum.",
        zh: "设置 URI 有效，可以使用。",
    },
    "the single, authoritative master copy": {
        def: "the single, authoritative master copy",
        la: "unicum et auctoritativum exemplar principale",
        zh: "唯一的权威主副本",
    },
    "the synchronisation data on the server will be built based on the current data on this device.": {
        def: "the synchronisation data on the server will be built based on the current data on this device.",
        la: "data synchronizationis in ministratore ex datis praesentibus huius instrumenti aedificabuntur.",
        zh: "服务器上的同步数据将基于本设备的当前数据构建。",
    },
    Themes: {
        def: "Themes",
        la: "Themata",
        zh: "主题",
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
    "Therefore, we ask that you exercise extreme caution when configuring server information manually. If an incorrect passphrase is entered, the data on the server will become corrupted.":
        {
            def: "Therefore, we ask that you exercise extreme caution when configuring server information manually. If an incorrect passphrase is entered, the data on the server will become corrupted.",
            la: "Quare rogamus ut summa cautione utaris cum notitiam ministratoris manu configuras. Si tessera arcana falsa inscribitur, data in ministratore corrumpentur.",
            zh: "因此，我们要求你在手动配置服务器信息时格外小心。如果输入了错误的密码短语，服务器上的数据将会损坏。",
        },
    "This can isolate your connections between devices. Use the same Room ID for the same devices.": {
        def: "This can isolate your connections between devices. Use the same Room ID for the same devices.",
        la: "Hoc conexiones inter instrumenta segregare potest. Eandem identificationem conclavis in eisdem instrumentis adhibe.",
        zh: "这可以隔离设备之间的连接。同一组设备请使用相同的房间 ID。",
    },
    "This device": {
        def: "This device",
        la: "Hoc instrumentum",
        zh: "本设备",
    },
    "This device name": {
        def: "This device name",
        la: "Nomen huius instrumenti",
        zh: "本设备名称",
    },
    "This feature enables direct synchronisation between devices. No server is required, but both devices must be online at the same time for synchronisation to occur, and some features may be limited. Internet connection is only required to signalling (detecting peers) and not for data transfer.":
        {
            def: "This feature enables direct synchronisation between devices. No server is required, but both devices must be online at the same time for synchronisation to occur, and some features may be limited. Internet connection is only required to signalling (detecting peers) and not for data transfer.",
            la: "Haec facultas synchronizationem directam inter instrumenta permittit. Nullus ministrator requiritur, sed ambo instrumenta simul conexa esse debent ut synchronizatio fiat, et quaedam facultates fortasse limitatae erunt. Conexio interretialis tantum ad signa (pares detegendos) requiritur, non ad data transferenda.",
            zh: "此功能可在设备之间直接同步，无需服务器；但同步时两台设备必须同时在线，且部分功能可能受限。互联网连接仅用于信令（发现对端），不用于数据传输。",
        },
    "This first setup has several short steps because it confirms encryption, the connection method, and which device provides the initial data. Once it is complete, additional devices can reuse a Setup URI.":
        {
            def: "This first setup has several short steps because it confirms encryption, the connection method, and which device provides the initial data. Once it is complete, additional devices can reuse a Setup URI.",
            la: "Haec prima institutio plures gradus breves habet, quia cryptationem, modum conexionis, et quod instrumentum data initialia praebeat confirmat. Ea perfecta, alia instrumenta Setup URI iterum adhibere possunt.",
            zh: "首次设置分为几个简短步骤，因为它要确认加密方式、连接方式，以及由哪台设备提供初始数据。完成后，其他设备可以复用设置 URI。",
        },
    "This is an advanced option for users who do not have a URI or who wish to configure detailed settings.": {
        def: "This is an advanced option for users who do not have a URI or who wish to configure detailed settings.",
        la: "Haec est optio provecta usoribus qui URI non habent aut qui optiones accuratas configurare volunt.",
        zh: "这是面向没有 URI 或希望手动配置详细参数的高级选项。",
    },
    "This is an extremely powerful operation. We strongly recommend that you copy your Vault folder to a safe location.":
        {
            def: "This is an extremely powerful operation. We strongly recommend that you copy your Vault folder to a safe location.",
            la: "Haec operatio est vehementissima. Valde suademus ut thecam tabularii tui in locum tutum exscribas.",
            zh: "这是一项影响极大的操作。我们强烈建议先把库文件夹复制到安全位置。",
        },
    "This is the most suitable synchronisation method for the design. All functions are available. You must have set up a CouchDB instance.":
        {
            def: "This is the most suitable synchronisation method for the design. All functions are available. You must have set up a CouchDB instance.",
            la: "Hic est modus synchronizationis huic designationi aptissimus. Omnes functiones praesto sunt. Instantiam CouchDB paratam habere debes.",
            zh: "这是最符合当前设计的同步方式，所有功能均可用。你需要事先部署好 CouchDB 实例。",
        },
    "This optional check uses Obsidian's internal request API and sends the credentials above to the CouchDB server. Use it only with a server you trust; administrator access may be required.":
        {
            def: "This optional check uses Obsidian's internal request API and sends the credentials above to the CouchDB server. Use it only with a server you trust; administrator access may be required.",
            la: "Haec probatio optionalis interfacie postulationum interna Obsidian utitur et testimonia supra scripta ad ministratorem CouchDB mittit. Ea tantum cum ministratore cui confidis utere; accessus administratoris fortasse requiretur.",
            zh: "此可选检查使用 Obsidian 的内部请求 API，并把上面的凭据发送到 CouchDB 服务器。请仅对你信任的服务器使用；可能需要管理员权限。",
        },
    "This passphrase will not be copied to another device. It will be set to `Default` until you configure it again.": {
        def: "This passphrase will not be copied to another device. It will be set to `Default` until you configure it again.",
        la: "Haec tessera arcana in aliud instrumentum non exscribetur. Ad `Default` ponetur donec eam iterum configures.",
        zh: "此密码不会复制到另一台设备。在您再次配置之前,它将设置为 `Default` ",
    },
    "This password is used to encrypt the connection. Use something long enough.": {
        def: "This password is used to encrypt the connection. Use something long enough.",
        la: "Haec tessera ad conexionem cryptandam adhibetur. Satis longam adhibe.",
        zh: "此密码用于加密连接。请设置得足够长。",
    },
    "This procedure will first delete all existing synchronisation data from the server. Following this, the server data will be completely rebuilt, using the current state of your Vault on this device (including its local database) as":
        {
            def: "This procedure will first delete all existing synchronisation data from the server. Following this, the server data will be completely rebuilt, using the current state of your Vault on this device (including its local database) as",
            la: "Haec ratio primum omnia data synchronizationis exstantia ex ministratore delebit. Deinde data ministratoris omnino reaedificabuntur, statu praesenti tabularii tui in hoc instrumento (repositorio locali incluso) adhibito ut",
            zh: "此操作会先删除服务器上所有现有的同步数据。随后，服务器数据将被完全重建，以本设备上你库的当前状态（包括其本地数据库）作为",
        },
    "This setting must be the same even when connecting to multiple synchronisation destinations.": {
        def: "This setting must be the same even when connecting to multiple synchronisation destinations.",
        la: "Haec optio eadem esse debet etiam cum ad plures destinationes synchronizationis conecteris.",
        zh: "即使连接到多个同步目标，此设置也必须保持一致。",
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
    "This will recreate chunks for all files. If there were missing chunks, this may fix the errors.": {
        def: "This will recreate chunks for all files. If there were missing chunks, this may fix the errors.",
        la: "Hoc fragmenta omnium plicarum denuo creabit. Si qua fragmenta deerant, hoc errores corrigere potest.",
        zh: "这会为所有文件重新生成 chunks。如果之前存在缺失的 chunks，这可能修复相关错误。",
    },
    "To minimise the creation of new conflicts": {
        def: "To minimise the creation of new conflicts",
        la: "Ut creatio novarum discrepantiarum minuatur",
        zh: "以减少新冲突的产生",
    },
    "To prevent unwanted vault corruption, the remote database has been locked for synchronisation. (This device is marked as 'resolved'.) When all your devices are marked as 'resolved', unlock the database. This warning will continue to appear until replication confirms the device is resolved.":
        {
            def: "To prevent unwanted vault corruption, the remote database has been locked for synchronisation. (This device is marked as 'resolved'.) When all your devices are marked as 'resolved', unlock the database. This warning will continue to appear until replication confirms the device is resolved.",
            la: "Ne tabularium invite corrumpatur, repositorium remotum ad synchronizationem obseratum est. (Hoc instrumentum ut 'resolved' notatum est.) Cum omnia instrumenta tua ut 'resolved' notata erunt, repositorium resera. Hoc monitum apparere perget donec replicatio confirmet instrumentum resolutum esse.",
            zh: "为防止意外的数据仓库损坏，远程数据库已被锁定，暂停同步。（此设备已被标记为“已确认”）当你的所有设备都标记为“已确认”后，再解锁数据库。在复制过程确认此设备已完成确认之前，此警告会持续显示。",
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
    "Toggle Sync on `Replicate now` command": {
        def: "Toggle Sync on `Replicate now` command",
        la: "Commuta synchronizationem in mandato `Replicate now`",
        zh: "在执行 `Replicate now` 命令时切换同步",
    },
    "Toggle Sync on connect": {
        def: "Toggle Sync on connect",
        la: "Commuta synchronizationem in conexione",
        zh: "连接时切换同步",
    },
    "Toggle Watch on connect": {
        def: "Toggle Watch on connect",
        la: "Commuta observationem in conexione",
        zh: "连接时切换监视",
    },
    "Transfer Tweak": {
        def: "Transfer Tweak",
        la: "Accommodatio transmissionis",
        zh: "传输微调",
    },
    "TURN Credential": {
        def: "TURN Credential",
        la: "Credentiale TURN",
        zh: "TURN 凭据",
    },
    "TURN server settings are only necessary if you are behind a strict NAT or firewall that prevents direct P2P connections. In most cases, you can leave these fields blank.":
        {
            def: "TURN server settings are only necessary if you are behind a strict NAT or firewall that prevents direct P2P connections. In most cases, you can leave these fields blank.",
            la: "Optiones ministratoris TURN solum necessariae sunt si post NAT strictum vel murum ignis es qui conexiones P2P directas impedit. Plerumque hos campos vacuos relinquere potes.",
            zh: "只有当处于阻止直接 P2P 连接的严格 NAT 或防火墙之后时，才需要 TURN 服务器设置。大多数情况下这些字段可以留空。",
        },
    "TURN Server URLs (comma-separated)": {
        def: "TURN Server URLs (comma-separated)",
        la: "URL ministratorum TURN (commatibus separata)",
        zh: "TURN 服务器地址（逗号分隔）",
    },
    "TURN Username": {
        def: "TURN Username",
        la: "Nomen usoris TURN",
        zh: "TURN 用户名",
    },
    "TweakMismatchResolve.Action.DisableAutoAcceptCompatible": {
        def: "Disable auto-accept",
        la: "Deactiva acceptionem automaticam",
        zh: "停用自动接受",
    },
    "TweakMismatchResolve.Action.Dismiss": {
        def: "Dismiss",
        la: "Dimitte",
        zh: "Dismiss",
    },
    "TweakMismatchResolve.Action.EnableAutoAcceptCompatible": {
        def: "Enable auto-accept",
        la: "Activa acceptionem automaticam",
        zh: "启用自动接受",
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
    "TweakMismatchResolve.Message.AutoAcceptCompatibleUndefined": {
        def: "\nIt appears that the settings differ for each device. You can now automatically apply compatible changes to these configurations.\nWould you like to enable this `auto-accept` setting?",
        la: "\nOptiones in singulis instrumentis differre videntur. Nunc mutationes congruentes his configurationibus automatice applicare potes.\nVisne hanc optionem `auto-accept` activare?",
        zh: "\n各设备的设置似乎存在差异。你现在可以自动应用兼容的更改到这些配置。\n是否要启用此「自动接受」设置？",
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
    "TweakMismatchResolve.Title.AutoAcceptCompatible": {
        def: "Auto-Accept Available",
        la: "Acceptio automatica praesto",
        zh: "可自动接受",
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
    "Ui.Settings.Advanced.LocalDatabaseTweak": {
        def: "Local Database Tweak",
        la: "Accommodatio repositorii localis",
        zh: "本地数据库调整",
    },
    "Ui.Settings.Advanced.MemoryCache": {
        def: "Memory Cache",
        la: "Memoria temporaria",
        zh: "内存缓存",
    },
    "Ui.Settings.Advanced.TransferTweak": {
        def: "Transfer Tweak",
        la: "Accommodatio transmissionis",
        zh: "传输调整",
    },
    "Ui.Settings.Common.Analyse": {
        def: "Analyse",
        la: "Analyza",
        zh: "分析",
    },
    "Ui.Settings.Common.Back": {
        def: "Back",
        la: "Redi",
        zh: "返回",
    },
    "Ui.Settings.Common.Check": {
        def: "Check",
        la: "Inspice",
        zh: "检查",
    },
    "Ui.Settings.Common.Configure": {
        def: "Configure",
        la: "Configura",
        zh: "配置",
    },
    "Ui.Settings.Common.Continue": {
        def: "Continue",
        la: "Perge",
        zh: "继续",
    },
    "Ui.Settings.Common.Delete": {
        def: "Delete",
        la: "Dele",
        zh: "删除",
    },
    "Ui.Settings.Common.Fetch": {
        def: "Fetch",
        la: "Arcesse",
        zh: "获取",
    },
    "Ui.Settings.Common.Lock": {
        def: "Lock",
        la: "Obsera",
        zh: "锁定",
    },
    "Ui.Settings.Common.Merge": {
        def: "Merge",
        la: "Confla",
        zh: "合并",
    },
    "Ui.Settings.Common.Open": {
        def: "Open",
        la: "Aperi",
        zh: "打开",
    },
    "Ui.Settings.Common.Overwrite": {
        def: "Overwrite",
        la: "Superscribe",
        zh: "覆盖",
    },
    "Ui.Settings.Common.Perform": {
        def: "Perform",
        la: "Exsequere",
        zh: "执行",
    },
    "Ui.Settings.Common.ResetAll": {
        def: "Reset all",
        la: "Restitue omnia",
        zh: "全部重置",
    },
    "Ui.Settings.Common.ResolveAll": {
        def: "Resolve All",
        la: "Solve omnia",
        zh: "全部解决",
    },
    "Ui.Settings.Common.Scan": {
        def: "Scan",
        la: "Perscrutare",
        zh: "扫描",
    },
    "Ui.Settings.Common.Send": {
        def: "Send",
        la: "Mitte",
        zh: "发送",
    },
    "Ui.Settings.Common.Use": {
        def: "Use",
        la: "Adhibe",
        zh: "使用",
    },
    "Ui.Settings.Common.VerifyAll": {
        def: "Verify all",
        la: "Verifica omnia",
        zh: "全部校验",
    },
    "Ui.Settings.CustomizationSync.OpenDesc": {
        def: "Open the dialog",
        la: "Aperi dialogum",
        zh: "打开此对话框",
    },
    "Ui.Settings.CustomizationSync.Panel": {
        def: "Customization Sync",
        la: "Synchronizatio optionum propriarum",
        zh: "自定义同步",
    },
    "Ui.Settings.CustomizationSync.WarnChangeDeviceName": {
        def: "We cannot change the device name while this feature is enabled. Please disable this feature to change the device name.",
        la: "Nomen instrumenti mutare non possumus dum haec facultas activa est. Hanc facultatem deactiva ut nomen instrumenti mutes.",
        zh: "启用此功能时无法修改设备名称。请先关闭此功能，再修改设备名称。",
    },
    "Ui.Settings.CustomizationSync.WarnSetDeviceName": {
        def: "Please set device name to identify this device. This name should be unique among your devices. While not configured, we cannot enable this feature.",
        la: "Nomen instrumenti pone quo hoc instrumentum agnoscatur. Hoc nomen inter instrumenta tua unicum esse debet. Dum non configuratum est, hanc facultatem activare non possumus.",
        zh: "请先设置用于标识此设备的设备名称。该名称应在你的设备之间保持唯一。未设置前无法启用此功能。",
    },
    "Ui.Settings.Hatch.AnalyseDatabaseUsage": {
        def: "Analyse database usage",
        la: "Analyza usum repositorii",
        zh: "分析数据库使用情况",
    },
    "Ui.Settings.Hatch.AnalyseDatabaseUsageDesc": {
        def: "Analyse database usage and generate a TSV report for diagnosis yourself. You can paste the generated report with any spreadsheet you like.",
        la: "Usum repositorii analyza et relationem TSV ad diagnosim tuam genera. Relationem generatam in quamlibet tabulam computativam inserere potes.",
        zh: "分析数据库使用情况，并生成 TSV 报告供你自行诊断。你可以将生成的报告粘贴到任意电子表格工具中查看。",
    },
    "Ui.Settings.Hatch.BackToNonConfigured": {
        def: "Back to non-configured",
        la: "Redi ad statum non configuratum",
        zh: "返回未配置状态",
    },
    "Ui.Settings.Hatch.ConvertNonObfuscated": {
        def: "Check and convert non-path-obfuscated files",
        la: "Inspice et converte plicas sine obfuscatione viarum",
        zh: "检查并转换未进行路径混淆的文件",
    },
    "Ui.Settings.Hatch.ConvertNonObfuscatedDesc": {
        def: "Check the local database for files that were stored without path obfuscation and convert them when needed.",
        la: "Repositorium locale perscrutare pro plicis quae sine obfuscatione viarum servatae sunt, et eas, si opus est, converte.",
        zh: "检查本地数据库中未按路径混淆方式存储的文件，并在需要时将其转换为正确格式。",
    },
    "Ui.Settings.Hatch.CopyIssueReport": {
        def: "Copy Report to clipboard",
        la: "Exscribe relationem in tabellam temporariam",
        zh: "复制报告到剪贴板",
    },
    "Ui.Settings.Hatch.DatabaseLabel": {
        def: "Database: ${details}",
        la: "Repositorium: ${details}",
        zh: "数据库：${details}",
    },
    "Ui.Settings.Hatch.DatabaseToStorage": {
        def: "Database -> Storage",
        la: "Repositorium -> Repositorium plicarum",
        zh: "数据库 -> 存储",
    },
    "Ui.Settings.Hatch.DeleteCustomizationSyncData": {
        def: "Delete all customization sync data",
        la: "Dele omnia data synchronizationis optionum propriarum",
        zh: "删除所有自定义同步数据",
    },
    "Ui.Settings.Hatch.GeneratedReport": {
        def: "Generated report",
        la: "Relatio generata",
        zh: "已生成的报告",
    },
    "Ui.Settings.Hatch.Missing": {
        def: "Missing",
        la: "Deest",
        zh: "缺失",
    },
    "Ui.Settings.Hatch.ModifiedSize": {
        def: "Modified: ${modified}, Size: ${size}",
        la: "Mutatum: ${modified}, Magnitudo: ${size}",
        zh: "修改时间：${modified}，大小：${size}",
    },
    "Ui.Settings.Hatch.ModifiedSizeActual": {
        def: "Modified: ${modified}, Size: ${size} (actual size: ${actualSize})",
        la: "Mutatum: ${modified}, Magnitudo: ${size} (magnitudo vera: ${actualSize})",
        zh: "修改时间：${modified}，大小：${size}（实际大小：${actualSize}）",
    },
    "Ui.Settings.Hatch.PrepareIssueReport": {
        def: "Prepare the 'report' to create an issue",
        la: "Para 'relationem' ad quaestionem creandam",
        zh: "准备用于提交问题的报告",
    },
    "Ui.Settings.Hatch.RecoveryAndRepair": {
        def: "Recovery and Repair",
        la: "Recuperatio et reparatio",
        zh: "恢复与修复",
    },
    "Ui.Settings.Hatch.RecreateAll": {
        def: "Recreate all",
        la: "Denuo crea omnia",
        zh: "全部重建",
    },
    "Ui.Settings.Hatch.RecreateMissingChunks": {
        def: "Recreate missing chunks for all files",
        la: "Denuo crea fragmenta deficientia omnium plicarum",
        zh: "为所有文件重新创建缺失的数据块",
    },
    "Ui.Settings.Hatch.RecreateMissingChunksDesc": {
        def: "This will recreate chunks for all files. If there were missing chunks, this may fix the errors.",
        la: "Hoc fragmenta omnium plicarum denuo creabit. Si qua fragmenta deerant, hoc errores corrigere potest.",
        zh: "此操作会为所有文件重新创建数据块。如果存在缺失的数据块，可能会修复相关错误。",
    },
    "Ui.Settings.Hatch.ResetPanel": {
        def: "Reset",
        la: "Restitue",
        zh: "重置",
    },
    "Ui.Settings.Hatch.ResetRemoteUsage": {
        def: "Reset notification threshold and check the remote database usage",
        la: "Restitue limen notificationis et inspice usum repositorii remoti",
        zh: "重置通知阈值并检查远程数据库使用情况",
    },
    "Ui.Settings.Hatch.ResetRemoteUsageDesc": {
        def: "Reset the remote storage size threshold and check the remote storage size again.",
        la: "Limen magnitudinis repositorii plicarum remotae restitue et magnitudinem repositorii plicarum remotae iterum inspice.",
        zh: "重置远程存储大小阈值，并再次检查远程存储大小。",
    },
    "Ui.Settings.Hatch.ResolveAllConflictedFiles": {
        def: "Resolve all conflicted files by the newer one",
        la: "Solve omnes plicas discrepantes per recentiorem",
        zh: "使用较新的版本解决所有冲突文件",
    },
    "Ui.Settings.Hatch.ResolveAllConflictedFilesDesc": {
        def: "Resolve all conflicted files by the newer one. Caution: This will overwrite the older one, and cannot resurrect the overwritten one.",
        la: "Solve omnes plicas discrepantes per recentiorem. Cautio: Hoc vetustiorem superscribet, neque superscriptam restituere poterit.",
        zh: "使用较新的版本解决所有冲突文件。注意：此操作会覆盖较旧版本，且无法恢复被覆盖的内容。",
    },
    "Ui.Settings.Hatch.RunDoctor": {
        def: "Run Doctor",
        la: "Exsequere medicum",
        zh: "运行诊断",
    },
    "Ui.Settings.Hatch.ScanBrokenFiles": {
        def: "Scan for broken files",
        la: "Perscrutare plicas fractas",
        zh: "扫描损坏文件",
    },
    "Ui.Settings.Hatch.ScramSwitches": {
        def: "Scram Switches",
        la: "Interruptores subitarii",
        zh: "紧急开关",
    },
    "Ui.Settings.Hatch.ShowHistory": {
        def: "Show history",
        la: "Ostende historiam",
        zh: "查看历史",
    },
    "Ui.Settings.Hatch.StorageLabel": {
        def: "Storage: ${details}",
        la: "Repositorium plicarum: ${details}",
        zh: "存储：${details}",
    },
    "Ui.Settings.Hatch.StorageToDatabase": {
        def: "Storage -> Database",
        la: "Repositorium plicarum -> Repositorium",
        zh: "存储 -> 数据库",
    },
    "Ui.Settings.Hatch.VerifyAndRepairAllFiles": {
        def: "Verify and repair all files",
        la: "Verifica et repara omnes plicas",
        zh: "校验并修复所有文件",
    },
    "Ui.Settings.Hatch.VerifyAndRepairAllFilesDesc": {
        def: "Compare the content of files between the local database and storage. If they do not match, you will be asked which one to keep.",
        la: "Contenta plicarum inter repositorium locale et repositorium plicarum compara. Si non congruunt, rogaberis utram servare velis.",
        zh: "比较本地数据库与存储中的文件内容。如果内容不一致，系统会询问你保留哪一份。",
    },
    "Ui.Settings.Maintenance.Cleanup": {
        def: "Perform cleanup",
        la: "Exsequere purgationem",
        zh: "执行清理",
    },
    "Ui.Settings.Maintenance.CleanupDesc": {
        def: "Reduces storage space by discarding all non-latest revisions. This requires the same amount of free space on the remote server and the local client.",
        la: "Spatium repositorii plicarum minuit omnibus recensionibus non recentissimis abiectis. Hoc idem spatium liberum in ministratore remoto et in cliente locali requirit.",
        zh: "丢弃所有非最新修订版本，以减少存储空间占用。此操作要求远程服务器和本地客户端都具备同等大小的可用空间。",
    },
    "Ui.Settings.Maintenance.DeleteLocalDatabase": {
        def: "Delete local database to reset or uninstall Tabularium",
        la: "Dele repositorium locale ut Tabularium restituas aut deinstalles",
        zh: "删除本地数据库以重置或卸载 Tabularium",
    },
    "Ui.Settings.Maintenance.EmergencyRestart": {
        def: "Emergency restart",
        la: "Reinitium subitum",
        zh: "紧急重启",
    },
    "Ui.Settings.Maintenance.EmergencyRestartDesc": {
        def: "Disable all synchronisation and restart.",
        la: "Omnem synchronizationem deactiva et reinitia.",
        zh: "禁用所有同步并重新启动。",
    },
    "Ui.Settings.Maintenance.FreshStartWipe": {
        def: "Fresh Start Wipe",
        la: "Deletio ad initium novum",
        zh: "全新开始清空",
    },
    "Ui.Settings.Maintenance.FreshStartWipeDesc": {
        def: "Delete all data on the remote server.",
        la: "Dele omnia data in ministratore remoto.",
        zh: "删除远程服务器上的所有数据。",
    },
    "Ui.Settings.Maintenance.GarbageCollection": {
        def: "Garbage Collection V3 (Beta)",
        la: "Collectio quisquiliarum V3 (Beta)",
        zh: "垃圾回收 V3（测试版）",
    },
    "Ui.Settings.Maintenance.GarbageCollectionAction": {
        def: "Perform Garbage Collection",
        la: "Exsequere collectionem quisquiliarum",
        zh: "执行垃圾回收",
    },
    "Ui.Settings.Maintenance.GarbageCollectionDesc": {
        def: "Perform Garbage Collection to remove unused chunks and reduce database size.",
        la: "Collectionem quisquiliarum exsequere ut fragmenta non adhibita removeantur et magnitudo repositorii minuatur.",
        zh: "执行垃圾回收以移除未使用的数据块并减少数据库大小。",
    },
    "Ui.Settings.Maintenance.LockServer": {
        def: "Lock Server",
        la: "Obsera ministratorem",
        zh: "锁定服务器",
    },
    "Ui.Settings.Maintenance.LockServerDesc": {
        def: "Lock the remote server to prevent synchronisation with other devices.",
        la: "Ministratorem remotum obsera ne synchronizatio cum aliis instrumentis fiat.",
        zh: "锁定远程服务器，防止与其他设备继续同步。",
    },
    "Ui.Settings.Maintenance.OverwriteRemote": {
        def: "Overwrite remote",
        la: "Superscribe remotum",
        zh: "覆盖远程端",
    },
    "Ui.Settings.Maintenance.OverwriteRemoteDesc": {
        def: "Overwrite remote with local DB and passphrase.",
        la: "Remotum repositorio locali et tessera arcana superscribe.",
        zh: "使用本地数据库和密码短语覆盖远程端数据。",
    },
    "Ui.Settings.Maintenance.OverwriteServerData": {
        def: "Overwrite Server Data with This Device's Files",
        la: "Superscribe data ministratoris plicis huius instrumenti",
        zh: "用此设备的文件覆盖服务器数据",
    },
    "Ui.Settings.Maintenance.OverwriteServerDataDesc": {
        def: "Rebuild the local and remote database with files from this device.",
        la: "Repositorium locale et remotum plicis ex hoc instrumento reaedifica.",
        zh: "使用此设备上的文件重建本地和远程数据库。",
    },
    "Ui.Settings.Maintenance.PurgeAllJournalCounter": {
        def: "Purge all journal counter",
        la: "Purga omnes numeratores diarii",
        zh: "清空全部日志计数器",
    },
    "Ui.Settings.Maintenance.PurgeAllJournalCounterDesc": {
        def: "Purge all download and upload caches.",
        la: "Purga omnes memorias temporarias deorsum ferendi et sursum mittendi.",
        zh: "清空所有下载与上传缓存。",
    },
    "Ui.Settings.Maintenance.RebuildingOperations": {
        def: "Rebuilding Operations (Remote Only)",
        la: "Operationes reaedificandi (remotum tantum)",
        zh: "重建操作（仅远程端）",
    },
    "Ui.Settings.Maintenance.Resend": {
        def: "Resend",
        la: "Iterum mitte",
        zh: "重新发送",
    },
    "Ui.Settings.Maintenance.ResendDesc": {
        def: "Resend all chunks to the remote.",
        la: "Omnia fragmenta ad remotum iterum mitte.",
        zh: "将所有数据块重新发送到远程端。",
    },
    "Ui.Settings.Maintenance.Reset": {
        def: "Reset",
        la: "Restitue",
        zh: "重置",
    },
    "Ui.Settings.Maintenance.ResetAllJournalCounter": {
        def: "Reset all journal counter",
        la: "Restitue omnes numeratores diarii",
        zh: "重置全部日志计数器",
    },
    "Ui.Settings.Maintenance.ResetAllJournalCounterDesc": {
        def: "Initialise all journal history. On the next sync, every item will be received and sent again.",
        la: "Totam historiam diarii initia. Proxima synchronizatione omnia iterum accipientur et mittentur.",
        zh: "初始化全部日志历史。下次同步时，所有项目都会重新接收并重新发送。",
    },
    "Ui.Settings.Maintenance.ResetJournalReceived": {
        def: "Reset journal received history",
        la: "Restitue historiam acceptorum diarii",
        zh: "重置日志接收历史",
    },
    "Ui.Settings.Maintenance.ResetJournalReceivedDesc": {
        def: "Initialise journal received history. On the next sync, every item except those sent by this device will be downloaded again.",
        la: "Historiam acceptorum diarii initia. Proxima synchronizatione omnia praeter ea quae ab hoc instrumento missa sunt iterum deorsum ferentur.",
        zh: "初始化日志接收历史。下次同步时，除当前设备发送的项目外，其余项目都会重新下载。",
    },
    "Ui.Settings.Maintenance.ResetJournalSent": {
        def: "Reset journal sent history",
        la: "Restitue historiam missorum diarii",
        zh: "重置日志发送历史",
    },
    "Ui.Settings.Maintenance.ResetJournalSentDesc": {
        def: "Initialise journal sent history. On the next sync, every item except those received by this device will be sent again.",
        la: "Historiam missorum diarii initia. Proxima synchronizatione omnia praeter ea quae ab hoc instrumento accepta sunt iterum mittentur.",
        zh: "初始化日志发送历史。下次同步时，除当前设备已接收的项目外，其余项目都会重新发送。",
    },
    "Ui.Settings.Maintenance.ResetLocalSyncInfo": {
        def: "Reset Synchronisation information",
        la: "Restitue notitiam synchronizationis",
        zh: "重置同步信息",
    },
    "Ui.Settings.Maintenance.ResetLocalSyncInfoDesc": {
        def: "Restore or reconstruct local database from remote.",
        la: "Repositorium locale ex remoto restitue aut reconstrue.",
        zh: "从远程端恢复或重建本地数据库。",
    },
    "Ui.Settings.Maintenance.ResetReceived": {
        def: "Reset received",
        la: "Restitue accepta",
        zh: "重置接收记录",
    },
    "Ui.Settings.Maintenance.ResetSentHistory": {
        def: "Reset sent history",
        la: "Restitue historiam missorum",
        zh: "重置发送记录",
    },
    "Ui.Settings.Maintenance.ResetThisDevice": {
        def: "Reset Synchronisation on This Device",
        la: "Restitue synchronizationem in hoc instrumento",
        zh: "重置此设备上的同步状态",
    },
    "Ui.Settings.Maintenance.ScheduleAndRestart": {
        def: "Schedule and Restart",
        la: "Constitue et reinitia",
        zh: "计划执行并重启",
    },
    "Ui.Settings.Maintenance.Scram": {
        def: "Scram!",
        la: "Siste subito!",
        zh: "紧急处理",
    },
    "Ui.Settings.Maintenance.SendChunks": {
        def: "Send chunks",
        la: "Mitte fragmenta",
        zh: "发送数据块",
    },
    "Ui.Settings.Maintenance.Syncing": {
        def: "Syncing",
        la: "Synchronizatur",
        zh: "同步",
    },
    "Ui.Settings.Maintenance.WriteRedFlagAndRestart": {
        def: "Flag and restart",
        la: "Nota et reinitia",
        zh: "标记并重启",
    },
    "Ui.Settings.Patches.CompatibilityConflict": {
        def: "Compatibility (Conflict Behaviour)",
        la: "Congruentia (modus discrepantiarum)",
        zh: "兼容性（冲突行为）",
    },
    "Ui.Settings.Patches.CompatibilityDatabase": {
        def: "Compatibility (Database structure)",
        la: "Congruentia (structura repositorii)",
        zh: "兼容性（数据库结构）",
    },
    "Ui.Settings.Patches.CompatibilityInternalApi": {
        def: "Compatibility (Internal API Usage)",
        la: "Congruentia (usus API internae)",
        zh: "兼容性（内部 API 使用）",
    },
    "Ui.Settings.Patches.CompatibilityMetadata": {
        def: "Compatibility (Metadata)",
        la: "Congruentia (metadata)",
        zh: "兼容性（元数据）",
    },
    "Ui.Settings.Patches.CompatibilityRemote": {
        def: "Compatibility (Remote Database)",
        la: "Congruentia (repositorium remotum)",
        zh: "兼容性（远程数据库）",
    },
    "Ui.Settings.Patches.CompatibilityTrouble": {
        def: "Compatibility (Trouble addressed)",
        la: "Congruentia (difficultates tractatae)",
        zh: "兼容性（已处理问题）",
    },
    "Ui.Settings.Patches.CurrentAdapter": {
        def: "Current adapter: ${adapter}",
        la: "Adaptator praesens: ${adapter}",
        zh: "当前适配器：${adapter}",
    },
    "Ui.Settings.Patches.DatabaseAdapter": {
        def: "Database Adapter",
        la: "Adaptator repositorii",
        zh: "数据库适配器",
    },
    "Ui.Settings.Patches.DatabaseAdapterDesc": {
        def: "Select the database adapter to use.",
        la: "Adaptatorem repositorii adhibendum selige.",
        zh: "选择要使用的数据库适配器。",
    },
    "Ui.Settings.Patches.EdgeCaseBehaviour": {
        def: "Edge case addressing (Behaviour)",
        la: "Casus extremi tractati (modus agendi)",
        zh: "边界情况处理（行为）",
    },
    "Ui.Settings.Patches.EdgeCaseDatabase": {
        def: "Edge case addressing (Database)",
        la: "Casus extremi tractati (repositorium)",
        zh: "边界情况处理（数据库）",
    },
    "Ui.Settings.Patches.EdgeCaseProcessing": {
        def: "Edge case addressing (Processing)",
        la: "Casus extremi tractati (processus)",
        zh: "边界情况处理（处理流程）",
    },
    "Ui.Settings.Patches.IndexedDbWarning": {
        def: "The IndexedDB adapter often offers superior performance in certain scenarios, but it has been found to cause memory leaks when used with live sync. When using live sync, please use the IDB adapter instead.",
        la: "Adaptator IndexedDB in quibusdam condicionibus saepe celerius operatur, sed repertum est eum, cum synchronizatio viva adhibetur, memoriam perdere. Cum synchronizatione viva uteris, adaptatorem IDB potius adhibe.",
        zh: "IndexedDB 适配器在某些场景下通常具有更好的性能，但在实时同步模式下已发现可能导致内存泄漏。使用实时同步模式时，请改用 IDB 适配器。",
    },
    "Ui.Settings.Patches.MigratingToIdb": {
        def: "Migrating all data to IDB...",
        la: "Omnia data ad IDB migrant...",
        zh: "正在将所有数据迁移到 IDB...",
    },
    "Ui.Settings.Patches.MigratingToIndexedDb": {
        def: "Migrating all data to IndexedDB...",
        la: "Omnia data ad IndexedDB migrant...",
        zh: "正在将所有数据迁移到 IndexedDB...",
    },
    "Ui.Settings.Patches.MigrationIdbCompleted": {
        def: "Migration to IDB completed. Obsidian will be restarted with the new configuration immediately.",
        la: "Migratio ad IDB perfecta est. Obsidian statim cum configuratione nova reinitiabitur.",
        zh: "已完成迁移到 IDB。Obsidian 将立即使用新配置重新启动。",
    },
    "Ui.Settings.Patches.MigrationIdbCompletedFollowUp": {
        def: "Migration to IDB completed. Please switch the adapter and restart Obsidian.",
        la: "Migratio ad IDB perfecta est. Adaptatorem commuta et Obsidian reinitia.",
        zh: "已完成迁移到 IDB。请切换适配器并重新启动 Obsidian。",
    },
    "Ui.Settings.Patches.MigrationIndexedDbCompleted": {
        def: "Migration to IndexedDB completed. Obsidian will be restarted with the new configuration immediately.",
        la: "Migratio ad IndexedDB perfecta est. Obsidian statim cum configuratione nova reinitiabitur.",
        zh: "已完成迁移到 IndexedDB。Obsidian 将立即使用新配置重新启动。",
    },
    "Ui.Settings.Patches.MigrationIndexedDbCompletedFollowUp": {
        def: "Migration to IndexedDB completed. Please switch the adapter and restart Obsidian.",
        la: "Migratio ad IndexedDB perfecta est. Adaptatorem commuta et Obsidian reinitia.",
        zh: "已完成迁移到 IndexedDB。请切换适配器并重新启动 Obsidian。",
    },
    "Ui.Settings.Patches.MigrationWarning": {
        def: "Changing this setting requires migrating existing data, which may take some time, and restarting Obsidian. Please make sure to back up your data before proceeding.",
        la: "Mutatio huius optionis migrationem datorum exstantium requirit, quae aliquamdiu durare potest, et reinitium Obsidian. Cura ut data tua tuto exscribas antequam pergas.",
        zh: "修改此设置需要迁移现有数据（可能需要一些时间）并重新启动 Obsidian。请先备份你的数据后再继续。",
    },
    "Ui.Settings.Patches.OperationToIdb": {
        def: "to IDB",
        la: "ad IDB",
        zh: "迁移到 IDB",
    },
    "Ui.Settings.Patches.OperationToIndexedDb": {
        def: "to IndexedDB",
        la: "ad IndexedDB",
        zh: "迁移到 IndexedDB",
    },
    "Ui.Settings.Patches.Remediation": {
        def: "Remediation",
        la: "Remedium",
        zh: "修正",
    },
    "Ui.Settings.Patches.RemediationChanged": {
        def: "Remediation Setting Changed",
        la: "Optio remedii mutata",
        zh: "修正设置已更改",
    },
    "Ui.Settings.Patches.RemediationNoLimit": {
        def: "No limit configured",
        la: "Nullus limes configuratus",
        zh: "未设置限制",
    },
    "Ui.Settings.Patches.RemediationRestarting": {
        def: "Remediation setting changed. Restarting Obsidian...",
        la: "Optio remedii mutata est. Obsidian reinitiatur...",
        zh: "修正设置已更改，正在重新启动 Obsidian...",
    },
    "Ui.Settings.Patches.RemediationRestartLater": {
        def: "Later",
        la: "Postea",
        zh: "稍后",
    },
    "Ui.Settings.Patches.RemediationRestartMessage": {
        def: "Restarting Obsidian is strongly recommended. Until restart, some changes may not take effect, and the display may be inconsistent. Are you sure you want to restart now?",
        la: "Reinitium Obsidian vehementer commendatur. Ante reinitium quaedam mutationes fortasse non valebunt, et ostensio fortasse inconstans erit. Certusne es te nunc reinitiare velle?",
        zh: "强烈建议重新启动 Obsidian。在重启之前，部分更改可能不会生效，界面显示也可能不一致。确定要现在重启吗？",
    },
    "Ui.Settings.Patches.RemediationRestartNow": {
        def: "Restart Now",
        la: "Reinitia nunc",
        zh: "立即重启",
    },
    "Ui.Settings.Patches.RemediationSuffixChanged": {
        def: "Suffix has been changed. Reopening database...",
        la: "Suffixum mutatum est. Repositorium iterum aperitur...",
        zh: "后缀已更改，正在重新打开数据库...",
    },
    "Ui.Settings.Patches.RemediationWithValue": {
        def: "Limit: ${date} (${timestamp})",
        la: "Limes: ${date} (${timestamp})",
        zh: "限制：${date}（${timestamp}）",
    },
    "Ui.Settings.Patches.RemoteDatabaseSunset": {
        def: "Remote Database Tweak (In sunset)",
        la: "Accommodatio repositorii remoti (in occasu)",
        zh: "远程数据库调整（即将弃用）",
    },
    "Ui.Settings.Patches.SwitchToIDB": {
        def: "Switch to IDB",
        la: "Commuta ad IDB",
        zh: "切换到 IDB",
    },
    "Ui.Settings.Patches.SwitchToIndexedDb": {
        def: "Switch to IndexedDB",
        la: "Commuta ad IndexedDB",
        zh: "切换到 IndexedDB",
    },
    "Ui.Settings.PowerUsers.ConfigurationEncryption": {
        def: "Configuration Encryption",
        la: "Cryptatio configurationis",
        zh: "配置加密",
    },
    "Ui.Settings.PowerUsers.ConnectionTweak": {
        def: "CouchDB Connection Tweak",
        la: "Accommodatio conexionis CouchDB",
        zh: "CouchDB 连接调整",
    },
    "Ui.Settings.PowerUsers.ConnectionTweakDesc": {
        def: "If you reached the payload size limit when using IBM Cloudant, please decrease batch size and batch limit to a lower value.",
        la: "Si limitem magnitudinis oneris cum IBM Cloudant attigisti, magnitudinem et limitem fasciculi minue.",
        zh: "如果你在使用 IBM Cloudant 时遇到负载大小限制，请将 batch size 和 batch limit 调低。",
    },
    "Ui.Settings.PowerUsers.Default": {
        def: "Default",
        la: "Praedefinitum",
        zh: "默认",
    },
    "Ui.Settings.PowerUsers.Developer": {
        def: "Developer",
        la: "Elaborator",
        zh: "开发者",
    },
    "Ui.Settings.PowerUsers.EncryptSensitiveConfig": {
        def: "Encrypt sensitive configuration items",
        la: "Crypta res configurationis sensibiles",
        zh: "加密敏感配置项",
    },
    "Ui.Settings.PowerUsers.PromptPassphraseEveryLaunch": {
        def: "Ask for a passphrase at every launch",
        la: "Tesseram arcanam ad quodque initium posce",
        zh: "每次启动时询问密码短语",
    },
    "Ui.Settings.PowerUsers.UseCustomPassphrase": {
        def: "Use a custom passphrase",
        la: "Adhibe tesseram arcanam propriam",
        zh: "使用自定义密码短语",
    },
    "Ui.Settings.Remote.Activate": {
        def: "Activate",
        la: "Activa",
        zh: "启用",
    },
    "Ui.Settings.Remote.ActiveSuffix": {
        def: " (Active)",
        la: " (Activum)",
        zh: "（当前启用）",
    },
    "Ui.Settings.Remote.AddConnection": {
        def: "Add new connection",
        la: "Adde conexionem novam",
        zh: "新增连接",
    },
    "Ui.Settings.Remote.AddRemoteDefaultName": {
        def: "New Remote",
        la: "Remotum novum",
        zh: "新远程端",
    },
    "Ui.Settings.Remote.ConfigureAndChangeRemote": {
        def: "Configure and change remote",
        la: "Configura et muta remotum",
        zh: "配置并切换远程端",
    },
    "Ui.Settings.Remote.ConfigureE2EE": {
        def: "Configure E2EE",
        la: "Configura E2EE",
        zh: "配置端到端加密",
    },
    "Ui.Settings.Remote.ConfigureRemote": {
        def: "Configure Remote",
        la: "Configura remotum",
        zh: "配置远程端",
    },
    "Ui.Settings.Remote.DeleteRemoteConfirm": {
        def: "Delete remote configuration '${name}'?",
        la: "Delerene configurationem remotam '${name}'?",
        zh: "确定要删除远程配置“${name}”吗？",
    },
    "Ui.Settings.Remote.DeleteRemoteTitle": {
        def: "Delete Remote Configuration",
        la: "Dele configurationem remotam",
        zh: "删除远程配置",
    },
    "Ui.Settings.Remote.DisplayName": {
        def: "Display name",
        la: "Nomen ostendendum",
        zh: "显示名称",
    },
    "Ui.Settings.Remote.DuplicateRemote": {
        def: "Duplicate remote",
        la: "Duplica remotum",
        zh: "复制远程配置",
    },
    "Ui.Settings.Remote.DuplicateRemoteSuffix": {
        def: "${name} (Copy)",
        la: "${name} (Exemplar)",
        zh: "${name}（副本）",
    },
    "Ui.Settings.Remote.E2EEConfiguration": {
        def: "E2EE Configuration",
        la: "Configuratio E2EE",
        zh: "端到端加密配置",
    },
    "Ui.Settings.Remote.Export": {
        def: "Export",
        la: "Exporta",
        zh: "导出",
    },
    "Ui.Settings.Remote.FetchRemoteSettings": {
        def: "Fetch remote settings",
        la: "Arcesse optiones remotas",
        zh: "获取远程设置",
    },
    "Ui.Settings.Remote.ImportConnection": {
        def: "Import connection",
        la: "Importa conexionem",
        zh: "导入连接",
    },
    "Ui.Settings.Remote.ImportConnectionPrompt": {
        def: "Paste a connection string",
        la: "Insere seriem conexionis",
        zh: "粘贴连接字符串",
    },
    "Ui.Settings.Remote.ImportedCouchDb": {
        def: "Imported CouchDB",
        la: "CouchDB importatum",
        zh: "已导入的 CouchDB",
    },
    "Ui.Settings.Remote.ImportedRemote": {
        def: "Remote",
        la: "Remotum",
        zh: "远程端",
    },
    "Ui.Settings.Remote.MoreActions": {
        def: "More actions",
        la: "Plures actiones",
        zh: "更多操作",
    },
    "Ui.Settings.Remote.PeerToPeerPanel": {
        def: "Peer-to-Peer Synchronisation",
        la: "Synchronizatio inter pares",
        zh: "点对点同步",
    },
    "Ui.Settings.Remote.RemoteConfigurationPrefix": {
        def: "Remote configuration",
        la: "Configuratio remota",
        zh: "远程配置",
    },
    "Ui.Settings.Remote.RemoteDatabases": {
        def: "Remote Databases",
        la: "Repositoria remota",
        zh: "远程数据库",
    },
    "Ui.Settings.Remote.RemoteName": {
        def: "Remote name",
        la: "Nomen remoti",
        zh: "远程名称",
    },
    "Ui.Settings.Remote.RemoteNameCouchDb": {
        def: "CouchDB ${host}",
        la: "CouchDB ${host}",
        zh: "CouchDB ${host}",
    },
    "Ui.Settings.Remote.RemoteNameP2P": {
        def: "P2P ${room}",
        la: "P2P ${room}",
        zh: "P2P ${room}",
    },
    "Ui.Settings.Remote.RemoteNameS3": {
        def: "S3 ${bucket}",
        la: "S3 ${bucket}",
        zh: "S3 ${bucket}",
    },
    "Ui.Settings.Remote.Rename": {
        def: "Rename",
        la: "Renomina",
        zh: "重命名",
    },
    "Ui.Settings.Selector.AddDefaultPatterns": {
        def: "Add default patterns",
        la: "Adde exemplaria praedefinita",
        zh: "添加默认模式",
    },
    "Ui.Settings.Selector.CrossPlatform": {
        def: "Cross-platform",
        la: "Inter suggestus",
        zh: "跨平台",
    },
    "Ui.Settings.Selector.Default": {
        def: "Default",
        la: "Praedefinitum",
        zh: "默认",
    },
    "Ui.Settings.Selector.HiddenFiles": {
        def: "Hidden Files",
        la: "Plicae occultae",
        zh: "隐藏文件",
    },
    "Ui.Settings.Selector.IgnorePatterns": {
        def: "Ignore patterns",
        la: "Exemplaria neglegenda",
        zh: "忽略模式",
    },
    "Ui.Settings.Selector.NonSynchronisingFiles": {
        def: "Non-Synchronising files",
        la: "Plicae non synchronizandae",
        zh: "不同步文件",
    },
    "Ui.Settings.Selector.NonSynchronisingFilesDesc": {
        def: "(RegExp) If this is set, any changes to local and remote files that match this will be skipped.",
        la: "(RegExp) Si hoc positum est, omnes mutationes plicarum localium et remotarum quae huic congruunt praeteribuntur.",
        zh: "（RegExp）如果设置了该项，则本地和远程中匹配这些规则的文件变更将被跳过。",
    },
    "Ui.Settings.Selector.NormalFiles": {
        def: "Normal Files",
        la: "Plicae ordinariae",
        zh: "普通文件",
    },
    "Ui.Settings.Selector.OverwritePatterns": {
        def: "Overwrite patterns",
        la: "Exemplaria superscribenda",
        zh: "覆盖模式",
    },
    "Ui.Settings.Selector.OverwritePatternsDesc": {
        def: "Patterns to match files for overwriting instead of merging",
        la: "Exemplaria quibus plicae congruentes superscribuntur pro conflatione",
        zh: "匹配后将执行覆盖而非合并的文件模式",
    },
    "Ui.Settings.Selector.SynchronisingFiles": {
        def: "Synchronising files",
        la: "Plicae synchronizandae",
        zh: "同步文件",
    },
    "Ui.Settings.Selector.SynchronisingFilesDesc": {
        def: "(RegExp) Empty to sync all files. Set a regular expression filter to limit synchronised files.",
        la: "(RegExp) Vacuum relinque ut omnes plicae synchronizentur. Filtrum expressionis regularis pone ut plicae synchronizatae limitentur.",
        zh: "（RegExp）留空则同步所有文件。可设置正则表达式以限制需要同步的文件。",
    },
    "Ui.Settings.Selector.TargetPatterns": {
        def: "Target patterns",
        la: "Exemplaria quaerenda",
        zh: "目标模式",
    },
    "Ui.Settings.Selector.TargetPatternsDesc": {
        def: "Patterns to match files for syncing",
        la: "Exemplaria quibus plicae synchronizandae congruunt",
        zh: "用于匹配需要同步文件的模式",
    },
    "Ui.Settings.Setup.RerunWizardButton": {
        def: "Rerun Wizard",
        la: "Iterum exsequere ductorem",
        zh: "重新运行向导",
    },
    "Ui.Settings.Setup.RerunWizardDesc": {
        def: "Rerun the onboarding wizard to set up Tabularium again.",
        la: "Ductorem initialem iterum exsequere ut Tabularium denuo instituas.",
        zh: "重新运行引导向导，再次设置 Tabularium。",
    },
    "Ui.Settings.Setup.RerunWizardName": {
        def: "Rerun Onboarding Wizard",
        la: "Iterum exsequere ductorem initialem",
        zh: "重新运行引导向导",
    },
    "Ui.Settings.SyncSettings.Fetch": {
        def: "Fetch",
        la: "Arcesse",
        zh: "获取",
    },
    "Ui.Settings.SyncSettings.Merge": {
        def: "Merge",
        la: "Confla",
        zh: "合并",
    },
    "Ui.Settings.SyncSettings.Overwrite": {
        def: "Overwrite",
        la: "Superscribe",
        zh: "覆盖",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.ApplyWithoutInitialisation": {
        def: "Apply without Initialisation",
        la: "Applica sine initiatione",
        zh: "不初始化直接应用",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.Back": {
        def: "Review another way to apply these settings",
        la: "Alium modum has optiones applicandi recense",
        zh: "查看其他应用这些设置的方式",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.BypassGuidance": {
        def: "Applying these settings alone can make this device incompatible with its existing synchronisation data. Use this only when you have confirmed that reconstruction is unnecessary.",
        la: "Solae hae optiones applicatae hoc instrumentum cum datis synchronizationis exstantibus incongruens reddere possunt. Hoc tantum adhibe cum confirmaveris reconstructionem non esse necessariam.",
        zh: "仅应用这些设置可能使本设备与其现有同步数据不兼容。请仅在确认无需重建时使用。",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.BypassTitle": {
        def: "Apply Settings without Initialisation?",
        la: "Applicarene optiones sine initiatione?",
        zh: "不初始化直接应用设置？",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.ContinueFetch": {
        def: "Continue with Fetch",
        la: "Perge cum arcessione",
        zh: "继续获取",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.FetchOption": {
        def: "Reset Synchronisation on This Device",
        la: "Restitue synchronizationem in hoc instrumento",
        zh: "重置本设备的同步",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.FetchOptionDesc": {
        def: "After restarting, rebuild this device's local database from the current remote synchronisation data. Files in the Vault will then be reconciled with that data.",
        la: "Post reinitium repositorium locale huius instrumenti ex datis synchronizationis remotis praesentibus reaedifica. Plicae in tabulario deinde cum illis datis concordabuntur.",
        zh: "重启后，用当前的远端同步数据重建本设备的本地数据库。库中的文件随后会与该数据核对合并。",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.FetchOptionP2PDesc": {
        def: "After restarting, select an online source device. This device's local database will be rebuilt from that source.",
        la: "Post reinitium instrumentum fontem conexum selige. Repositorium locale huius instrumenti ex illo fonte reaedificabitur.",
        zh: "重启后选择一台在线的源设备。本设备的本地数据库将从该源设备重建。",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.Guidance": {
        def: "These setting changes alter how synchronisation data is interpreted. Apply them together with an initialisation operation after restart.",
        la: "Hae mutationes optionum modum quo data synchronizationis interpretantur mutant. Eas una cum operatione initiationis post reinitium applica.",
        zh: "这些设置变更会改变同步数据的解释方式。请在重启后连同初始化操作一起应用。",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.KeepEditing": {
        def: "Keep Editing",
        la: "Perge emendare",
        zh: "继续编辑",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.ProceedFetch": {
        def: "Restart and Fetch Synchronisation Data",
        la: "Reinitia et arcesse data synchronizationis",
        zh: "重启并获取同步数据",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.ProceedFetchP2P": {
        def: "Restart and Select a Source Device",
        la: "Reinitia et instrumentum fontem selige",
        zh: "重启并选择源设备",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.ProceedRebuild": {
        def: "Restart and Overwrite Server Data",
        la: "Reinitia et superscribe data ministratoris",
        zh: "重启并覆盖服务器数据",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.ProceedRebuildP2P": {
        def: "Restart and Prepare This Device",
        la: "Reinitia et para hoc instrumentum",
        zh: "重启并准备本设备",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.Question": {
        def: "Which existing data should be used after restart?",
        la: "Quae data exstantia post reinitium adhibenda sunt?",
        zh: "重启后应使用哪份现有数据？",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.RebuildOption": {
        def: "Overwrite Server Data with This Device's Files",
        la: "Superscribe data ministratoris plicis huius instrumenti",
        zh: "用本设备的文件覆盖服务器数据",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.RebuildOptionDesc": {
        def: "Rebuild the local and remote databases from the files currently in this Vault. Other synchronising devices must reset their local synchronisation afterwards.",
        la: "Repositoria localia et remota ex plicis quae nunc in hoc tabulario sunt reaedifica. Alia instrumenta synchronizantia postea synchronizationem localem suam restituere debent.",
        zh: "用本库中当前的文件重建本地和远端数据库。其他正在同步的设备之后必须重置其本地同步。",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.RebuildOptionP2P": {
        def: "Prepare This Device from This Vault",
        la: "Para hoc instrumentum ex hoc tabulario",
        zh: "用本库的文件准备本设备",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.RebuildOptionP2PDesc": {
        def: "Rebuild this device's local database from the files currently in this Vault. This does not overwrite another device.",
        la: "Repositorium locale huius instrumenti ex plicis quae nunc in hoc tabulario sunt reaedifica. Hoc aliud instrumentum non superscribit.",
        zh: "用本库中当前的文件重建本设备的本地数据库。这不会覆盖其他设备。",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.RemoteVerificationGuidance": {
        def: "The configured remote could not be verified with the current credentials and encryption settings. Continuing may make the Fetch fail after restart.",
        la: "Remotum configuratum cum testimoniis et optionibus cryptationis praesentibus verificari non potuit. Si perges, arcessio post reinitium fortasse deficiet.",
        zh: "无法用当前的凭据和加密设置验证所配置的远端。继续可能导致重启后获取失败。",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.RemoteVerificationTitle": {
        def: "Remote Synchronisation Data Could Not Be Verified",
        la: "Data synchronizationis remota verificari non potuerunt",
        zh: "无法验证远端同步数据",
    },
    "Ui.SetupWizard.ApplySettingsInitialisation.Title": {
        def: "Apply Settings and Reinitialise Synchronisation",
        la: "Applica optiones et synchronizationem denuo initia",
        zh: "应用设置并重新初始化同步",
    },
    "Ui.SetupWizard.Common.Back": {
        def: "No, please take me back",
        la: "Minime, me reduc",
        zh: "不，带我返回",
    },
    "Ui.SetupWizard.Common.Cancel": {
        def: "Cancel",
        la: "Abroga",
        zh: "取消",
    },
    "Ui.SetupWizard.Common.ProceedSelectOption": {
        def: "Please select an option to proceed",
        la: "Optionem selige ut pergas",
        zh: "请选择一个选项后继续",
    },
    "Ui.SetupWizard.Intro.ExistingOption": {
        def: "I am adding a device to an existing synchronisation setup",
        la: "Instrumentum ad institutionem synchronizationis exstantem addo",
        zh: "将此设备加入已有同步配置",
    },
    "Ui.SetupWizard.Intro.ExistingOptionDesc": {
        def: "Select this if you are already using synchronisation on another computer or smartphone. Use this option to connect this device to that existing setup.",
        la: "Hoc selige si synchronizatione iam in alio computatro aut telephono callido uteris. Hac optione adhibita hoc instrumentum illi institutioni exstanti conecte.",
        zh: "如果你已经在另一台电脑或手机上使用同步，请选择此项。此选项用于将当前设备连接到既有同步配置。",
    },
    "Ui.SetupWizard.Intro.Guidance": {
        def: "We will now guide you through a few questions to simplify the synchronisation setup.",
        la: "Nunc te per paucas quaestiones ducemus ut institutio synchronizationis simplicior fiat.",
        zh: "接下来我们会通过几个问题，帮助你更轻松地完成同步配置。",
    },
    "Ui.SetupWizard.Intro.NewOption": {
        def: "I am setting this up for the first time",
        la: "Hoc primum instituo",
        zh: "首次设置同步",
    },
    "Ui.SetupWizard.Intro.NewOptionDesc": {
        def: "Select this if you are configuring this device as the first synchronisation device.",
        la: "Hoc selige si hoc instrumentum ut primum instrumentum synchronizationis configuras.",
        zh: "如果你正把这台设备作为第一台同步设备进行配置，请选择此项。",
    },
    "Ui.SetupWizard.Intro.ProceedExisting": {
        def: "Yes, I want to add this device to my existing synchronisation",
        la: "Ita, hoc instrumentum synchronizationi meae exstanti addere volo",
        zh: "是的，我要将此设备加入现有同步",
    },
    "Ui.SetupWizard.Intro.ProceedNew": {
        def: "Yes, I want to set up a new synchronisation",
        la: "Ita, novam synchronizationem instituere volo",
        zh: "是的，我要开始新的同步配置",
    },
    "Ui.SetupWizard.Intro.Question": {
        def: "First, please select the option that best describes your current situation.",
        la: "Primum optionem selige quae condicionem tuam praesentem optime describit.",
        zh: "首先，请选择最符合你当前情况的选项。",
    },
    "Ui.SetupWizard.Intro.Title": {
        def: "Welcome to Tabularium",
        la: "Salve in Tabularium",
        zh: "欢迎使用 Tabularium",
    },
    "Ui.SetupWizard.Invitation.Start": {
        def: "Start setup",
        la: "Incipe institutionem",
        zh: "开始设置",
    },
    "Ui.SetupWizard.OutroAskUserMode.CompatibleOption": {
        def: "The remote is already set up, and the configuration is compatible (or became compatible through this operation).",
        la: "Remotum iam paratum est, et configuratio congruit (aut hac operatione congruens facta est).",
        zh: "远程端已配置完成，且当前配置兼容（或已通过本次操作变为兼容）。",
    },
    "Ui.SetupWizard.OutroAskUserMode.CompatibleOptionDesc": {
        def: "Unless you are certain, selecting this option is risky. It assumes the server configuration is compatible with this device. If that is not the case, data loss may occur. Please make sure you understand the consequences.",
        la: "Nisi certus es, haec optio periculosa est. Ponit configurationem ministratoris cum hoc instrumento congruere. Si non ita est, data amitti possunt. Cura ut consequentias intellegas.",
        zh: "除非你非常确定，否则选择此项存在风险。它假定服务器配置与当前设备兼容。如果事实并非如此，可能会导致数据丢失。请确认你了解后果。",
    },
    "Ui.SetupWizard.OutroAskUserMode.ExistingOption": {
        def: "My remote server is already set up. I want to join this device.",
        la: "Ministrator meus remotus iam paratus est. Hoc instrumentum adiungere volo.",
        zh: "远程服务器已经配置完成，我想让此设备加入同步。",
    },
    "Ui.SetupWizard.OutroAskUserMode.ExistingOptionDesc": {
        def: "Selecting this option will make this device join the existing server. You need to fetch the existing synchronisation data from the server to this device.",
        la: "Hac optione selecta hoc instrumentum ministratori exstanti adiungetur. Data synchronizationis exstantia ex ministratore in hoc instrumentum arcessere debes.",
        zh: "选择此项后，此设备会加入已有服务器。你需要将服务器上的现有同步数据获取到此设备。",
    },
    "Ui.SetupWizard.OutroAskUserMode.Guidance": {
        def: "The connection to the server has been configured successfully. As the next step, the local database, in other words the synchronisation information, must be rebuilt.",
        la: "Conexio cum ministratore feliciter constituta est. Proximo gradu repositorium locale, id est notitia synchronizationis, reaedificandum est.",
        zh: "服务器连接已成功配置。下一步需要重建本地数据库，也就是同步状态信息。",
    },
    "Ui.SetupWizard.OutroAskUserMode.NewOption": {
        def: "I am setting up a new server for the first time / I want to reset my existing server.",
        la: "Novum ministratorem primum instituo / Ministratorem meum exstantem restituere volo.",
        zh: "我是第一次配置新服务器 / 我想重置现有服务器。",
    },
    "Ui.SetupWizard.OutroAskUserMode.NewOptionDesc": {
        def: "Selecting this option will initialise the server using the current data on this device. Any existing data on the server will be completely overwritten.",
        la: "Hac optione selecta ministrator datis praesentibus huius instrumenti initiabitur. Omnia data exstantia in ministratore omnino superscribentur.",
        zh: "选择此项后，服务器会使用当前设备上的数据进行初始化。服务器上的现有数据将被完全覆盖。",
    },
    "Ui.SetupWizard.OutroAskUserMode.ProceedApplySettings": {
        def: "Apply the settings",
        la: "Applica optiones",
        zh: "应用这些设置",
    },
    "Ui.SetupWizard.OutroAskUserMode.ProceedNext": {
        def: "Proceed to the next step.",
        la: "Ad proximum gradum procede.",
        zh: "继续下一步",
    },
    "Ui.SetupWizard.OutroAskUserMode.Question": {
        def: "Please select your situation.",
        la: "Condicionem tuam selige.",
        zh: "请选择你的当前情况。",
    },
    "Ui.SetupWizard.OutroAskUserMode.Title": {
        def: "Mostly Complete: Decision Required",
        la: "Fere perfectum: consilium requiritur",
        zh: "即将完成：还需要做出选择",
    },
    "Ui.SetupWizard.OutroNewP2PUser.GuidanceNotice": {
        def: "P2P has no central server copy to overwrite. This step prepares only this device; keep it online when another device fetches its initial data.",
        la: "P2P nullum exemplar centrale in ministratore habet quod superscribatur. Hic gradus solum hoc instrumentum parat; id conexum serva dum aliud instrumentum data initialia sua arcessit.",
        zh: "P2P 没有中心服务器副本可供覆盖。此步骤只准备本设备；当其他设备获取初始数据时，请保持本设备在线。",
    },
    "Ui.SetupWizard.OutroNewP2PUser.GuidancePrimary": {
        def: "The peer-to-peer connection has been configured successfully. Next, the local database will be built from the current files in this Vault.",
        la: "Conexio inter pares feliciter constituta est. Deinde repositorium locale ex plicis praesentibus in hoc tabulario aedificabitur.",
        zh: "点对点连接已配置成功。接下来，将用本库中当前的文件构建本地数据库。",
    },
    "Ui.SetupWizard.OutroNewP2PUser.Important": {
        def: "PLEASE NOTE",
        la: "NOTA BENE",
        zh: "请注意",
    },
    "Ui.SetupWizard.OutroNewP2PUser.Proceed": {
        def: "Restart and Prepare This Device",
        la: "Reinitia et para hoc instrumentum",
        zh: "重启并准备本设备",
    },
    "Ui.SetupWizard.OutroNewP2PUser.Question": {
        def: "Please select the button below to restart and proceed to the local initialisation confirmation.",
        la: "Preme globulum infra ut reinities et ad confirmationem initiationis localis procedas.",
        zh: "请点击下方按钮重启，然后进入本地初始化确认。",
    },
    "Ui.SetupWizard.OutroNewP2PUser.Title": {
        def: "Setup Complete: Preparing This P2P Device",
        la: "Institutio perfecta: hoc instrumentum P2P paratur",
        zh: "设置完成：正在准备本 P2P 设备",
    },
    "Ui.SetupWizard.OutroNewUser.GuidancePrimary": {
        def: "The connection to the server has been configured successfully. As the next step, the synchronisation data on the server will be built from the current data on this device.",
        la: "Conexio cum ministratore feliciter constituta est. Proximo gradu data synchronizationis in ministratore ex datis praesentibus huius instrumenti aedificabuntur.",
        zh: "服务器连接已成功配置。下一步将根据当前设备上的数据，在服务器端建立同步数据。",
    },
    "Ui.SetupWizard.OutroNewUser.GuidanceWarning": {
        def: "After restarting, the data on this device will be uploaded to the server as the master copy. Please note that any unintended data currently on the server will be completely overwritten.",
        la: "Post reinitium data huius instrumenti ad ministratorem ut exemplar principale sursum mittentur. Nota omnia data non intenta quae nunc in ministratore sunt omnino superscriptum iri.",
        zh: "重启后，当前设备上的数据会作为主副本上传到服务器。请注意，服务器上现有的非预期数据将被完全覆盖。",
    },
    "Ui.SetupWizard.OutroNewUser.Important": {
        def: "IMPORTANT",
        la: "MAGNI MOMENTI",
        zh: "重要",
    },
    "Ui.SetupWizard.OutroNewUser.Proceed": {
        def: "Restart and Initialise Server",
        la: "Reinitia et initia ministratorem",
        zh: "重启并初始化服务器",
    },
    "Ui.SetupWizard.OutroNewUser.Question": {
        def: "Please select the button below to restart and proceed to the final confirmation.",
        la: "Preme globulum infra ut reinities et ad confirmationem ultimam procedas.",
        zh: "请选择下方按钮，重启并进入最终确认步骤。",
    },
    "Ui.SetupWizard.OutroNewUser.Title": {
        def: "Setup Complete: Preparing to Initialise Server",
        la: "Institutio perfecta: ministrator initiandus paratur",
        zh: "设置完成：准备初始化服务器",
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
    "Ui.SetupWizard.SelectExisting.Guidance": {
        def: "You are adding this device to an existing synchronisation setup.",
        la: "Hoc instrumentum ad institutionem synchronizationis exstantem addis.",
        zh: "你正在将此设备加入已有同步配置。",
    },
    "Ui.SetupWizard.SelectExisting.ManualOption": {
        def: "Configure a remote manually",
        la: "Configura remotum manu",
        zh: "手动输入服务器信息",
    },
    "Ui.SetupWizard.SelectExisting.ManualOptionDesc": {
        def: "Configure the same remote as your other devices again manually. This is intended only for advanced users.",
        la: "Idem remotum atque in aliis instrumentis tuis iterum manu configura. Hoc tantum usoribus provectis destinatum est.",
        zh: "手动重新配置与你其他设备相同的服务器信息。此方式仅适用于高级用户。",
    },
    "Ui.SetupWizard.SelectExisting.ProceedManual": {
        def: "Proceed with manual configuration",
        la: "Procede cum configuratione manuali",
        zh: "我知道服务器信息，让我手动输入",
    },
    "Ui.SetupWizard.SelectExisting.ProceedQr": {
        def: "Scan the QR code displayed on an active device using this device's camera.",
        la: "Codicem QR in instrumento activo ostensum camera huius instrumenti perscrutare.",
        zh: "使用本设备摄像头扫描活动设备上显示的二维码",
    },
    "Ui.SetupWizard.SelectExisting.ProceedSetupUri": {
        def: "Proceed with Setup URI",
        la: "Procede cum Setup URI",
        zh: "使用 Setup URI 继续",
    },
    "Ui.SetupWizard.SelectExisting.QrOption": {
        def: "Scan a QR Code (Recommended for mobile)",
        la: "Perscrutare codicem QR (instrumentis mobilibus commendatur)",
        zh: "扫描二维码（移动端推荐）",
    },
    "Ui.SetupWizard.SelectExisting.QrOptionDesc": {
        def: "Scan the QR code displayed on an active device using this device's camera.",
        la: "Codicem QR in instrumento activo ostensum camera huius instrumenti perscrutare.",
        zh: "使用本设备摄像头扫描活动设备上显示的二维码。",
    },
    "Ui.SetupWizard.SelectExisting.Question": {
        def: "Please select a method to import the settings from another device.",
        la: "Modum selige quo optiones ex alio instrumento importentur.",
        zh: "请选择一种从其他设备导入设置的方法。",
    },
    "Ui.SetupWizard.SelectExisting.SetupUriOption": {
        def: "Use a Setup URI (Recommended)",
        la: "Adhibe Setup URI (commendatur)",
        zh: "使用 Setup URI（推荐）",
    },
    "Ui.SetupWizard.SelectExisting.SetupUriOptionDesc": {
        def: "Paste the Setup URI generated from one of your active devices.",
        la: "Insere Setup URI ex uno instrumentorum tuorum activorum generatum.",
        zh: "粘贴从某台已启用设备生成的 Setup URI。",
    },
    "Ui.SetupWizard.SelectExisting.Title": {
        def: "Device Setup Method",
        la: "Modus instituendi instrumentum",
        zh: "设备设置方式",
    },
    "Ui.SetupWizard.SelectNew.Guidance": {
        def: "We will now configure the synchronisation connection.",
        la: "Nunc conexionem synchronizationis configurabimus.",
        zh: "接下来将继续配置服务器连接信息。",
    },
    "Ui.SetupWizard.SelectNew.ManualOption": {
        def: "Configure a remote manually",
        la: "Configura remotum manu",
        zh: "手动输入服务器信息",
    },
    "Ui.SetupWizard.SelectNew.ManualOptionDesc": {
        def: "This is an advanced option for users who do not have a Setup URI or who want to configure detailed settings. You can also use it for P2P synchronisation instead of CouchDB or S3-compatible Object Storage.",
        la: "Haec est optio provecta usoribus qui Setup URI non habent aut qui optiones accuratas configurare volunt. Eam etiam ad synchronizationem P2P adhibere potes pro CouchDB aut repositorio plicarum obiectorum cum S3 congruenti.",
        zh: "如果你没有 Setup URI，或希望自行配置更详细的参数，可选择此高级选项。",
    },
    "Ui.SetupWizard.SelectNew.ProceedManual": {
        def: "Proceed with manual configuration",
        la: "Procede cum configuratione manuali",
        zh: "我知道服务器信息，让我手动输入",
    },
    "Ui.SetupWizard.SelectNew.ProceedSetupUri": {
        def: "Proceed with Setup URI",
        la: "Procede cum Setup URI",
        zh: "使用 Setup URI 继续",
    },
    "Ui.SetupWizard.SelectNew.Question": {
        def: "How would you like to configure this synchronisation connection?",
        la: "Quomodo hanc conexionem synchronizationis configurare vis?",
        zh: "你希望如何配置服务器连接？",
    },
    "Ui.SetupWizard.SelectNew.SetupUriOption": {
        def: "Use a Setup URI (Recommended)",
        la: "Adhibe Setup URI (commendatur)",
        zh: "使用 Setup URI（推荐）",
    },
    "Ui.SetupWizard.SelectNew.SetupUriOptionDesc": {
        def: "A Setup URI is a single string containing connection and authentication details. When one is available from a setup script, it provides a simple and secure configuration method.",
        la: "Setup URI est series una quae notitiam conexionis et authenticationis continet. Cum ex scripto institutionis praesto est, modum configurandi simplicem et tutum praebet.",
        zh: "Setup URI 是一段包含服务器地址和认证信息的文本。如果你的服务器安装脚本已经生成了它，这是最简单且安全的配置方式。",
    },
    "Ui.SetupWizard.SelectNew.Title": {
        def: "Connection Method",
        la: "Modus conexionis",
        zh: "连接方式",
    },
    "Ui.SetupWizard.SetupRemote.BucketOption": {
        def: "S3-compatible Object Storage",
        la: "Repositorium plicarum obiectorum cum S3 congruens",
        zh: "S3/MinIO/R2 对象存储",
    },
    "Ui.SetupWizard.SetupRemote.BucketOptionDesc": {
        def: "Synchronisation using journal files. You must already have an S3-compatible Object Storage service set up, such as Amazon S3, MinIO, or Cloudflare R2.",
        la: "Synchronizatio per plicas diarii. Ministerium repositorii plicarum obiectorum cum S3 congruens iam paratum habere debes, ut Amazon S3, MinIO, aut Cloudflare R2.",
        zh: "使用日志文件进行同步。你需要先准备好兼容 S3/MinIO/R2 的对象存储服务。",
    },
    "Ui.SetupWizard.SetupRemote.CouchDbOptionDesc": {
        def: "This is the most suitable synchronisation method for the current design. All features are available. You must already have a CouchDB instance set up.",
        la: "Hic est modus synchronizationis designationi praesenti aptissimus. Omnes facultates praesto sunt. Instantiam CouchDB iam paratam habere debes.",
        zh: "这是当前设计下最适合的同步方式，所有功能都可用。你需要先准备好 CouchDB 实例。",
    },
    "Ui.SetupWizard.SetupRemote.Guidance": {
        def: "Select the remote type for this synchronisation setup.",
        la: "Genus remoti huic institutioni synchronizationis selige.",
        zh: "请选择你要连接的服务器类型。",
    },
    "Ui.SetupWizard.SetupRemote.P2POption": {
        def: "Peer-to-Peer (P2P)",
        la: "Inter pares (P2P)",
        zh: "仅点对点",
    },
    "Ui.SetupWizard.SetupRemote.P2POptionDesc": {
        def: "This enables direct synchronisation between devices. No server is required, but both devices must be online at the same time and some features may be limited. Internet connectivity is required only for signalling, not for data transfer.",
        la: "Hoc synchronizationem directam inter instrumenta permittit. Nullus ministrator requiritur, sed ambo instrumenta simul conexa esse debent, et quaedam facultates fortasse limitatae erunt. Conexio interretialis tantum ad signa requiritur, non ad data transferenda.",
        zh: "启用设备之间的直接同步。无需服务器，但两台设备必须同时在线，且部分功能可能受限。互联网连接仅用于信令，不用于传输数据。",
    },
    "Ui.SetupWizard.SetupRemote.ProceedBucket": {
        def: "Continue to Object Storage setup",
        la: "Perge ad institutionem repositorii plicarum obiectorum",
        zh: "继续配置 S3/MinIO/R2",
    },
    "Ui.SetupWizard.SetupRemote.ProceedCouchDb": {
        def: "Continue to CouchDB setup",
        la: "Perge ad institutionem CouchDB",
        zh: "继续配置 CouchDB",
    },
    "Ui.SetupWizard.SetupRemote.ProceedP2P": {
        def: "Continue to P2P setup",
        la: "Perge ad institutionem P2P",
        zh: "继续配置仅点对点模式",
    },
    "Ui.SetupWizard.SetupRemote.Title": {
        def: "Choose a synchronisation remote",
        la: "Elige remotum synchronizationis",
        zh: "输入服务器信息",
    },
    "Unable to display the file in the editor": {
        def: "Unable to display the file in the editor",
        la: "Plica in editore monstrari non potest",
        zh: "无法在编辑器中显示该文件",
    },
    "Unicode NFC path identity": {
        def: "Unicode NFC path identity",
        la: "Identitas viae Unicode NFC",
        zh: "Unicode NFC 路径标识",
    },
    "Unique name between all synchronized devices. To edit this setting, please disable customization sync once.": {
        def: "Unique name between all synchronized devices. To edit this setting, please disable customization sync once.",
        la: "Nomen unicum inter omnia instrumenta synchronizata. Ut hanc optionem emendes, synchronizationem optionum propriarum semel deactiva.",
        zh: "所有同步设备之间的唯一名称。要编辑此设置,请首先禁用自定义同步",
    },
    "Unless you are certain, selecting this options is bit dangerous. It assumes that the server configuration is compatible with this device. If this is not the case, data loss may occur. Please ensure you know what you are doing.":
        {
            def: "Unless you are certain, selecting this options is bit dangerous. It assumes that the server configuration is compatible with this device. If this is not the case, data loss may occur. Please ensure you know what you are doing.",
            la: "Nisi certus es, haec optio aliquantum periculosa est. Ponit configurationem ministratoris cum hoc instrumento congruere. Si non ita est, data amitti possunt. Cura ut scias quid agas.",
            zh: "除非你非常确定，否则选择此选项有些危险。它假定服务器配置与本设备兼容。若不兼容，可能会发生数据丢失。请确保你清楚自己在做什么。",
        },
    "Updating list...": {
        def: "Updating list...",
        la: "Index renovatur...",
        zh: "正在更新列表…",
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
    "Use a custom passphrase": {
        def: "Use a custom passphrase",
        la: "Adhibe tesseram arcanam propriam",
        zh: "使用自定义密码短语",
    },
    "Use a Setup URI (Recommended)": {
        def: "Use a Setup URI (Recommended)",
        la: "Adhibe Setup URI (commendatur)",
        zh: "使用 Setup URI（推荐）",
    },
    "Use Custom HTTP Handler": {
        def: "Use Custom HTTP Handler",
        la: "Adhibe tractatorem HTTP proprium",
        zh: "使用自定义 HTTP 处理程序",
    },
    "Use Diagnostic RTCPeerConnection for statistics": {
        def: "Use Diagnostic RTCPeerConnection for statistics",
        la: "Adhibe RTCPeerConnection diagnosticum ad statisticas",
        zh: "使用诊断用 RTCPeerConnection 收集统计信息",
    },
    "Use dynamic iteration count": {
        def: "Use dynamic iteration count",
        la: "Adhibe numerum iterationum dynamicum",
        zh: "使用动态迭代次数",
    },
    "Use internal API": {
        def: "Use internal API",
        la: "Adhibe API internam",
        zh: "使用内部 API",
    },
    "Use Internal API": {
        def: "Use Internal API",
        la: "Adhibe API internam",
        zh: "使用内部 API",
    },
    "Use JWT Authentication": {
        def: "Use JWT Authentication",
        la: "Adhibe authenticationem JWT",
        zh: "使用 JWT 身份验证",
    },
    "Use Path-Style Access": {
        def: "Use Path-Style Access",
        la: "Adhibe accessum per viam",
        zh: "使用路径风格访问",
    },
    "Use Random Number": {
        def: "Use Random Number",
        la: "Adhibe numerum fortuitum",
        zh: "使用随机数",
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
    "Use the copied setup URI (Formerly Open setup URI)": {
        def: "Use the copied setup URI (Formerly Open setup URI)",
        la: "Adhibe Setup URI exscriptum (olim «Aperi Setup URI»)",
        zh: "使用已复制的设置 URI（原「打开设置 URI」）",
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
    "Use vrtmrz's relay": {
        def: "Use vrtmrz's relay",
        la: "Adhibe relay vrtmrz",
        zh: "使用 vrtmrz 的中继",
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
    "Verify all": {
        def: "Verify all",
        la: "Verifica omnia",
        zh: "全部校验",
    },
    "Verify and repair all files": {
        def: "Verify and repair all files",
        la: "Verifica et repara omnes plicas",
        zh: "校验并修复所有文件",
    },
    Version: {
        def: "Version",
        la: "Versio",
        zh: "版本",
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
    WATCHING: {
        def: "WATCHING",
        la: "OBSERVANS",
        zh: "监视中",
    },
    "We are about to retrieve the remote data.\n\nFirstly, how shall we handle the data retrieved from this remote source?\n\n- **${NEWER_WINS}**: Compares the modified time of files and takes the newer one.\n  If you have been using Self-hosted LiveSync and have made changes on multiple devices, this option may be suitable for you as it tries to merge changes based on modified time.\n- **${REMOTE_WINS}**: Remote data is the source of truth.\n  If you are new to using Self-hosted LiveSync. This option may be easiest to understand and get started with.\n  It will overwrite all your local files with the remote data, so please make sure you have a backup if there is any important data in your vault.\n- **${DETAILED}**: Opens the detailed setup wizard.\n  If you want to have more control over the synchronisation process, or want to review the changes before applying, you can choose this option to use the detailed flow.":
        {
            def: "We are about to retrieve the remote data.\n\nFirstly, how shall we handle the data retrieved from this remote source?\n\n- **${NEWER_WINS}**: Compares the modified time of files and takes the newer one.\n  If you have been using Tabularium and have made changes on multiple devices, this option may be suitable for you as it tries to merge changes based on modified time.\n- **${REMOTE_WINS}**: Remote data is the source of truth.\n  If you are new to using Tabularium. This option may be easiest to understand and get started with.\n  It will overwrite all your local files with the remote data, so please make sure you have a backup if there is any important data in your vault.\n- **${DETAILED}**: Opens the detailed setup wizard.\n  If you want to have more control over the synchronisation process, or want to review the changes before applying, you can choose this option to use the detailed flow.",
            la: "Data remota mox recipiemus.\n\nPrimum, quomodo data ex hoc fonte remoto recepta tractabimus?\n\n- **${NEWER_WINS}**: Tempora mutationis plicarum comparat et recentiorem sumit.\n  Si Tabularium iam adhibuisti et in pluribus instrumentis mutationes fecisti, haec optio tibi fortasse apta est, quia mutationes secundum tempus mutationis conflare conatur.\n- **${REMOTE_WINS}**: Data remota fons veritatis sunt.\n  Si Tabularium primum adhibes, haec optio fortasse facillima est ad intellegendum et incipiendum.\n  Omnes plicas tuas locales datis remotis superscribet, itaque cura ut exemplar tutum habeas si qua data magni momenti in tabulario tuo sunt.\n- **${DETAILED}**: Ductorem institutionis accuratum aperit.\n  Si processum synchronizationis magis regere vis, aut mutationes ante applicationem recensere vis, hanc optionem eligere potes ut processum accuratum adhibeas.",
            zh: "即将获取远程数据。\n\n首先，应如何处理从此远程来源获取的数据？\n\n- **${NEWER_WINS}**：比较文件的修改时间，采用较新的版本。\n  如果你一直在使用 Tabularium，并在多台设备上做过修改，此选项可能适合你，因为它会尝试根据修改时间合并变更。\n- **${REMOTE_WINS}**：以远程数据为准。\n  如果你刚开始使用 Tabularium，此选项可能最容易理解和上手。\n  它会用远程数据覆盖所有本地文件，因此如果笔记库中有重要数据，请确保已做好备份。\n- **${DETAILED}**：打开详细设置向导。\n  如果你希望更好地控制同步过程，或想在应用前查看变更，可以选择此选项使用详细流程。",
        },
    'We can not use "/" to the device name': {
        def: 'We can not use "/" to the device name',
        la: 'Signum "/" in nomine instrumenti adhibere non possumus',
        zh: "设备名称中不能使用「/」",
    },
    "We can use only Secure (HTTPS) connections on Obsidian Mobile.": {
        def: "We can use only Secure (HTTPS) connections on Obsidian Mobile.",
        la: "In Obsidian Mobile solas conexiones tutas (HTTPS) adhibere possumus.",
        zh: "Obsidian 移动端只能使用安全（HTTPS）连接。",
    },
    "We cannot change the device name while this feature is enabled. Please disable this feature to change the device name.":
        {
            def: "We cannot change the device name while this feature is enabled. Please disable this feature to change the device name.",
            la: "Nomen instrumenti mutare non possumus dum haec facultas activa est. Hanc facultatem deactiva ut nomen instrumenti mutes.",
            zh: "启用此功能时无法更改设备名称。如需修改设备名称，请先禁用此功能。",
        },
    "We don't have any history for this note.": {
        def: "We don't have any history for this note.",
        la: "Nulla historia huius commentarii nobis est.",
        zh: "此笔记没有任何历史记录。",
    },
    "We have to configure the device name": {
        def: "We have to configure the device name",
        la: "Nomen instrumenti configurandum est",
        zh: "需要先配置设备名称",
    },
    "We recommend that you copy your Vault folder to a safe location. This will provide a safeguard in case a large number of conflicts arise, or if you accidentally synchronise with an incorrect destination.":
        {
            def: "We recommend that you copy your Vault folder to a safe location. This will provide a safeguard in case a large number of conflicts arise, or if you accidentally synchronise with an incorrect destination.",
            la: "Suademus ut thecam tabularii tui in locum tutum exscribas. Hoc praesidium praebebit si multae discrepantiae oriuntur, aut si per errorem cum destinatione falsa synchronizas.",
            zh: "我们建议你把库文件夹复制到安全位置。这样在出现大量冲突，或不小心同步到错误目标时，能多一层保障。",
        },
    "We will now guide you through a few questions to simplify the synchronisation setup.": {
        def: "We will now guide you through a few questions to simplify the synchronisation setup.",
        la: "Nunc te per paucas quaestiones ducemus ut institutio synchronizationis simplicior fiat.",
        zh: "接下来我们会通过几个问题，引导你更轻松地完成同步设置。",
    },
    "We will now proceed with the server configuration.": {
        def: "We will now proceed with the server configuration.",
        la: "Nunc ad configurationem ministratoris procedemus.",
        zh: "接下来将继续进行服务器配置。",
    },
    "Welcome to Self-hosted LiveSync": {
        def: "Welcome to Tabularium",
        la: "Salve in Tabularium",
        zh: "欢迎使用 Tabularium",
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
    "Write setting markdown manually": {
        def: "Write setting markdown manually",
        la: "Scribe configurationem in Markdown manu",
        zh: "手动写出设置 Markdown",
    },
    "xxhash32 (Fast but less collision resistance)": {
        def: "xxhash32 (Fast but less collision resistance)",
        la: "xxhash32 (Celer sed minus collisionibus resistens)",
        zh: "xxhash32（速度快，但抗碰撞能力较弱）",
    },
    "xxhash64 (Fastest)": {
        def: "xxhash64 (Fastest)",
        la: "xxhash64 (Celerrimus)",
        zh: "xxhash64（最快）",
    },
    "Yes, I want to add this device to my existing synchronisation": {
        def: "Yes, I want to add this device to my existing synchronisation",
        la: "Ita, hoc instrumentum synchronizationi meae exstanti addere volo",
        zh: "是的，我要把这台设备加入现有同步",
    },
    "Yes, I want to set up a new synchronisation": {
        def: "Yes, I want to set up a new synchronisation",
        la: "Ita, novam synchronizationem constituere volo",
        zh: "是的，我要配置新的同步",
    },
    "You are adding this device to an existing synchronisation setup.": {
        def: "You are adding this device to an existing synchronisation setup.",
        la: "Hoc instrumentum synchronizationi iam constitutae addis.",
        zh: "你正在将此设备加入到现有同步配置中。",
    },
    "You can configure in the Obsidian Plugin Settings.": {
        def: "You can configure in the Obsidian Plugin Settings.",
        la: "In optionibus additamentorum Obsidian configurare potes.",
        zh: "你可以在 Obsidian 插件设置中配置。",
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
    "you wanted(Thank you)!": {
        def: "you wanted(Thank you)!",
        la: "voluisti (Gratias tibi)!",
        zh: "你要求的操作（谢谢）！",
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
            la: "Instrumenta adiuncta renovari non potuerunt. Indicem refice et iterum conare. Si configuratio remota mutata est, hunc dialogum claude et instrumenta adiuncta iterum aperi.",
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
