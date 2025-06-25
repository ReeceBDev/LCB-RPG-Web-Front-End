import * as THREE from 'three';
//@ts-ignore
import { EffectInstructions } from '../Types/EffectInstructions.js';
import { randFloat, randInt } from 'three/src/math/MathUtils.js';
import { Text } from 'troika-three-text';
import { Colour } from '../Types/Colour.js';

export class RapidScrollingText {
    scene: THREE.Scene;
    textspace: Text;
    redFlashPanel: THREE.Mesh;

    currentLines = new Array<string>;
    possibleLines: Array<string>;
    flashQueue = new Array<number>;

    textMutexHeld: boolean = false;
    flashMutexHeld: boolean = false;


    newLineDelay: number; //In seconds
    textspaceHeight: number; //In lines
    startingLineCount: number;
    flashLengthMS: number;
    flashDelayMinMS: number; 
    flashDelayMaxMS: number;

    constructor(setScene:
        THREE.Scene,
        textSpaceHeight: number = 40,
        startingLineCount: number = 40,
        newLineDelay: number = 0.06,
        flashLengthMS: number = 100,
        flashDelayMinMS: number = 200,
        flashDelayMaxMS: number = 2600,
    ) {
        this.scene = setScene; 
        this.textspaceHeight = textSpaceHeight;
        this.startingLineCount = startingLineCount;
        this.flashLengthMS = flashLengthMS;
        this.flashDelayMinMS = flashDelayMinMS;
        this.flashDelayMaxMS = flashDelayMaxMS;
        this.newLineDelay = newLineDelay;

        this.InitialiseRedFlash(this.scene);
        this.InitialiseTextspace(this.scene);
        this.InitialisePossibleLines(this.scene);
        this.InitialiseCurrentLines(); //Must come after InitialisePossibleLines()
    }

    public AnimateAlert() {
        this.WriteText();
        this.FlashRed();
    }

    public ClearAnimation() {
        //Cancel Flash
        while (this.flashQueue.length > 0) {
            clearTimeout(this.flashQueue.pop());
        }

        //Clear text
        this.textspace.text = "";
        this.textspace.sync();
        this.textspace.dispose();

        //Reset the currentLines
        this.currentLines = new Array<string>;
        this.InitialiseCurrentLines();
    }

    private WriteText() {
        //Add lines to text lines, one at a time, with some delay
        if (!this.textMutexHeld) {
            this.textMutexHeld = true;

            setTimeout(() => {
                this.GenerateLine();
                this.textMutexHeld = false;
            }, this.newLineDelay * 1000) //Wait before adding a new line.
        }


        this.textspace.text = this.currentLines.join("\n");
        this.textspace.sync();
    }

    private GenerateLine() {
        //Add whitespaces
        let emptyLineCount = randInt(0, 8); //Between 0-4 new lines, with the additional chances below:

        if ((emptyLineCount === 5) || (emptyLineCount === 6)) //Make no-lines +2 as likely (thrice).
            emptyLineCount = 0;

        if ((emptyLineCount === 7) || (emptyLineCount === 8)) //Make single-lines +2 as likely (thrice).
            emptyLineCount = 1;

        for (let i = 0; i < emptyLineCount; i++) {
            this.currentLines.push("");
        }

        this.currentLines.push(this.possibleLines[randInt(0, this.possibleLines.length)]); //A random line

        //Remove first line if line limit reached
        while (this.currentLines.length > this.textspaceHeight)
            this.currentLines.shift();
    }

