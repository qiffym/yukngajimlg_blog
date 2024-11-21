<?php

namespace App\Markdown\Youtube;

use League\CommonMark\Node\Node;
use League\CommonMark\Renderer\ChildNodeRendererInterface;
use League\CommonMark\Renderer\NodeRendererInterface;
use League\CommonMark\Util\HtmlElement;

final class YouTubeIframeRenderer implements NodeRendererInterface
{
    private string $width;
    private string $height;
    private ?string $wrapperClass;
    private bool $allowFullScreen;

    public function __construct(array $props = [])
    {
        $this->width = $props['width'] ?? '';
        $this->height = $props['height'] ?? '';
        $this->wrapperClass = $props['wrapperClass'] ?? null;
        $this->allowFullScreen = $props['allowFullScreen'] ?? true;
    }

    /**
     * {@inheritDoc}
     */
    public function render(Node $node, ChildNodeRendererInterface $childRenderer): HtmlElement
    {
        if (!($node instanceof YouTubeIframe)) {
            throw new \InvalidArgumentException('Incompatible node type: ' . get_class($node));
        }

        $src = "https://www.youtube.com/embed/{$node->getUrl()->getVideoId()}";
        $startTimestamp = $node->getUrl()->getStartTimestamp();

        if (!is_null($startTimestamp)) {
            $src .= "?start={$startTimestamp}";
        }

        $iframeElement = new HtmlElement('iframe', array_merge([
            'width' => $this->width,
            'height' => $this->height,
            'src' => $src,
            'frameborder' => '0',
        ], $this->allowFullScreen ? [
            'allowfullscreen' => '1',
        ] : []));

        return is_null($this->wrapperClass) ? $iframeElement : new HtmlElement('div', [
            'class' => $this->wrapperClass,
        ], $iframeElement);
    }
}
