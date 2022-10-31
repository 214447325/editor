import * as React from "react";

import { WaterMaterial } from "babylonjs-materials";

import { Inspector } from "../../inspector";

import { InspectorList } from "../../../gui/inspector/fields/list";
import { InspectorColor } from "../../../gui/inspector/fields/color";
import { InspectorNumber } from "../../../gui/inspector/fields/number";
import { InspectorSection } from "../../../gui/inspector/fields/section";
import { InspectorVector2 } from "../../../gui/inspector/fields/vector2";
import { InspectorBoolean } from "../../../gui/inspector/fields/boolean";
import { InspectorColorPicker } from "../../../gui/inspector/fields/color-picker";

import { MeshTransferComponent } from "../tools/transfer-mesh";

import { MaterialInspector } from "./material-inspector";

export class WaterMaterialInspector extends MaterialInspector<WaterMaterial> {
    /**
     * Renders the content of the inspector.
     */
    public renderContent(): React.ReactNode {
        return (
            <>
                {super.renderContent()}
                {this.getMaterialFlagsInspector()}
                {this.getAdvancedOptionsInspector()}

                {/*//@ts-ignore*/}
                <InspectorSection title="Diffuse">
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material} property="diffuseColor" label="Color" />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material} property="diffuseColor" label="Hex Color" />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Specular">
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material} property="specularColor" label="Color" />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material} property="specularColor" label="Hex Color" />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="specularPower" label="Power" min={0} step={0.01} />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Colors">
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material} property="waterColor" label="Water Color" />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material} property="waterColor" label="Hex Color" />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="colorBlendFactor" label="Blend Factor" min={0} step={0.01} />

                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material} property="waterColor2" label="Water Color 2" />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material} property="waterColor2" label="Hex Color" />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="colorBlendFactor2" label="Blend Factor 2" min={0} step={0.01} />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Wind">
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="windForce" label="Force" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorVector2 object={this.material} property="windDirection" label="Direction" step={0.01} />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Options">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="disableClipPlane" label="Disable Clip Plane" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="bumpSuperimpose" label="Superimpose" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="bumpAffectsReflection" label="Affects Reflection" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="fresnelSeparate" label="Fresnel Separate" />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Bump">
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="bumpHeight" label="Height" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorList object={this.material} property="bumpTexture" label="Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Waves">
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="waveSpeed" label="Speed" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="waveLength" label="Length" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="waveHeight" label="Height" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="waveCount" label="Count" min={0.01} step={0.01} />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Reflection & Refraction">
                    {this._getRenderTargetInspector()}
                </InspectorSection>
            </>
        );
    }

    /**
     * Returns the inspector used to configure the render targets used for
     * reflections and refractions.
     */
    private _getRenderTargetInspector(): React.ReactNode {
        if (!this.material.reflectionTexture?.renderList) {
            return undefined;
        }

        return (
            //@ts-ignore
            <MeshTransferComponent editor={this.editor} targetArray={this.material.reflectionTexture.renderList} onChanged={() => {
                if (!this.material.refractionTexture) { return; }

                this.material.refractionTexture.renderList = [];
                this.material.reflectionTexture?.renderList?.forEach((m) => {
                    this.material.refractionTexture?.renderList?.push(m);
                });
            }} />
        );
    }
}

Inspector.RegisterObjectInspector({
    ctor: WaterMaterialInspector,
    ctorNames: ["WaterMaterial"],
    title: "Water",
    isSupported: (o) => MaterialInspector.IsObjectSupported(o, WaterMaterial),
});
