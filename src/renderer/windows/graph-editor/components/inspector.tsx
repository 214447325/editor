import { Nullable } from "../../../../shared/types";

import * as React from "react";
import { LGraphGroup, LiteGraph } from "litegraph.js";

import { Color3, ISize } from "babylonjs";

import { GraphNode } from "../../../editor/graph/node";

import { Tools } from "../../../editor/tools/tools";
import { undoRedo } from "../../../editor/tools/undo-redo";

import { IObjectInspectorProps } from "../../../editor/components/inspector";
import { AbstractInspector } from "../../../editor/components/inspectors/abstract-inspector";

import { InspectorList } from "../../../editor/gui/inspector/fields/list";
import { InspectorColor } from "../../../editor/gui/inspector/fields/color";
import { InspectorString } from "../../../editor/gui/inspector/fields/string";
import { InspectorNumber } from "../../../editor/gui/inspector/fields/number";
import { InspectorButton } from "../../../editor/gui/inspector/fields/button";
import { InspectorBoolean } from "../../../editor/gui/inspector/fields/boolean";
import { InspectorSection } from "../../../editor/gui/inspector/fields/section";
import { InspectorVector2 } from "../../../editor/gui/inspector/fields/vector2";
import { InspectorVector3 } from "../../../editor/gui/inspector/fields/vector3";
import { IInspectorNotifierUndoRedo } from "../../../editor/gui/inspector/utils";
import { InspectorColorPicker } from "../../../editor/gui/inspector/fields/color-picker";

import GraphEditorWindow from "../index";

export interface IInspectorState {
    /**
     * Defines the reference to the node being edited.
     */
    node: Nullable<GraphNode>;
    /**
     * Defines the reference to the group being modified.
     */
    group: Nullable<LGraphGroup>;
}

export class Inspector extends AbstractInspector<GraphNode | LGraphGroup, IInspectorState> {
    /**
     * Defines the reference to the graph editor's window.
     */
    protected graphEditor: GraphEditorWindow;
    /**
     * Defines the reference to current node being updated.
     */
    protected node: Nullable<GraphNode> = null;

    /**
     * Constructor.
     * @param editor the editor reference.
     * @param selectedObject the currently selected object reference.
     * @param ref the ref of the inspector properties.
     */
    public constructor(props: IObjectInspectorProps) {
        super(props);

        this.handleUndoRedo = false;

        this.graphEditor = props.editor as any;
        this.graphEditor.inspector = this;

        this.state = {
            node: null,
            group: null,
        };
    }

    /**
     * Called on a property of the selected object has changed.
     */
    public onPropertyChanged(configuration: IInspectorNotifierUndoRedo<any>): void {
        super.onPropertyChanged(configuration);

        const node = this.state.node;

        undoRedo.push({
            common: () => {
                if (node) {
                    this._notifyPropertyChanged(node, configuration.object, configuration.property);
                }

                this.graphEditor.graph.refresh();
            },
            undo: () => configuration.object[configuration.property] = configuration.oldValue,
            redo: () => configuration.object[configuration.property] = configuration.newValue,
        });
    }

    /**
     * Renders the content of the inspector.
     */
    public renderContent(): React.ReactNode {
        if (this.state.group) {
            return this.getGroupInspector(this.state.group);
        }

        if (this.state.node) {
            return this.getNodeInspector(this.state.node);
        }

        return undefined;
    }

    /**
     * Returns the inspector used to edit the given group.
     */
    protected getGroupInspector(group: LGraphGroup): React.ReactNode {
        const o = { color: Color3.FromHexString(group.color) };

        return (
            //@ts-ignore
            <InspectorSection title="Group">
                {/*//@ts-ignore*/}
                <InspectorString key={Tools.RandomId()} object={group} property="title" label="Title" />
                {/*//@ts-ignore*/}
                <InspectorColorPicker key={Tools.RandomId()} object={o} property="color" label="Color" onChange={() => group.color = o.color.toHexString()} />
            </InspectorSection>
        );
    }

    /**
     * Sets the group to edit.
     * @param group defines the reference to the group to edit.
     */
    public setGroup(group: LGraphGroup): void {
        this.selectedObject = group;
        this.setState({ group, node: null });
    }

    /**
     * Sets the node to edit.
     * @param node defines the reference to the node to edit.
     */
    public setNode(node: GraphNode): void {
        this.selectedObject = node;
        this.setState({ node, group: null });
    }

    /**
     * Resizes the inspector.
     * @param size defines the new size of the panel.
     */
    public resize(size?: ISize): void {
        size = size ?? this.editor.getPanelSize("inspector");
        size.height += 40;
        super.resize(size);
    }

    /**
     * Returns the inspector used to edit the given node.
     */
    protected getNodeInspector(node: GraphNode): React.ReactNode {
        node.onWidgetChange = () => this.forceUpdate();

        node.shape = node.shape ?? LiteGraph.ROUND_SHAPE;
        node.bgcolor = node.bgcolor ?? LiteGraph.NODE_DEFAULT_BGCOLOR;
        node.boxcolor = node.boxcolor ?? LiteGraph.NODE_DEFAULT_BOXCOLOR;

        return (
            //@ts-ignore
            <InspectorSection title="Node">
                {/*//@ts-ignore*/}
                <InspectorButton label="Focus" onClick={() => node.focusOn()} />
                {this._getNodeCommonInspector(node)}
                {this._getNodePropertiesInspector(node)}
            </InspectorSection>
        );
    }

