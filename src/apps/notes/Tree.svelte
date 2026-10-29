<script module lang="ts">
    export interface TreeNode {
        name: string;
        path: string;
        folder: boolean;
        children: TreeNode[];
    }
</script>

<script lang="ts">
    import Self from "./Tree.svelte";
    import type { KindleItem } from "./kindle";
    import { t } from "../../../../server/ui/i18n";

    interface Props {
        node: TreeNode;
        current?: string;
        selecting: boolean;
        selected: KindleItem[];
        conflicted: Set<string>;
        expandAll: boolean;
        open(path: string): void;
        toggle(item: KindleItem): void;
        send(item: KindleItem): void;
        select(item: KindleItem): void;
        rename(item: KindleItem): void;
        remove(item: KindleItem): void;
    }
    let { node, current, selecting, selected, conflicted, expandAll, open, toggle, send, select, rename, remove }: Props = $props();
    let expanded = $state<Record<string, boolean>>({});
    let menu = $state<string>();

    const sendable = (child: TreeNode) => child.folder || /\.md$/i.test(child.name);
    const item = (child: TreeNode): KindleItem => ({ path: child.path, folder: child.folder });
    const label = (child: TreeNode) => (child.folder ? child.name : child.name.replace(/\.md$/i, ""));
</script>

<ul>
    {#each node.children as child (child.path + (child.folder ? "/" : ""))}
        <li>
            <div class="row" class:current={child.path === current}>
                {#if selecting && sendable(child)}
                    <input type="checkbox" aria-label={t("notes.selectItem", { name: child.name })} checked={selected.some((s) => s.path === child.path)} onchange={() => toggle(item(child))} />
                {/if}
                {#if child.folder}
                    <button class="name folder" aria-expanded={expandAll || !!expanded[child.path]} onclick={() => (expanded[child.path] = !expanded[child.path])}>
                        {expandAll || expanded[child.path] ? "▾" : "▸"} {child.name}
                    </button>
                {:else}
                    <button class="name" class:other={!/\.md$/i.test(child.name)} onclick={() => open(child.path)}>{label(child)}</button>
                    {#if conflicted.has(child.path)}<span class="conflict-mark" title={t("notes.stateConflict")}>{t("notes.conflictMark")}</span>{/if}
                {/if}
                {#if !selecting}
                    <button class="more" aria-label={t("notes.more")} title={t("notes.more")} onclick={() => (menu = menu === child.path ? undefined : child.path)}>⋯</button>
                {/if}
            </div>
            {#if menu === child.path}
                <div class="menu" role="menu">
                    {#if sendable(child)}
                        <button role="menuitem" onclick={() => ((menu = undefined), send(item(child)))}>{t("notes.send")}</button>
                        <button role="menuitem" onclick={() => ((menu = undefined), select(item(child)))}>{t("notes.select")}</button>
                    {/if}
                    <button role="menuitem" onclick={() => ((menu = undefined), rename(item(child)))}>{t("notes.rename")}</button>
                    <button role="menuitem" onclick={() => ((menu = undefined), remove(item(child)))}>{t("notes.delete")}</button>
                </div>
            {/if}
            {#if child.folder && (expandAll || expanded[child.path])}
                <Self node={child} {current} {selecting} {selected} {conflicted} {expandAll} {open} {toggle} {send} {select} {rename} {remove} />
            {/if}
        </li>
    {/each}
</ul>
