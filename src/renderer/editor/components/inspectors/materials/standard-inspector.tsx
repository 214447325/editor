import * as React from "react";

import { StandardMaterial } from "babylonjs";

import { Inspector } from "../../inspector";

import { InspectorList } from "../../../gui/inspector/fields/list";
import { InspectorColor } from "../../../gui/inspector/fields/color";
import { InspectorNumber } from "../../../gui/inspector/fields/number";
import { InspectorSection } from "../../../gui/inspector/fields/section";
import { InspectorBoolean } from "../../../gui/inspector/fields/boolean";
import { InspectorColorPicker } from "../../../gui/inspector/fields/color-picker";

import { MaterialInspector } from "./material-inspector";

export class StandardMaterialInspector extends MaterialInspector<StandardMaterial> {
    /**
     * Renders the content of the inspector.
     */
    public renderContent(): React.ReactNode {
        return (
            <>
                {super.renderContent()}
                {this.getMaterialFlagsInspector()}
                {this.getAdvancedOptionsInspector()}
                {this.getMapsInspector()}

                {/*//@ts-ignore*/}
                <InspectorSection title="Diffuse">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useAlphaFromDiffuseTexture" label= "Use Alpha From Diffuse Texture" />
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material} property="diffuseColor" label="Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material} property="diffuseColor" label="Hex Color" />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Bump">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="invertNormalMapX" label= "Invert Normal Map X" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="invertNormalMapY" label= "Invert Normal Map Y" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useParallax" label= "Use Parallax" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useParallaxOcclusion" label= "Use Parallax Occlusion" />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="parallaxScaleBias" label="Parallax Scale Bias" step={0.001} />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Specular">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useGlossinessFromSpecularMapAlpha" label= "Use Glossiness From Specular Map Alpha" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useReflectionFresnelFromSpecular" label= "Use Reflection Fresnel From Specular" />
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="useSpecularOverAlpha" label= "Use Specular Over Alpha" />
                    {/*//@ts-ignore*/}
                    <InspectorNumber object={this.material} property="specularPower" label="Power" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material} property="specularColor" label="Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material} property="specularColor" label="Hex Color" />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Ambient">
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material} property="ambientColor" label="Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material} property="ambientColor" label="Hex Color" />
                </InspectorSection>

                {/*//@ts-ignore*/}
                <InspectorSection title="Emissive">
                    {/*//@ts-ignore*/}
                    <InspectorBoolean object={this.material} property="linkEmissiveWithDiffuse" label= "Link Emissive With Diffuse" />
                    {/*//@ts-ignore*/}
                    <InspectorColor object={this.material} property="emissiveColor" label="Color" step={0.01} />
                    {/*//@ts-ignore*/}
                    <InspectorColorPicker object={this.material} property="emissiveColor" label="Hex Color" />
                </InspectorSection>
            </>
        );
    }

    /**
     * Returns the inspector used to set the textures of the standard material.
     */
    protected getMapsInspector(): React.ReactNode {
        return (
            //@ts-ignore
            <InspectorSection title="Maps">
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="diffuseTexture" label="Diffuse Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="bumpTexture" label="Bump Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="specularTexture" label="Specular Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="ambientTexture" label="Ambient Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="opacityTexture" label="Opacity Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="emissiveTexture" label="Emissive Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="lightmapTexture" label="Lightmap Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
                {/*//@ts-ignore*/}
                <InspectorList object={this.material} property="reflectionTexture" label="Reflection Texture" items={() => this.getTexturesList()} dndHandledTypes={["asset/texture"]} />
            </InspectorSection>
        );
    }
}

Inspector.RegisterObjectInspector({
    ctor: StandardMaterialInspector,
    ctorNames: ["StandardMaterial"],
    title: "Standard",
    isSupported: (o) => MaterialInspector.IsObjectSupported(o, StandardMaterial),
});