    /**
     * Returns the inspector used to edit the common properties of the given node.
     */
    private _getNodeCommonInspector(node: GraphNode): React.ReactNode {
        const colors = {
            node: Color3.FromHexString(node.color ?? "#333333"),
            box: Color3.FromHexString(node.boxcolor ?? "#333333"),
            background: Color3.FromHexString(node.bgcolor ?? "#333333"),
        };

        return (
            //@ts-ignore
            <InspectorSection title="Common">
                {/*//@ts-ignore*/}
                <InspectorString key={Tools.RandomId()} object={node} property="title" label="Title" />
                {/*//@ts-ignore*/}
                <InspectorList key={Tools.RandomId()} object={node} property="shape" label="Shape" items={[
                    { label: "Box", data: LiteGraph.BOX_SHAPE },
                    { label: "Card", data: LiteGraph.CARD_SHAPE },
                    { label: "Round", data: LiteGraph.ROUND_SHAPE },
                    { label: "Circle", data: LiteGraph.CIRCLE_SHAPE },
                    { label: "Arrow", data: LiteGraph.ARROW_SHAPE },
                ]} />
                {/*//@ts-ignore*/}
                <InspectorColorPicker key={Tools.RandomId()} object={colors} property="box" label="Box Color" onChange={() => node.boxcolor = colors.box.toHexString()} />
                {/*//@ts-ignore*/}
                <InspectorColorPicker key={Tools.RandomId()} object={colors} property="node" label="Title Color" onChange={() => node.color = colors.node.toHexString()} />
                {/*//@ts-ignore*/}
                <InspectorColorPicker key={Tools.RandomId()} object={colors} property="background" label="Background Color" onChange={() => node.bgcolor = colors.background.toHexString()} />
            </InspectorSection>
        );
    }

    /**
     * Returns the inspector used to edit the node's properties.
     */
    private _getNodePropertiesInspector(node: GraphNode): React.ReactNode {
        const properties: React.ReactNode[] = [];

        for (const p in node.properties) {
            const widget = node.widgets?.find((w) => w.name === p);

            if (widget?.options?.values) {
                const values = (typeof (widget.options.values) === "function") ? widget.options.values() : widget.options.values;
                if (!values.length) {
                    continue;
                }
                {/*//@ts-ignore*/}
                properties.push(<InspectorList key={Tools.RandomId()} object={node.properties} property={p} label={this._getFormatedname(p)} items={values.map((v) => ({ label: v, data: v }))} />);
                continue;
            }

            const value = node.properties[p];
            const ctor = Tools.GetConstructorName(value).toLowerCase();

            switch (ctor) {
                case "number":
                {/*//@ts-ignore*/}
                    properties.push(<InspectorNumber key={Tools.RandomId()} object={node.properties} property={p} label={this._getFormatedname(p)} min={widget?.options?.min} max={widget?.options?.max} step={widget?.options?.step ?? 0.01} />);
                    break;
                case "string":
                {/*//@ts-ignore*/}
                    properties.push(<InspectorString key={Tools.RandomId()} object={node.properties} property={p} label={this._getFormatedname(p)} />);
                    break;
                case "boolean":
                {/*//@ts-ignore*/}
                    properties.push(<InspectorBoolean key={Tools.RandomId()} object={node.properties} property={p} label={this._getFormatedname(p)} />);
                    break;

                case "vector2":
                {/*//@ts-ignore*/}
                    properties.push(<InspectorVector2 key={Tools.RandomId()} object={node.properties} property={p} label={this._getFormatedname(p)} min={widget?.options?.min} max={widget?.options?.max} step={widget?.options?.step ?? 0.01} />);
                    break;
                case "vector3":
                {/*//@ts-ignore*/}
                    properties.push(<InspectorVector3 key={Tools.RandomId()} object={node.properties} property={p} label={this._getFormatedname(p)} min={widget?.options?.min} max={widget?.options?.max} step={widget?.options?.step ?? 0.01} />);
                    break;
                case "color3":
                case "color4":
                {/*//@ts-ignore*/}
                    properties.push(
                        //@ts-ignore
                        <InspectorSection title={this._getFormatedname(p)}>
                            {/*//@ts-ignore*/}
                            <InspectorColor key={Tools.RandomId()} object={node.properties} property={p} label={this._getFormatedname(p)} step={widget?.options?.step} />
                            {/*//@ts-ignore*/}
                            <InspectorColorPicker key={Tools.RandomId()} object={node.properties} property={p} label={this._getFormatedname(p)} />
                        </InspectorSection>
                    );
                    break;
            }
        }

        return (
            //@ts-ignore
            <InspectorSection title="Properties">
                {properties}
            </InspectorSection>
        );
    }

    /**
     * Notifies the given node that property changed.
     */
    private _notifyPropertyChanged(node: GraphNode, object: any, property: string): void {
        if (object !== node.properties) {
            for (const key in node.properties) {
                const value = node.properties[key];
                if (value === object) {
                    property = `${key}.${property}`;
                    break;
                }
            }
        }

        const split = property.split(".");
        node.propertyChanged(property, Tools.GetEffectiveProperty<any>(node.properties, property)[split.pop()!]);
    }

    /**
     * Returns the name of the folder or node in its formated form.
     */
    private _getFormatedname(name: string): string {
        return name[0].toUpperCase() + name.substr(1, name.length - 1).replace(/_/g, " ");
    }
}
