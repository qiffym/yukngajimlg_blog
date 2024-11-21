<?php

namespace App\Markdown\Youtube;

use League\CommonMark\Event\DocumentParsedEvent;
use League\CommonMark\Extension\CommonMark\Node\Inline\Link;
use TypeError;

final class YouTubeIframeProcessor
{
    private array $youTubeUrlParsers = [];

    public function __construct(array $youTubeUrlParsers)
    {
        foreach ($youTubeUrlParsers as $parser) {
            if (!($parser instanceof YouTubeUrlParserInterface)) {
                throw new TypeError;
            }
        }

        $this->youTubeUrlParsers = $youTubeUrlParsers;
    }

    public function __invoke(DocumentParsedEvent $event): void
    {
        $walker = $event->getDocument()->walker();

        while ($event = $walker->next()) {
            if ($event->getNode() instanceof Link && $event->isEntering()) {
                /** @var Link $link */
                $link = $event->getNode();

                foreach ($this->youTubeUrlParsers as $youTubeUrlParser) {
                    $youTubeUrl = $youTubeUrlParser->parse($link->getUrl());

                    if (is_null($youTubeUrl)) {
                        continue;
                    }

                    $link->replaceWith((new YouTubeIframe)->setUrl($youTubeUrl));
                }
            }
        }
    }
}
