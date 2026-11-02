<script lang="ts">
    import { onMount } from "svelte";
    import type { GuestDialogProps } from "@/ui/dialogs/svelteDialog";
    import DialogHeader from "@/ui/dialogs/components/DialogHeader.svelte";
    import Instruction from "@/ui/dialogs/components/Instruction.svelte";
    import InputRow from "@/ui/dialogs/components/InputRow.svelte";
    import Decision from "@/ui/dialogs/components/Decision.svelte";
    import UserDecisions from "@/ui/dialogs/components/UserDecisions.svelte";
    import InfoNote from "@/ui/dialogs/components/InfoNote.svelte";
    import { $msg as translateMessage } from "@/core/common/translation";
    const TYPE_OK = "ok";
    type ResultType = typeof TYPE_OK;
    type Options = {
        title?: string;
        dataToCopy: string;
    };
    type Props = GuestDialogProps<ResultType, Options>;
    const { setResult, getInitialData }: Props = $props();
    let dataToCopy = $state("");
    let title = $state<string | undefined>(undefined);
    let copied = $state(false);
    onMount(() => {
        if (getInitialData) {
            const initialData = getInitialData();
            if (initialData) {
                dataToCopy = initialData.dataToCopy;
                title = initialData.title;
            }
        }
    });
    function commit() {
        setResult(TYPE_OK);
    }
    async function copyToClipboard() {
        await navigator.clipboard.writeText(dataToCopy);
        copied = true;
    }
</script>

<DialogHeader title={translateMessage("dialog.copy.ready", { title: title || translateMessage("dialog.copy.defaultTitle") })} />
<Instruction>
    <InputRow label={title || translateMessage("Data to Copy")}>
        <textarea readonly rows="4">{dataToCopy}</textarea>
        <button onclick={() => copyToClipboard()}
            >{#if !copied}{translateMessage("Copy")}{:else}✓ {translateMessage("Copied")}{/if}
        </button>
    </InputRow>
</Instruction>
<InfoNote visible={copied}>
    {translateMessage("dialog.copy.copied", { title: title || translateMessage("dialog.copy.defaultTitle") })}
</InfoNote>
<UserDecisions>
    <Decision title={translateMessage("Ok")} important={true} {commit} />
</UserDecisions>

<style>
    textarea {
        resize: none;
    }

    button {
        min-width: 44px;
        min-height: 44px;
    }
</style>
