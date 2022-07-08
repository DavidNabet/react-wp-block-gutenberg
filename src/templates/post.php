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