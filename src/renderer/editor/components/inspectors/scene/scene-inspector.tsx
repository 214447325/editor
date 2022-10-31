import * as React from "react";

import { Scene } from "babylonjs";

import { Inspector } from "../../inspector";

import { InspectorList } from "../../../gui/inspector/fields/list";
import { InspectorColor } from "../../../gui/inspector/fields/color";
import { InspectorNumber } from "../../../gui/inspector/fields/number";
import { InspectorBoolean } from "../../../gui/inspector/fields/boolean";
import { InspectorSection } from "../../../gui/inspector/fields/section";
import { InspectorVector3 } from "../../../gui/inspector/fields/vector3";
import { InspectorColorPicker } from "../../../gui/inspector/fields/color-picker";

import { Project } from "../../../project/project";
import { WorkSpace } from "../../../project/workspace";

import { IScriptInspectorState, ScriptInspector } from "../script-inspector";

export class SceneInspector extends ScriptInspector<Scene, IScriptInspectorState> {
    private static _FogModes: string[] = ["FOGMODE_NONE", "FOGMODE_LINEAR", "FOGMODE_EXP", "FOGMODE_EXP2"];

    /**
     * Renders the content of the inspector.
     */
    public renderContent(): React.ReactNode {
        return (
            <>
                {/*//@ts-ignore*/}
                <InspectorSection title="Clear Color">
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.selectedObject} property="clearColor" label="RGB Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.selectedObject} property="clearColor" label="Hex Color" />
                </InspectorSection>
                {/*//@ts-ignore*/}
                <InspectorSection title="Ambient Color">
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.selectedObject} property="ambientColor" label="RGB Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.selectedObject} property="ambientColor" label="Hex Color" />
                </InspectorSection>

                {super.renderContent()}
                {/*//@ts-ignore*/}
                <InspectorSection title="Image Processing">
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.selectedObject.imageProcessingConfiguration} property="exposure" label="Exposure" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.selectedObject.imageProcessingConfiguration} property="contrast" label="Contrast" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.selectedObject.imageProcessingConfiguration} property="toneMappingEnabled" label="Tone Mapping Enabled" />
                </InspectorSection>
                {/*//@ts-ignore*/}
                <InspectorSection title="Environment">
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.selectedObject} property="environmentIntensity" label="Intensity" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorList object={this.selectedObject} property="environmentTexture" label="Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                </InspectorSection>
                {/*//@ts-ignore*/}
                <InspectorSection title="Fog">
                    {/*//@ts-ignore*/}
                    <InspectorList object={this.selectedObject} property="fogMode" label="Mode" items={SceneInspector._FogModes.map((fm) => ({ label: fm, data: Scene[fm] }))} />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.selectedObject} property="fogEnabled" label="Enabled" />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.selectedObject} property="fogStart" label="Start" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.selectedObject} property="fogEnd" label="End" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.selectedObject} property="fogDensity" label="Density" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.selectedObject} property="fogColor" label="RGB Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.selectedObject} property="fogColor" label="Hex Color" />
                </InspectorSection>
                {/*//@ts-ignore*/}
                <InspectorSection title="Collisions">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.selectedObject} property="collisionsEnabled" label="Enabled" />
                    {/*//@ts-ignore*/}
                    <InspectorVector3 object={this.selectedObject} property="gravity" label="Gravity" step={0.01} />
                </InspectorSection>

                {this.getPhysicsFields()}
            </>
        );
    }

    /**
     * Returns the physics editable properties fields.
     */
    protected getPhysicsFields(): React.ReactNode {
        if (!WorkSpace.Workspace) { return; }
        WorkSpace.Workspace.physicsEngine ??= "cannon";

        const physicsEngine = this.selectedObject.getPhysicsEngine();
        if (!physicsEngine) { return undefined; }

        return (
            //@ts-ignore
            <InspectorSection title="Physics">
                {/*//@ts-ignore*/}
                <InspectorBoolean object={Project.Project} property="physicsEnabled" label="Enabled" />
                {/*//@ts-ignore*/}
                <InspectorList object={WorkSpace.Workspace} property="physicsEngine" label="Engine" items={[
                    { label: "Cannon", data: "cannon", description: "Cannon.JS" },
                    { label: "Oimo", data: "oimo", description: "Oimo.JS" },
                    { label: "Ammo", data: "ammo", description: "Ammo.JS" },
                ]} />
                {/*//@ts-ignore*/}
                <InspectorVector3 object={physicsEngine} property="gravity" label="Gravity" step={0.01} />
            </InspectorSection>
        );
    }
}

Inspector.RegisterObjectInspector({
    ctor: SceneInspector,
    ctorNames: ["Scene"],
    title: "Scene",
});
