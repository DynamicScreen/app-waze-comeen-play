<?php

namespace Comeen\Waze\Waze;

use ComeenPlay\SdkPhp\Handlers\SlideHandler;
use ComeenPlay\SdkPhp\Interfaces\ISlide;
use ComeenPlay\SdkPhp\Interfaces\IDisplay;

class WazeHandler extends SlideHandler
{
    public function fetch(ISlide $slide, IDisplay $display): void
    {
        $options = (object)$slide->getOptions();
        if ($options->type == 'auto') {
            $location = $display->getLocation();
        } else {
            $location = [
                'lat' => $options->address['latitude'],
                'lng' => $options->address['longitude']
            ];
        }

        $this->addSlide([
            'location' => $location,
            'zoom' => $slide->getOption('zoom', 3),
        ]);
    }

    public function getValidations($options = null): array
    {
        return [
        ];
    }
}
