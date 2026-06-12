/**
 * AIML.chat widget block — editor UI.
 *
 * No build step: uses the wp.* globals (dependencies declared in index.asset.php).
 * Block metadata (attributes, render.php) is registered server-side from block.json;
 * this file only supplies the edit view. Blank position/theme = "use the appearance
 * configured in the AIML.chat dashboard" (no data-attribute is emitted).
 */
( function ( blocks, element, blockEditor, components, i18n ) {
	'use strict';

	var el = element.createElement;
	var __ = i18n.__;

	blocks.registerBlockType( 'aiml-chat/widget', {
		edit: function ( props ) {
			var atts = props.attributes;
			var set = props.setAttributes;

			return el(
				'div',
				blockEditor.useBlockProps(),
				el(
					blockEditor.InspectorControls,
					{},
					el(
						components.PanelBody,
						{ title: __( 'Widget overrides', 'aiml-chat' ) },
						el( components.TextControl, {
							label: __( 'API key', 'aiml-chat' ),
							help: __( 'Blank = use the key from Settings → AIML.chat.', 'aiml-chat' ),
							value: atts.apiKey,
							onChange: function ( v ) {
								set( { apiKey: v } );
							},
						} ),
						el( components.TextControl, {
							label: __( 'Website ID', 'aiml-chat' ),
							help: __( 'Blank = use the value from Settings → AIML.chat.', 'aiml-chat' ),
							value: atts.websiteId,
							onChange: function ( v ) {
								set( { websiteId: v } );
							},
						} ),
						el( components.SelectControl, {
							label: __( 'Position', 'aiml-chat' ),
							value: atts.position,
							options: [
								{ label: __( 'Default — use dashboard setting', 'aiml-chat' ), value: '' },
								{ label: __( 'Bottom right', 'aiml-chat' ), value: 'right' },
								{ label: __( 'Bottom left', 'aiml-chat' ), value: 'left' },
							],
							onChange: function ( v ) {
								set( { position: v } );
							},
						} ),
						el( components.SelectControl, {
							label: __( 'Theme', 'aiml-chat' ),
							value: atts.theme,
							options: [
								{ label: __( 'Default — use dashboard setting', 'aiml-chat' ), value: '' },
								{ label: __( 'Auto', 'aiml-chat' ), value: 'auto' },
								{ label: __( 'Light', 'aiml-chat' ), value: 'light' },
								{ label: __( 'Dark', 'aiml-chat' ), value: 'dark' },
							],
							onChange: function ( v ) {
								set( { theme: v } );
							},
						} ),
						el( components.TextControl, {
							label: __( 'Primary color', 'aiml-chat' ),
							help: __( 'CSS color, e.g. #4f46e5. Blank = dashboard setting.', 'aiml-chat' ),
							value: atts.primaryColor,
							onChange: function ( v ) {
								set( { primaryColor: v } );
							},
						} )
					)
				),
				el( components.Placeholder, {
					icon: 'format-chat',
					label: __( 'AIML.chat Widget', 'aiml-chat' ),
					instructions: __(
						'The chat widget loads on this page on the front end. Overrides are in the block sidebar; blank values use the appearance configured in your AIML.chat dashboard.',
						'aiml-chat'
					),
				} )
			);
		},

		// Dynamic block — front-end markup comes from render.php.
		save: function () {
			return null;
		},
	} );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n );
