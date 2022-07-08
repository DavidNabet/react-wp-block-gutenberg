<?php

/**
 * Plugin Name:       Get Blocks
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       get-blocks
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function create_block_get_blocks_block_init()
{

	register_block_type(__DIR__ . '/build/blocks/1-block');
	register_block_type(__DIR__ . '/build/blocks/2-autocomplete');
	register_block_type(__DIR__ . '/build/blocks/3-child');
	register_block_type(__DIR__ . '/build/blocks/4-sidebarGradient');
	register_block_type(
		__DIR__ . '/build/blocks/5-dynamicArticles',
		['render_callback' => 'dynamic_articles_render']
	);
	register_block_type(__DIR__ . '/build/blocks/6-hooks');
	register_block_type(__DIR__ . '/build/blocks/7-blockPosts', ['render_callback' => 'block_posts_render']);
}
add_action('init', 'create_block_get_blocks_block_init');

// Fonction de génération du HTML dynamique
function dynamic_articles_render($attributes)
{
	$args = ['posts_per_page' => 3];

	$posts = get_posts($args);

	if (count($posts) == 0) {
		return '<p>Pas d\'article</p>';
	}

	$markup = '<ul class="wp-block-get-blocks-dynamic">';

	foreach ($posts as $post) {
		$markup .= sprintf(
			'<li><a href="%1$s">%2$s</a></li>',
			esc_url(get_permalink($post->ID)),
			esc_html(get_the_title($post->ID))
		);
	}

	$markup .= '</ul>';
	return $markup;
}

/**
 * Rendu dynamique pour le bloc 7
 */

function block_posts_render($attributes)
{
	// Récupération de l'ID de l'article dans le commentaire HTML
	$id = $attributes['postID'];

	// Requête pour récupérer l'article et préparer les données
	$query = new WP_Query(['p' => $id]);
	if ($query->have_posts()) :
		while ($query->have_posts()) : $query->the_post();

			// Récupération de l'image, l'auteur et la catégorie (s'ils sont définis)
			$image = false;
			$author = false;
			$category = false;

			if ($attributes['showImage'] !== false) {
				$image = wp_get_attachment_image_src(get_post_thumbnail_id(), 'medium');
				$image = $image[0];
			}

			if ($attributes['showAuthor'] !== false) {
				$author = get_the_author_meta('display_name');
			}

			if ($attributes['showCategory'] !== false) {
				$categories = get_the_category();
				if (!empty($categories)) {
					$category = $categories[0]->name;
				}
			}

			// Démarrage du cache d'affichage php
			ob_start();

			// inclusion du template
			// include 'templates/post.php';

?>
			<div class="wp-get-blocks-post">
				<?php if ($image) : ?>
					<a href="<?php the_permalink(); ?>" class="wp-get-blocks-post__image" style="background-image: url('<?php echo $image; ?>')">
					</a>
				<?php endif; ?>
				<div class="wp-get-blocks-post__content">
					<p class="wp-get-blocks-post__title">
						<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
					</p>
					<p class="wp-get-blocks-post__metas">
						<em>
							<?php if ($category) : ?>
								<span> <?php _e('In', 'get-blocks'); ?> <?php echo $category; ?> </span>
							<?php endif; ?>
							<?php if ($author) : ?>
								<span> <?php _e('By', 'get-blocks'); ?> <?php echo $author; ?> </span>
							<?php endif; ?>
						</em>
					</p>
					<div class="wp-get-blocks-post__excerpt">
						<p>
							<?php the_excerpt(); ?>
						</p>
					</div>
					<p class="wp-get-blocks-post__actions">
						<a href="<?php the_permalink(); ?>" class="wp-get-blocks-post__button">
							<?php _e('Read more', 'get-blocks'); ?>
						</a>
					</p>
				</div>
			</div>
<?php

			// Récupération du HTML affiché via echo
			$markup = ob_get_contents();
			ob_get_clean();

		// Fin de la requête
		endwhile;
		wp_reset_postdata();
	endif;

	return $markup;
}