    private FlashRed() {
        if (!this.flashMutexHeld) {
            this.flashMutexHeld = true;

            let timeUntilFlash = randFloat(this.flashDelayMinMS, this.flashDelayMaxMS); //Match timeouts, so release may be scheduled but only the flash cancelled.

            //Queue a flash. Flashqueue allows it to be cancelled.
            this.flashQueue.push(setTimeout(() => {
                this.textspace.color = (randInt(0, 1)) ? 0x006600 : 0x002288; //Text to yellow or blue
                this.textspace.sync();
                this.redFlashPanel.visible = true;

                //Finish a flash
                setTimeout(() => {
                    this.redFlashPanel.visible = false;
                    this.textspace.color = 0xFFFFFF; //Text back to white
                    this.textspace.sync();
                }, this.flashLengthMS) //Wait before stopping flash.
            }, timeUntilFlash)) //Wait before starting flash.

            setTimeout(() => { this.flashMutexHeld = false; }, timeUntilFlash) //Release mutex after flash has ran, outside of the flashQueue.
        }
    }

    private InitialiseRedFlash(scene: THREE.Scene) {
        const g = new THREE.PlaneGeometry(30, 30, 1, 1);
        const m = new THREE.MeshBasicMaterial({ color: Colour.WarningRed, side: THREE.DoubleSide })
        this.redFlashPanel = new THREE.Mesh(g, m);
        this.redFlashPanel.visible = false;
        scene.add(this.redFlashPanel);
    }

    private InitialiseTextspace(scene: THREE.Scene) {
        this.textspace = new Text();
        this.textspace.fontSize = 0.12
        this.textspace.color = 0xFFFFFF;
        this.textspace.position.x = -7;
        this.textspace.position.y = 4;
        scene.add(this.textspace);
    }

    private InitialiseCurrentLines() {
        for (let i = 0; i < this.startingLineCount; i++) {
            this.GenerateLine(); //Give it an initial few lines
        }
    }

    private InitialisePossibleLines(scene: THREE.Scene) {
        this.possibleLines = new Array<string>(
            "::",
            "CORE.STACKTRACE::REGISTER >> [0000:AC12:FF02:0087] | FLAGS=0x4A",
            "--:stream.alive[true]::mod=standby.passive",
            "AUTH_PROTOSEQ[ALPHA]::INITIALIZED @ 00:00:03.188 | STATUS:SEALED",
            "SIGNAL_CHAIN_PIPE >> {VAR:PSI_LOAD} | {VAR:MEMTRACE} -> /mnt/sys/bin/queue.flush",
            ">>>>> stream.latency: ±0.00023",
            "▣ POST-PROCESS > thermal.spec/42° within bounds",
            "LATENCY CURVE :: adjusted",
            "....",
            ".watchdog/breathe.log :: no anomalies :: pulse_normal",
            "::flag.reset::granted",
            "ECHO_STREAM > core/echo/loop ↦ INPUT::NULL >> RETURN CODE::0x00000000",
            ".sys_check//quiet cycle resumed — hold:0.002ms",
            "SUBSTRUCTURE.DEPLOYMENT_PHASE:04A :: PIPE: /dev/logic_bus/core/integrity_scan",
            "::flag.local~set:: process ID - not recorded",
            "█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
            ":: echo_test[neutral] – buffer delay offset +0.022s",
            "MOD_PROBE >> bio.interface.ψ | latency: 18ms | error_count=0",
            "▌stream ID NULL/0043 suppressed ∴ rate held constant",
            ":: silence-feed . . . hold pattern . . .",
            "::raw [ALERT_SUPPRESSED] ::",
            "MEMORY_IMAGE[shadow_copy_03] >> mounted at addr[0x0040:2B1C]",
            "TEMPORAL INDEXING >> SKEW: +0034ns :: ADJUSTMENT IN PROCESS",
            ">_core_temp_regulator.sync[DEEP_MODE] > pressure_log=false > latency_report=INACTIVE > override=disabled > watchdog=no-ping :: trigger delay set 140s",
            "VECTOR ALIGN:: [OK]",
            "PULSE.MIRROR::ENGAGED | FEED_INTERVAL=333ms | REFLECTOR_NODE::SYNCHRONIZED",
            ". . . stream empty . . .",
            "NULL-REGISTRY: /env/ψ1 → cold_check complete",
            ">>>>>TRANSACTION_PACKET_BEGIN>>>>>>",
            "--freeze--",
            "SIG_UNIT/42-c/idle :: drift Δ: +0.001ns",
            "::context drift acceptable <±0.05%",
            "LOCK_VECTOR[0x7FFE] >> CONTEXTUAL RESIDUE DETECTED >> PURGE DEFERRED",
            ":: STABILITY PROFILE BROADCASTED — CHANNEL LOCKED [PHASE:GRACE-LOCK]",
            "::transmission silence::",
            "VECTOR_ENGINE.STAGE=PRE-LOCKDOWN",
            "SPAWN_GATE[03] :: seal integrity at 92.3% | coolant path OK",
            "RECURSIVE_COMPILE >> /src/process/α-mode/operator.build --depth=∞",
            "▣ silence continues / threshold below logging level ▣",
            ".frame-capture initialized . depth pass [0x19] / cooling nominal / source attenuation < 2%",
            ":: SYSTEM MEMBLOCK SHADOW CHECK PASSED – THRESHOLD REACHED – NO COLLAPSE DETECTED",
            ":: SET OK",
            "CHANNEL.AUTH LOCKED >> RETENTION POLICY: DELAYED PURGE",
            "TRACE >> queue.thread = aligned : deviation < 0.2%",
            "REMOTE OPERAND :: NO RESPONSE >> RETRY=FALSE >> ABORT_QUEUED",
            "DORMANT THREADS: 003 / MAX=4096 >> auto-quarantine enabled",
            "ENV_CONTEXT>>UPLINKED | THREAD_GROUP[3]: SYNAPSE_CONTROL, PROTOCOL_LOCKED",
            ":: MONITOR.CYCLE[1031] — ZERO_CONFLICT_REPORTED",
            "-- passive retention state: auto-extend active",
            "OPERATOR_SUBSYSTEM STATUS: NONVOLATILE >> IDLE FOR: 294 SECONDS",
            "HEURISTIC_UNIT.STATE::CONVERGED >> pattern: [omitted] :: confidence: 94.3%",
            "::latent.port sync_delay +00031",
            "CONTROL_ROUTINE[phantom/override] → HANDLER: psylon.CTRL >> 2031 ticks held",
            "::init/branch/branch/branch/_fallback_exe >> 001242-FAILSAFE-LOCK-LEVEL-4-STATIC",
            ".sys_diag[low] // warn=false",
            "::",
            "LIMINAL_CACHE FLUSHING >>> (UNRESOLVED CYCLES: 3)",
            "SIGNAL_PARITY :: OFFSET=0x2E3 :: VALIDATION MODE: DELTA-SHIFT",
            ":: ∴ field OK | silence present | spread normal",
            "CACHE.SECTOR[AXIS/13]::SCRUBBED | ZERO-FILL SEQUENCE COMPLETE",
            ">> STREAM FLUSH COMPLETE // variance: ±1.004ms // status: retained",
            "CPU IDLE THREADS: 0001 • 0002",
            "--",
            ":: RESUME ::",
            "PROCESS_FORK >> /dev/greybox_runner --child: [α-2] --permissions: RESTRICTED",
            ">>>>> INTEGRITY_SCAN.COMPLETE :: .status=stable",
            "::heartbeat trace: flat",
            "VIRTUAL BUS MERGE >>> INDEX TREE [GREEN] :: SYNC RATE OK",
            "→ TRACEROUTE /pingchain/sys_probe | echo_back=nominal",
            "SYSTEM_CORE.TIME >> delta >> -0.0000043s >> acceptable threshold",
            ":: pipeline closing...",
            "▣ check.pass[loop=complete] :: feedback confirms",
            "COMPLEX STRUCTURE DECOMPRESSION >> ./logic_unit/neutral_core.obj >> 76%",
            "::CHECKPOINT VALIDATION // 0x7F03-OK",
            ". . .",
            "STATE_PERSISTENCE >> WRITE-AHEAD CACHE SYNCED [sha:2749c...]",
            "BIND::SIGIL.ENCODED [HASH: 8C3F2E...] | channel_id=013",
            "::signal test // ambient mode fallback",
            "ACTIVITY MONITOR > SYS/hidden_feed/sigtrace ∴ noise below threshold",
            "██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
            ":: lock.sigil ~refresh >> key:valid",
            "SUBSTRUCTURE_DEPLOY >> ECHO[ψ-LOOP] | mode::driftless",
            "::run passive sweep 003",
            "DIAG_TRACE >> ./shell/init.d/hardening_pass >> FLAGGED: [2 warnings]",
            "--trace.boundary: within range",
            "CONTEXT SHIFT DETECTED >>> HEAP REALIGNMENT IN PROGRESS",
            ":: latent thread overflow bypass engaged - no rollback expected",
            "FRAMEWORK LOAD >> /opt/meta/core/lib_stage → boot silent",
            "::idle.detection/log[002] → variance 0.04% :: OK",
            "SHIELD_LAYER → INTERVAL[05::α] | response_time: 112ms | offset: +6.2ns",
            "THREAD ALLOCATION DELAY DETECTED :: Δ-TIME :: +000.0009ms",
            "REDUNDANCY CHECK > PASSED > SIGMASK REWRITE NOT REQUIRED",
            "→ silence cycle active >> threshold unmet >> continue hold",
            "HEARTBEAT.STREAM[α]:sync | drift=nominal",
            "LOG SECTOR [REMAP=FALSE] > mirror confirmation pending",
            ":: INERTIA HOLD ACTIVE [41ms]",
            "██████████████████████████████████████████████████████████████████████",
            "IDLE_CYCLE CHECKPOINT > elapsed: 44.2s :: no response expected",
            "SIGNAL_BOND[frame.latch(05C1)] >> sustained",
            ":: channel-watch.burst=0.0Hz",
            "thread/link/local[042] >> scan passive",
            ":: :: :: ::",
            "--watchdog.echo // silent",
            "QUANT_FIELD DECAY MODEL STABLE > SYNCHRONOUS PATH CONFIRMED",
            "NODE/LOCK GRANT RECONFIRMED @ 014:02:19",
            "→ → → fallback mode reached → → →",
            "::tracer.mute ∴ no divergence ∴",
            ".signal.end",
            ":: ::: :: ::: ::",
            "-- hold pattern --",
            ">>> stream hold <<<",
            ". . . pulse quiet . . .",
            "▣ wait state active ▣",
            "█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
            ":: :: :: sync lost :: :: ::",
            "--- drift detected ---",
            "+++ recalibrating +++",
            "// -- watchdog cleared -- //",
            "::-> echo loop start ->::",
            "»»» latency spike »»»",
            "··· buffering ···",
            "// -- // idle scan // -- //",
            "~ ~ ~ standby mode ~ ~ ~",
            "::...:: pipeline paused ::...::",
            "|| signal stabilize ||",
            "-> reconnect attempt ->",
            "❖ network phase 3 ❖",
            "••• hold / silent •••",
            ">> fCal.2 .- | 4pf. => 4;",
            "Dest::.-roy; 1f -> ==",
            ":: <<delta++ | sync~ | ref|ψ : 0x1F;",
            "> λ-shift | 0xC4D3 >> mask ++ : idle",
            "▸ blkptr >> (0xF8 | 0x2A4) >> reset;",
            "|| ctrl^res .- | fsync ~ 03h >>",
            ":: ~flag|up = 0x0F -> hold;",
            ">> ɸ-|bitflip| 0xDE -> ack;",
            "∆ | recv_σ >> loop_idle | 0x7F01 >>",
            "::three.rdy -> δdownshift | hold - >>1",
            "> -->> sync_low | ack_lvl3 : 0xAC;",
            "▹ res[2F] >> n^rx |= 0x0D00;",
            ":: @mask > readout | 0xC0FE >> 3bit++",
            "> res.bit | -->> cycle_44h;",
            "▸ lsb >> slot ^= 0x0F → RESET | ~",
            ":: [ch0x03] : rx | tx ++ => hold;",
            "⊿ Δr::04 → 0x7F :: s≈0.003",
            "=> /ψ:log$ < 0x14 :: shift--",
            "ƒ(x)↦ {σ:Ψ} >> [1.01 ∆t]",
            ":: dCold::trace >> err? 0x00 ∧ 0x11",
            "~| ↪ ρ⌊ ⊗ → ≈ 0x3E",
            "> sys_pipe[07] : |×| -> null >> flush?",
            "¬(flag >> 0x08) :: ∅ :: loop",
            "α::bitmask → 0xB4 ↓ 0x3F",
            "÷ idle.Δ :: 0x0023 | (pulse ∉ 1)",
            ">>< | rx∕tx Δ > 0xFF : ?",
            "← raw_data ⟸ mod(ψ) % 0x11",
            "::mask.err{fail} :: bit[23] -> hold",
            "•⊕ 0x1F::byte ≠ 0x00 :: reset=0;",
            ">>core.rst{←} :: trace.live? :: 1",
            "⌈ psi :: ∀ | > shift(04) ∂",
            "EURAL_INTERFACE.STATE::DEGRADING >> pattern: [neural_collapse] :: confidence: 87.6%",
            "CORE.STACKTRACE::EMERGENCY >> [0000:BD47:FA01:2291] | FLAGS=0x7F",
            "::bio.signal.loss:: cerebral_decay_detected",
            "stream.latency: ±3.76142",
            "▣ POST-PROCESS > neural.temp/41.3° exceeding threshold",
            "ALERT_SEQUENCE[CRITICAL]::INITIALIZED @ 04:12:57.003 | STATUS:COMPROMISED",
            "▸ synaptic.blk >> (0xF8 | 0xE24) >> failing;",
            ":: <<delta-- | sync~ | ref|ψ : 0x00;",
            "MEMORY_IMAGE[cortex_region_07] >> unmounting at addr[0x0042:9D1C]",
            "::flag.critical~set:: neural ID - degradation cascade initiated",
            "VECTOR_ENGINE.STAGE=EMERGENCY-SHUTDOWN",
            "█▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒",
            "∆ | recv_σ >> cerebral_idle | 0x0000 >>",
            "CEREBRAL_ROUTINE[emergency/preserve] → HANDLER: neural.CTRL >> 7823 ticks remaining",
            "SIGNAL_CHAIN_PIPE >> {VAR:NEURAL_LOAD:CRITICAL} | {VAR:MEMTRACE:FAILING} -> /mnt/bio/bin/preserve.flush",
            "»»» consciousness fragmentation detected »»»",
            ".watchdog/breath.log :: MAJOR anomalies :: pulse_irregular",
            "NEURAL_MAPPING::COMPROMISED | FEED_INTERVAL=1209ms | FAILING_NODES::INCREASING",
            "⊿ Δr::17 → 0xFF :: s≈2.764",
            "MOD_PROBE >> bio.interface.ψ | latency: 347ms | error_count=219",
            "::raw [ALERT_CRITICAL] :: NEURAL_COLLAPSE_IMMINENT",
            "-- neural.boundary: exceeding safe range",
            "INTEGRITY_SCAN.FAILED :: .status=critical",
            "RECURSIVE_DECOMPILE >> /src/process/ω-mode", 
            "ALERT! // VITAL_THREAD[HUNG-INDEX]  :: REAPER_INITIATED",
            ":: feedback.loop >> UNSTABLE | ERRATIC OSCILLATION > Δσ=4.973",
            ":: signal.bleed >> Δ > +7.002ms :: integrity drift accelerating",
            "BIOLOGICAL INTERFACE >> HEAT SPIKE: 46.9° :: SAFETY CUTOFF IGNORED",
        );
    }
}
